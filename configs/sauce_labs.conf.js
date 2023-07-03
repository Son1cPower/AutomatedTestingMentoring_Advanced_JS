import { Reporter } from '@reportportal/agent-js-webdriverio';
import { config as sharedConfig } from './wdio_mocha.conf'
const conf = require('./conf')

const rpConfig = {
  token: "3af09063-fef7-4c03-971a-50f1a802826c",
  endpoint: "https://reportportal.epam.com/api/v1",
  project: 'stanislav_nehrii_personal',
  launch: 'stanislav_nehrii_TEST_EXAMPLE',
  mode: 'DEFAULT',
  debug: false,
  description: 'Static launch description',
  attributes: [{ key: 'key', value: 'value' }, { value: 'value' }],
  attachPicturesToLogs: true,
  reportSeleniumCommands: true,
  seleniumCommandsLogLevel: 'debug',
  cucumberNestedSteps: false,
};



exports.config = {
  ...sharedConfig, ...{
    // framework: 'cucumber',
    services: ['sauce'],
    // specs: [
    //   '../src/features/*.feature'
    // ],
    user: 'oauth-negriystas-5c441',
    key: 'e93bf4d2-5e9c-4636-9534-c9e0771b0973',
    region: 'eu',
    // cucumberOpts: {
    //   require: ['./src/step-definitions/*.steps.js', './src/step-definitions/hook.js'],
    //   backtrace: false,
    //   requireModule: [],
    //   dryRun: false,
    //   failFast: false,
    //   snippets: true,
    //   source: true,
    //   strict: false,
    //   tagExpression: '@Suites or @Launches or @SmokeTest',
    //   timeout: 60000,
    //   ignoreUndefinedDefinitions: false
    // },
    reporters: [[Reporter, rpConfig]],
  },
}