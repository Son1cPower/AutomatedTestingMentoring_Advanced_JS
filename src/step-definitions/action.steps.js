const { Given, When, Then } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');

Given(/^I am on the (\w+) page$/, async (page) => {
  console.log('!!!!!!!!!!!!!!!!!!!! + page')
  return browser.url(`https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard`)
  // await pages[page].open()
});

When('I open login page', function () {
  console.log('!!!!!!!!!!!!!!!!!!!!')
  return browser.url(`https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard`)
  // return await page('login');
});

// When('I open {string} page', function (pageName) {
//   console.log('!!!!!!!!!!!!!!!!!!!!')
//   return browser.url(`http://localhost:8080`)
//   // return await page('login');
// });

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
