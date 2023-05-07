const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')
const testData = require('../../../configs/testData.json');

describe('Open and check all Launches', () => {


  // const testData = [
  //   { launchesID: '6', total: '10', automationBug: '1', systemIssue: '8', toInvestigate: '5' },
  //   { launchesID: '7', total: '15', productBug: '1', automationBug: '5', systemIssue: '4', toInvestigate: '8' },
  //   { launchesID: '8', total: '20', productBug: '4', automationBug: '4', toInvestigate: '10' },
  //   { launchesID: '9', total: '25', productBug: '4', automationBug: '1', toInvestigate: '2' },
  //   { launchesID: '10', total: '30' }
  // ];

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

    if (data.total) {
      it(`Ckeck Total bugs for Launche ID:${data.launchesID}`, async () => {
        await expect(await page('launches').launchesByID(data.launchesID).getTotalBugs).toHaveText(data.total);
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






