const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const AuthService = require('./services/AuthService');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/token', async (req, res) => {
  const { email, senha, client_id } = req.body;

  try {
    const token = await AuthService.autenticar(email, senha, client_id);
    res.json(token);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.listen(7000, () => {

/*
  const bcrypt = require('bcryptjs');
  const senhaOriginal = 'admin';
  const saltRounds = 10;
  // Gerar o hash da senha
  bcrypt.hash(senhaOriginal, saltRounds, function (err, hash) {
    if (err) {
      console.error('Erro ao gerar hash:', err);
    } else {
      console.log('Hash gerado:', hash);
    }
  });
  host.docker.internal
  */
  console.log('OAuth server rodando em http://localhost:7000');
});
