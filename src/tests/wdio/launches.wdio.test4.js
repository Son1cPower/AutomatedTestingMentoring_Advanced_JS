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
    if (data.name) {
      it(`Check Name for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getSuiteName).toHaveText(data.name);
      });
    }
    if (data.total) {
      it(`Check Total tests for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getTotalSiutes).toHaveText(data.total);
      });
    }
    if (data.passed) {
      it(`Check Passed tests for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getPassedSiutes).toHaveText(data.passed);
      });
    }
    if (data.failed) {
      it(`Check Failed tests for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getFailedSiutes).toHaveText(data.failed);
      });
    }
    if (data.productBug) {
      it(`Check Product Bug for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesProductBug).toHaveText(data.productBug);
      });
    }
    if (data.automationBug) {
      it(`Check Automation Bug for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesAutoBug).toHaveText(data.automationBug);
      });
    }
    if (data.toInvestigate) {
      it(`Check To Investigate for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesToInvestigate).toHaveText(data.toInvestigate);
      });
    }
  });
});






