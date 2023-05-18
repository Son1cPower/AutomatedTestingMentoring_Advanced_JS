const { Before, BeforeAll } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const conf = require('../../configs/conf')


BeforeAll({ name: 'LogIn and Select project by title' }, async () => {
    await page('login').login(conf.default.LOGIN, conf.default.PASSWORD);
    await page('launches').sideBar.selectProjectByTitle(conf.default.PROJECT);
    expect(await browser.getUrl()).toContain(conf.default.PROJECT);
});

Before({ name: 'Open Launches page' }, async () => {
    await page('launches').sideBar.launches.click();
    expect(await browser.getUrl()).toContain(conf.default.PROJECT + '/launches/all');
});


