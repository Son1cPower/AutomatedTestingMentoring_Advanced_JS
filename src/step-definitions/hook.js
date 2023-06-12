const { Before, BeforeAll } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const conf = require('../../configs/conf')

BeforeAll({ name: 'LogIn and Select project by title' }, async () => {
    await page('login').login(conf.LOGIN, conf.PASSWORD);
    await page('launches').sideBar.selectProjectByTitle(conf.PROJECT);
    expect(await browser.getUrl()).toContain(conf.PROJECT);
});

Before({ name: 'Open Launches page' }, async () => {
    await page('launches').sideBar.launches.click();
    expect(await browser.getUrl()).toContain(conf.PROJECT + '/launches/all');
});


