import { config as sharedConfig } from './wdio.shared.conf'
const conf = require('./conf')
const { page } = require('../src/pageobjects');

exports.config = {
  ...sharedConfig, ...{
    specs: ['../src/tests/wdio/*.js'],
    framework: 'mocha',
  },
  before: async function (capabilities, specs) {
    await page('login').login(conf.LOGIN, conf.PASSWORD);
    await page('launches').sideBar.selectProjectByTitle(conf.PROJECT);
    await page('launches').sideBar.launches.click();
  },
};
