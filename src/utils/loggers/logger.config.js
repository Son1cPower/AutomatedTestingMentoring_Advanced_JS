import log4js from './log4js/logger';
import winston from './winston/logger';
const conf = require('../../../configs/conf')

let loggerType = conf.default.LOGGER
let logger = log4js;

if (loggerType === 'log4js') {
  logger = log4js;
} else if (loggerType === 'winston') {
  logger = winston;
} else {
  console.error(`Invalid logger type: [${loggerType}]. It can be log4js or winston`);
}

export default logger;
