const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


app.get('/api/atividades', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM atividades ORDER BY id DESC');
    res.json(resultado.rows);
  } catch (err) {
    console.error('Erro ao buscar atividades:', err);
    res.status(500).json({ error: 'Erro ao buscar atividades' });
  }
});


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
      autor 
    } = req.body;
    
    const nomeCriador = autor && autor.trim() !== '' ? autor : 'Anónimo'; 
    
    const query = `
      INSERT INTO atividades 
      (titulo, publico, objetivo, conceito, material, desenvolvimento, mediacao, avaliacao, justificativa, autor) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
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
      nomeCriador
    ];
    
    const resultado = await pool.query(query, valores);
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro detalhado ao guardar atividade:', err);
    res.status(500).json({ error: 'Erro ao guardar atividade', detalhes: err.message });
  }
});


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
