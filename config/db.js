require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Postgres connected!'))
  .catch(err => console.error('Postgres connection error:', err));

module.exports = client;
