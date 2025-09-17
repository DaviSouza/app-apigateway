const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ClienteRepository = require('../repositories/ClienteRepository');

class AuthService {
  async autenticar(email, senha, clientId) {
    if (process.env.CLIENT_ID !== clientId) {
      throw new Error('Código inválido');
    }

    const cliente = await ClienteRepository.buscarSenhaPorEmail(email);

    if (!cliente) {
      throw new Error('Credenciais inválidas');
    }

    const senhaCorreta = await bcrypt.compare(senha, cliente.senha);
    console.log('Teste 2');
    
    if (!senhaCorreta) {
      throw new Error('Senha incorreta');
    }
    const payload = {
      sub: clientId,
      email: email
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS256'
      }
    );

    return {
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }
}

module.exports = new AuthService();