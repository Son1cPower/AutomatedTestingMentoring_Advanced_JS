const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')
const testDataSiutes = require('../../../src/dto/testData-Siute_9.json');

describe('Open and check Suites', () => {

  testDataSiutes.forEach((data) => {
    before('Select project by title and open launches', async () => {
      const sideBar = page('launches').sideBar
      await sideBar.selectProjectByTitle(conf.default.PROJECT);
      await sideBar.launches.click();
      await page('launches').launchesByID(data.launchesID).openLaunches()
      expect(await browser.getUrl()).toContain(data.launchesID);
    });

    it(`Check Name for Siute ID:${data.siuteID}`, async () => {
      await expect(await page('launches').suiteByID(data.siuteID).getSuiteName).toHaveText(data.name);
    });

    it(`Check Total tests for Siute ID:${data.siuteID}`, async () => {
      if (data.total) {
        await expect(await page('launches').suiteByID(data.siuteID).getTotalSiutes).toHaveText(data.total);
      } else
        await expect(await page('launches').suiteByID(data.siuteID).getTotalSiutes).not.toExist()
    });

    it(`Check Passed tests for Siute ID:${data.siuteID}`, async () => {
      if (data.passed) {
        await expect(await page('launches').suiteByID(data.siuteID).getPassedSiutes).toHaveText(data.passed);
      } else
        await expect(await page('launches').suiteByID(data.siuteID).getPassedSiutes).not.toExist()
    });

    it(`Check Failed tests for Siute ID:${data.siuteID}`, async () => {
      if (data.failed) {
        await expect(await page('launches').suiteByID(data.siuteID).getFailedSiutes).toHaveText(data.failed);
      } else
        await expect(await page('launches').suiteByID(data.siuteID).getFailedSiutes).not.toExist()
    });

    it(`Check Product Bug for Siute ID:${data.siuteID}`, async () => {
      if (data.productBug) {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesProductBug).toHaveText(data.productBug);
      } else
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesProductBug).not.toExist()
    });

    it(`Check Automation Bug for Siute ID:${data.siuteID}`, async () => {
      if (data.automationBug) {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesAutoBug).toHaveText(data.automationBug);
      } else
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesAutoBug).not.toExist()
    });

    it(`Check To Investigate for Siute ID:${data.siuteID}`, async () => {
      if (data.toInvestigate) {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesToInvestigate).toHaveText(data.toInvestigate);
      } else
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesToInvestigate).not.toExist()
    });
  });
});






