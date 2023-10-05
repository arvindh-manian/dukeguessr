const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host:  process.env.DB_HOST,
  database:  process.env.DB_NAME,
  password:  process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Use this only if your RDS instance isn't using an SSL certificate.
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};