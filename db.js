const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

exports.query = async (text, params) => {
  const res = await pool.query(text, params);
  return res;
}

exports.closePool = async () => {
  await pool.end();
}