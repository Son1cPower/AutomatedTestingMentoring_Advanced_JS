import { config as sharedConfig } from './wdio.shared.conf'

exports.config = {
  ...sharedConfig, ...{

    specs: ['../src/tests/wdio/*.js'],

    capabilities: [
      {

        maxInstances: 5,

        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: [
            '--no-sandbox',
            '--disable-infobars',
            // '--headless',
            '--disable-gpu',
            '--window-size=1600,900',
          ],
        },

      },
    ],

    framework: 'mocha',

    reporters: [
      'spec',
      ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      }]
    ],




  }
};
