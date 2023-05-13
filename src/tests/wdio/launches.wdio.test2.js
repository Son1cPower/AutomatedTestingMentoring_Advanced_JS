const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')

describe('Open and check all Launches', () => {
  before('Login with credentials', async () => {
    const login = conf.default.LOGIN
    const password = conf.default.PASSWORD
    await page('login').login(login, password);
  });

  beforeEach('Select project by title', async () => {
    const sideBar = page('launches').sideBar
    await sideBar.selectProjectByTitle(conf.default.PROJECT);
    await sideBar.launches.click();
  });

  it('Check exist Launches IDs', async () => {
    const expectedLaunchesIDs = ['10', '6', '7', '8', '9'];
    await expect(await page('launches').getArrayOfLaunchesIDs(await page('launches').getAllLaunches)).toEqual(
      expectedLaunchesIDs,
    );
  });
});
