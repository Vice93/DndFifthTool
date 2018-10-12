/*jshint esversion: 6 */

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
  transports: [
    new transports.File({ filename: 'logg.log' })
  ],
  format: combine(
    timestamp(),
    myFormat
  ),
  level: 'info',
  exitOnError: false
});


module.exports = function(label, level, message) {
  logger.log({
    label: label != null ? label : 'None',
    level: level != null ? level : 'error',
    message: message != null ? message : 'None'
  });
};
