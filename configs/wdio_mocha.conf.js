import { config as sharedConfig } from './wdio.shared.conf'

exports.config = {
  ...sharedConfig, ...{
    specs: ['../src/tests/wdio/*.js'],
    framework: 'mocha',
    reporters: [
      'spec'
    ],
  }
};
