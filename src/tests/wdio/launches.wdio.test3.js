const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')
const testData = require('../../../src/dto/testData.json');

describe('Open and check all Launches', () => {
  before('Select project by title', async () => {
    const sideBar = page('launches').sideBar
    await sideBar.selectProjectByTitle(conf.default.PROJECT);
    await sideBar.launches.click();
    expect(await browser.getUrl()).toContain(conf.default.PROJECT + '/launches/all');
  });
  testData.forEach((data) => {
    if (data.name) {
      it(`Check Name for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getLaunchesName).toHaveText(data.name);
      });
    }
    if (data.total) {
      it(`Check Total tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getTotalTests).toHaveText(data.total);
      });
    }
    if (data.passed) {
      it(`Check Passed tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getPassedTests).toHaveText(data.passed);
      });
    }
    if (data.failed) {
      it(`Check Failed tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getFailedTests).toHaveText(data.failed);
      });
    }
    if (data.skipped) {
      it(`Check Skipped tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getSkippedTests).toHaveText(data.skipped);
      });
    }
    if (data.productBug) {
      it(`Check Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfProductBug).toHaveText(data.productBug);
      });
    }
    if (data.automationBug) {
      it(`Check Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfAutomationBug).toHaveText(data.automationBug);
      });
    }
    if (data.systemIssue) {
      it(`Check Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfSystemIssue).toHaveText(data.systemIssue);
      });
    }
    if (data.toInvestigate) {
      it(`Check Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfToInvestigate).toHaveText(data.toInvestigate);
      });
    }
  });
});






