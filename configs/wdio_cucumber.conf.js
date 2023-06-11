import { config as sharedConfig } from './wdio.shared.conf'
const allure = require('allure-commandline');

exports.config = {
    ...sharedConfig, ...{
        specs: [
            '../src/features/*.feature'
        ],
        framework: 'cucumber',
        cucumberOpts: {
            // <string[]> (file/dir) require files before executing features
            require: ['./src/step-definitions/*.steps.js', './src/step-definitions/hook.js'],
            // <boolean> show full backtrace for errors
            backtrace: false,
            // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
            requireModule: [],
            // <boolean> invoke formatters without executing steps
            dryRun: false,
            // <boolean> abort the run on first failure
            failFast: false,
            // <boolean> hide step definition snippets for pending steps
            snippets: true,
            // <boolean> hide source uris
            source: true,
            // <boolean> fail if there are any undefined or pending steps
            strict: false,
            // <string> (expression) only execute the features or scenarios with tags matching the expression
            tagExpression: '@Siutes or @Launches or @SmokeTest',
            // <number> timeout for step definitions
            timeout: 60000,
            // <boolean> Enable this config to treat undefined definitions as warnings.
            ignoreUndefinedDefinitions: false
        },
    }
}