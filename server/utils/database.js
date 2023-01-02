const POOL = require("pg").Pool;
require('dotenv').config({path:__dirname+'../../.env'})

const pool = new POOL({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;
