import { config as sharedConfig } from './wdio.shared.conf'

exports.config = {
  ...sharedConfig, ...{
    specs: ['../src/tests/jasmine/*.js'],
    framework: 'jasmine',
  }
};
