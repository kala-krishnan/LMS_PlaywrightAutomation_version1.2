const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ],
});

//logger.info('All GOOD');


module.exports = logger;
//export default logger
//--------------------------------------------------
// const winston = require('winston');
// const { combine, timestamp, json } = winston.format;


// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'info',
//   format: combine(timestamp(), json()),
//   transports: [
//     new winston.transports.File({
//       filename: 'Log.log',
//     }),
//   ],
// });

// logger.info('Info message');
// logger.error('Error message');
// logger.warn('Warning message');

// module.exports={logger};