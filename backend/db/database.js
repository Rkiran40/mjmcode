// require('dotenv').config();
// const mysql = require("mysql2/promise");
// const logger = require("../utils/logger");

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "pratyaksha_admin",
//   password: process.env.DB_PASSWORD || "pratyaksha@News26",
//   database: process.env.DB_NAME || "pratyaksha_news",
//   waitForConnections: true,
//   connectionLimit: process.env.DB_POOL_LIMIT || 10,
//   queueLimit: 0,
// });

// // Test database connection
// pool.getConnection()
//   .then((connection) => {
//     logger.info("Database connected successfully");
//     connection.release();
//   })
//   .catch((err) => {
//     logger.error("Database connection failed", { error: err.message });
//     process.exit(1);
//   });

// // Handle connection errors
// pool.on('error', (err) => {
//   logger.error("Unexpected database error", { error: err.message });
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     process.exit(1);
//   }
//   if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
//     process.exit(1);
//   }
//   if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
//     process.exit(1);
//   }
// });

// module.exports = pool;


require("dotenv").config();
const mysql = require("mysql2/promise");
const logger = require("../utils/logger");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "pratyaksha_admin",
  password: process.env.DB_PASSWORD || "pratyaksha@News26",
  database: process.env.DB_NAME || "pratyaksha_news",
  waitForConnections: true,
  connectionLimit: process.env.DB_POOL_LIMIT || 10,
  queueLimit: 0,
});

/* ===============================
   TEST CONNECTION
================================ */
pool.getConnection()
  .then((connection) => {
    logger.info("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    logger.error("Database connection failed", { error: err.message });
    process.exit(1);
  });

/* ===============================
   HANDLE DB ERRORS
================================ */
pool.on("error", (err) => {
  logger.error("Unexpected database error", { error: err.message });

  if (
    err.code === "PROTOCOL_CONNECTION_LOST" ||
    err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"
  ) {
    process.exit(1);
  }
});

module.exports = pool;