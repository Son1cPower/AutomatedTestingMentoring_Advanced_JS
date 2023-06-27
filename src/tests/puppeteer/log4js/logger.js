const log4js = require('log4js');

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'log/log4js/test.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});

const logger = log4js.getLogger();

logger.level = 'info';

module.exports = logger;