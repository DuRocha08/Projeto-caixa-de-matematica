const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// Conexão com o banco (Supabase via pooler)
// ---------------------------------------------------------------------------
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Nenhuma variável de conexão definida (POSTGRES_URL ou DATABASE_URL).');
}

// Remove parâmetros da URL que atrapalham o driver "pg":
// - sslmode: faz o pg ignorar o "rejectUnauthorized: false" e dar erro de certificado
// - supa: parâmetro extra do pooler do Supabase que o pg não usa
function limparUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.delete('sslmode');
    u.searchParams.delete('supa');
    return u.toString();
  } catch (e) {
    console.error('URL do banco inválida. Verifique o formato da variável de ambiente.');
    return url;
  }
}

const pool = new Pool({
  connectionString: limparUrl(connectionString),
  ssl: { rejectUnauthorized: false },
  max: 1 // em ambiente serverless, cada instância só precisa de uma conexão
});

// ---------------------------------------------------------------------------
// GET /api/atividades  (filtro opcional por gaveta)
// ---------------------------------------------------------------------------
app.get('/api/atividades', async (req, res) => {
  try {
    const { gaveta } = req.query;
    let resultado;

    if (gaveta && gaveta !== 'Geral') {
      resultado = await pool.query(
        'SELECT * FROM atividades WHERE gaveta = $1 ORDER BY id DESC',
        [gaveta]
      );
    } else {
      resultado = await pool.query('SELECT * FROM atividades ORDER BY id DESC');
    }

    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao buscar atividades:', err);
    res.status(500).json({ error: 'Erro ao buscar atividades' });
  }
});

// ---------------------------------------------------------------------------
// POST /api/atividades
// ---------------------------------------------------------------------------
app.post('/api/atividades', async (req, res) => {
  try {
    const {
      titulo,
      publico,
      objetivo,
      conceito,
      material,
      desenvolvimento,
      mediacao,
      avaliacao,
      justificativa,
      autor,
      gaveta
    } = req.body;

    const nomeCriador = autor && autor.trim() !== '' ? autor : 'Anónimo';
    const gavetaEscolhida = gaveta && gaveta.trim() !== '' ? gaveta : 'Geral';

    const query = `
      INSERT INTO atividades
      (titulo, publico, objetivo, conceito, material, desenvolvimento, mediacao, avaliacao, justificativa, autor, gaveta)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`;

    const valores = [
      titulo || '',
      publico || '',
      objetivo || '',
      conceito || '',
      material || '',
      desenvolvimento || '',
      mediacao || '',
      avaliacao || '',
      justificativa || '',
      nomeCriador,
      gavetaEscolhida
    ];

    const resultado = await pool.query(query, valores);
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    // O detalhe completo fica só nos logs da Vercel, não vai para o navegador
    console.error('Erro detalhado ao guardar atividade:', err);
    res.status(500).json({ error: 'Erro ao guardar atividade' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/recursos
// ---------------------------------------------------------------------------
app.get('/api/recursos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM recursos ORDER BY id DESC');
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao buscar recursos:', err);
    res.status(500).json({ error: 'Erro ao buscar recursos' });
  }
});

module.exports = app;
