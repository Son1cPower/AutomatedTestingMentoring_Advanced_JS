const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')
const testData = require('../../../configs/testData.json');

describe('Open and check all Launches', () => {

  before('Login with credentials', async () => {
    const login = conf.default.LOGIN
    const password = conf.default.PASSWORD
    await page('login').login(login, password);
  });

  beforeEach('Select project by title', async () => {
    const sideBar = page('launches').sideBar
    await sideBar.selectProjectByTitle('stanislav_nehrii_personal');
    await sideBar.launches.click();
  });

  testData.forEach((data) => {


    if (data.name) {
      it(`Ckeck Name for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getLaunchesName).toHaveText(data.name);
      });
    }

    if (data.total) {
      it(`Ckeck Passed tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getTotalTests).toHaveText(data.total);
      });
    }
    if (data.passed) {
      it(`Ckeck Passed tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getPassedTests).toHaveText(data.passed);
      });
    }
    if (data.failed) {
      it(`Ckeck Failed tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getFailedTests).toHaveText(data.failed);
      });
    }
    if (data.skipped) {
      it(`Ckeck Skipped tests for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getSkippedTests).toHaveText(data.skipped);
      });
    }
    if (data.productBug) {
      it(`Ckeck Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfProductBug).toHaveText(data.productBug);
      });
    }
    if (data.automationBug) {
      it(`Ckeck Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfAutomationBug).toHaveText(data.automationBug);
      });
    }
    if (data.systemIssue) {
      it(`Ckeck Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfSystemIssue).toHaveText(data.systemIssue);
      });
    }
    if (data.toInvestigate) {
      it(`Ckeck Product bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getCountOfToInvestigate).toHaveText(data.toInvestigate);
      });
    }
  });
});






