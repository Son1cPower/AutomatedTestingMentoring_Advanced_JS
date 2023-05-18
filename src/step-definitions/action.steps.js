const { Given, When, Then } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const conf = require('../../configs/conf')





Given('I open login page and LogIn', async function () {
  return await page('login').login(conf.default.LOGIN, conf.default.PASSWORD);
});

When('I select my project', async function () {
  return await page('launches').sideBar.selectProjectByTitle(conf.default.PROJECT);
});




When('I open launches on SideBar', async function () {
  return await page('launches').sideBar.launches.click()
});





When('I click {string} link from the side menu', function (link) {
  return page('dashboard').sideMenu.item(link).click();
});

When('I click add new doctor button from list header', function () {
  return page('doctors').doctorListHeader.addNewDoctorBtn.click();
});

When('I click {string} button in modal window', function (button) {
  return page('doctors').addDoctorModal.clickButton(button);
});

When('I wait {int} seconds', function (timeToWaitInSeconds) {
  return browser.pause(timeToWaitInSeconds * 1000);
});

// When(/^I wait (\d+) seconds$/, function(timeToWaitInSeconds) {
//   return browser.pause(timeToWaitInSeconds * 1000);
// });

/**
 * @param parameter {'name' | 'phone' | 'email' | 'education' | 'designation'}
 */

When('I input {string} to doctor {string} in modal window', function (value, parameter) {
  return page('doctors').addDoctorModal.input(parameter).setValue(value);
});
