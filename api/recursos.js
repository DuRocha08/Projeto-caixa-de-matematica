import mysql from 'mysql2/promise';

export default async function handler(req, res) {
   
    const conexao = await mysql.createConnection(process.env.DATABASE_URL);

    if (req.method === 'GET') {
       
        const [linhas] = await conexao.execute('SELECT * FROM recursos');
        res.status(200).json(linhas);
    } 
    else if (req.method === 'POST') {
       
        const { gaveta, nome, tipo } = req.body;
        await conexao.execute('INSERT INTO recursos (gaveta, nome, tipo) VALUES (?, ?, ?)', [gaveta, nome, tipo]);
        res.status(201).json({ message: 'Salvo na nuvem!' });
    }
}
