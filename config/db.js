require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Postgres connected!'))
  .catch(err => console.error('Postgres connection error:', err));

module.exports = client;
