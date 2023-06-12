const { Then, Given } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const compareText = require('./utils/compare-text');
const conf = require('../../configs/conf')
const { siuteFunctions, launchFunctions } = require('../dict/helpBDDActions')

Given('I LogIn to Report Portal and selected my project', async function () {
  return expect(await browser.getUrl()).toContain(conf.PROJECT);
});

Then('Page title should {string} {string}', async function (shouldBeParam, titleText) {
  const pageTitle = await browser.getTitle();
  return compareText(pageTitle, titleText, shouldBeParam);
});

Then('Page url should {string} {string}', async function (shouldBeParam, urlText) {
  const pageURL = await browser.getUrl();
  return compareText(pageURL, urlText, shouldBeParam);
});

Then('total count of Launches should {string} {string}', async function (shouldBeParam, expectedTotalLaunches) {
  const totalLaunches = String(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches));
  return compareText(totalLaunches, expectedTotalLaunches, shouldBeParam);
});

Then('exist Launches IDs should {string} {string}', async function (shouldBeParam, expectedLaunchesIDs) {
  const allLaunchesIDs = (await page('launches').getArrayOfLaunchesIDs(await page('launches').getAllLaunches)).join(", ");
  return compareText(allLaunchesIDs, expectedLaunchesIDs, shouldBeParam);
});

Then('{string} for Launch ID:{string} {string} {string}', async function (type, launchesId, shouldBeParam, expectedValue) {

  if (expectedValue) {

    const value = await page('launches').launchesByID(launchesId)[launchFunctions[type]].getText();
    return compareText(value, expectedValue, shouldBeParam);
  } else {
    await expect(await page('launches').launchesByID(launchesId)[launchFunctions[type]]).not.toBeDisplayed();
  }
});

Then('{string} for Siute ID:{string} {string} {string}', async function (type, siuteID, shouldBeParam, expectedValue) {

  if (expectedValue) {

    const value = await page('launches').suiteByID(siuteID)[siuteFunctions[type]].getText();
    return compareText(value, expectedValue, shouldBeParam);
  } else {
    await expect(await page('launches').suiteByID(siuteID)[siuteFunctions[type]]).not.toBeDisplayed();
  }
});
