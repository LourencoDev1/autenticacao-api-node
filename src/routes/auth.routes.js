const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database'); 

const router = express.Router();

router.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body;

  
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    
    const usuarioExistente = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Este e-mail já está cadastrado.' });
    }

    
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    
    const comando = db.prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)');
    const resultado = comando.run(nome, email, senhaCriptografada);

    
    res.status(201).json({ 
      mensagem: 'Usuário registrado com sucesso!',
      id: resultado.lastInsertRowid
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha} = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  try {
    const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

const senhaValida = await bcrypt.compare(senha, usuario.senha);

if (!senhaValida) {
  return res.status(401).json({ erro: 'Credenciais inválidas.' });
}

const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token: token
    });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

module.exports = router;