 const Database = require('better-sqlite3');

 const db = new Database('database.db');

db.exec(`
  
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )
`);

console.log ('Banco de dados conectado e tabela de usuarios criada');

module.exports = db;