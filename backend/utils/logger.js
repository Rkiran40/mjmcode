// Simple logging utility for production
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLogLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'info'];

const formatLog = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  return data ? `${logMessage} ${JSON.stringify(data)}` : logMessage;
};

const writeLog = (level, message, data) => {
  const logFile = path.join(logsDir, 'app.log');
  const logEntry = formatLog(level, message, data);
  fs.appendFileSync(logFile, logEntry + '\n');
  console.log(logEntry);
};

module.exports = {
  error: (message, data) => {
    if (LOG_LEVELS.error <= currentLogLevel) {
      writeLog('error', message, data);
    }
  },
  warn: (message, data) => {
    if (LOG_LEVELS.warn <= currentLogLevel) {
      writeLog('warn', message, data);
    }
  },
  info: (message, data) => {
    if (LOG_LEVELS.info <= currentLogLevel) {
      writeLog('info', message, data);
    }
  },
  debug: (message, data) => {
    if (LOG_LEVELS.debug <= currentLogLevel) {
      writeLog('debug', message, data);
    }
  }
};
