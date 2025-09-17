const db = require('../middleware/db');

class ClienteRepository {
  async buscarSenhaPorEmail(email) {
    const result = await db.query(
      'SELECT senha FROM clientes WHERE email = $1',
      [email]
    );
    return result.rows[0]; // ou result.rows[0] se estiver usando pg direto
  }
}

module.exports = new ClienteRepository();
/*
await db.query('SELECT NOW()')
  .then(res => console.log('📦 Conectado ao PostgreSQL:', res.rows[0]))
  .catch(err => console.error('❌ Erro de conexão:', err));
*/    