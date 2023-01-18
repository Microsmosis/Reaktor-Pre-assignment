const POOL = require("pg").Pool;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Creating a connection pool.
const pool = new POOL({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
});

module.exports = pool;
