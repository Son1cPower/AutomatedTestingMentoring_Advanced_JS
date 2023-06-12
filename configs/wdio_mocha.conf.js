import { config as sharedConfig } from './wdio.shared.conf'
const conf = require('./conf')
const { page } = require('../src/pageobjects');

exports.config = {
  ...sharedConfig, ...{
    specs: ['../src/tests/wdio/*.js'],
    framework: 'mocha',
    reporters: [
      'spec'
    ],
  },
  before: async function (capabilities, specs) {
    await page('login').login(conf.default.LOGIN, conf.default.PASSWORD);
    await page('launches').sideBar.selectProjectByTitle(conf.default.PROJECT);
    await page('launches').sideBar.launches.click();
  },
};
