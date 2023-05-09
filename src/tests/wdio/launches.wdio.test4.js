const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')
const testDataSiutes = require('../../../configs/testData-Siute_9.json');


describe('Open and check all Launches', () => {

  before('Login with credentials', async () => {
    const login = conf.default.LOGIN
    const password = conf.default.PASSWORD
    await page('login').login(login, password);
    const sideBar = page('launches').sideBar
    await sideBar.selectProjectByTitle('stanislav_nehrii_personal');
    await sideBar.launches.click();
    await page('launches').launchesByID("9").openLaunches()
  });

  // beforeEach('Select project by title', async () => {
  //   const sideBar = page('launches').sideBar
  //   await sideBar.selectProjectByTitle('stanislav_nehrii_personal');
  //   await sideBar.launches.click();
  //   await page('launches').launchesByID("9").openSiute(9)

  // });

  testDataSiutes.forEach((data) => {



    // if (data.name) {
    //   it(`Ckeck Passed tests for Launche ID:${data.siuteID}`, async () => {
    //     page('launches').launchesByID(data.launchesID).getTestName.click()
    //     // await expect(await page('launches').suiteByID(data.siuteID).getSuiteName).toHaveText(data.name);
    //   });
    //}
    if (data.total) {
      it(`Ckeck Total tests for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getTotalSiutes).toHaveText(data.total);
      });
    }
    if (data.passed) {
      it(`Ckeck Passed tests for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getPassedSiutes).toHaveText(data.passed);
      });
    }
    if (data.failed) {
      it(`Ckeck Failed tests for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getFailedSiutes).toHaveText(data.failed);
      });
    }

    if (data.productBug) {
      it(`Ckeck Product Bug for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesProductBug).toHaveText(data.productBug);
      });
    }

    if (data.automationBug) {
      it(`Ckeck Automation Bug for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesAutoBug).toHaveText(data.automationBug);
      });
    }
    if (data.toInvestigate) {
      it(`Ckeck To Investigate for Siute ID:${data.siuteID}`, async () => {
        await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesToInvestigate).toHaveText(data.toInvestigate);
      });
    }

  });



});






