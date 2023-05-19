const { Given, When, Then } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const conf = require('../../configs/conf')


Given('I open login page and LogIn', async function () {
  return await page('login').login(conf.default.LOGIN, conf.default.PASSWORD);
});

When('I select my project', async function () {
  return await page('launches').sideBar.selectProjectByTitle(conf.default.PROJECT);
});

When('I open launches page on SideBar', async function () {
  return await page('launches').sideBar.launches.click()
});

When('I open launches ID:{string}', async function (launchesID) {
  await page('launches').launchesByID(launchesID).openLaunches()
});

When('I wait {int} seconds', function (timeToWaitInSeconds) {
  return browser.pause(timeToWaitInSeconds * 1000);
});
