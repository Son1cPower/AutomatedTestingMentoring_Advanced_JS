const { Before, BeforeAll } = require('@wdio/cucumber-framework');

Before({ name: 'console log' }, () => console.log('Before hook for Each Test'));

BeforeAll({ name: 'console log' }, () => console.log('Before hook for All Test'));
