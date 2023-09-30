const { Pool } = require('pg');

const pool = new Pool({
  user: 'dukeguessr',
  host: 'dukeguessrdb.c8fcp25g5hiz.us-east-1.rds.amazonaws.com',
  database: 'dukeguessrdb',
  password: 'We_Love_Alex_Cha0',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Use this only if your RDS instance isn't using an SSL certificate.
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};