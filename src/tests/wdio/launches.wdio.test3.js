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
    it(`Check Name for Launche ID:${data.launchesID}`, async () => {
      await expect(await page('launches').launchesByID(data.launchesID).getLaunchesName).toHaveText(data.name);
    });

    it(`Check Total tests for Launche ID:${data.launchesID}`, async () => {
      if (data.total) {
        await expect(await page('launches').launchesByID(data.launchesID).getTotalTests).toHaveText(data.total);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getTotalTests).not.toExist()
    });

    it(`Check Passed tests for Launche ID:${data.launchesID}`, async () => {
      if (data.passed) {
        await expect(await page('launches').launchesByID(data.launchesID).getPassedTests).toHaveText(data.passed);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getPassedTests).not.toExist()
    });

    it(`Check Failed tests for Launche ID:${data.launchesID}`, async () => {
      if (data.failed) {
        await expect(await page('launches').launchesByID(data.launchesID).getFailedTests).toHaveText(data.failed);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getFailedTests).not.toExist()
    });

    it(`Check Skipped tests for Launche ID:${data.launchesID}`, async () => {
      if (data.skipped) {
        await expect(await page('launches').launchesByID(data.launchesID).getSkippedTests).toHaveText(data.skipped)
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getSkippedTests).not.toExist()
    });

    it(`Check Product bugs for Launche ID:${data.launchesID}`, async () => {
      if (data.productBug) {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfProductBug).toHaveText(data.productBug);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfProductBug).not.toExist()
    });

    it(`Check Auto bugs for Launche ID:${data.launchesID}`, async () => {
      if (data.automationBug) {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfAutomationBug).toHaveText(data.automationBug);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfAutomationBug).not.toExist()
    });

    it(`Check System Issie for Launche ID:${data.launchesID}`, async () => {
      if (data.systemIssue) {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfSystemIssue).toHaveText(data.systemIssue);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfSystemIssue).not.toExist()
    });

    it(`Check To Investiagte for Launche ID:${data.launchesID}`, async () => {
      if (data.toInvestigate) {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfToInvestigate).toHaveText(data.toInvestigate);
      } else
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfToInvestigate).not.toExist()
    });
  });
});






