import * as log4js from 'log4js';

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'log/log4js/test.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});

const log4jsLogger = log4js.getLogger();

log4jsLogger.level = 'info';
// logger.debug("!!!! START DEBUG MODE !!!");

export default log4jsLogger;
