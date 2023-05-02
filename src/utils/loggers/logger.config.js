import log4js from './log4js/logger';
import winston from './winston/logger';

const { LOGGER: loggerType } = require('dotenv').config().parsed;


//import dotenv from 'dotenv';
let logger = log4js;

//dotenv.config();
//const loggerType = process.env.LOGGER;

if (loggerType === 'log4js') {
  logger = log4js;
} else if (loggerType === 'winston') {
  logger = winston;
} else {
  console.error(`Invalid logger type: [${loggerType}]. It can be log4js or winston`);
}

export default logger;
