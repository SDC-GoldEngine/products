require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'johnnywu',
  database: 'productsdb',
  password: '',
  port: 5432,
});

pool.connect()
  .then(() => console.log('database productsdb connected'))
  .catch((err) => console.error('connection unsuccessful', err));

module.exports = pool;

// DEPLOY NOTE
// look up secure copy terminal commands
// from my machine copy over to deploy machine for csv data
