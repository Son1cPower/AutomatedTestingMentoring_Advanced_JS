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
    await sideBar.selectProjectByTitle('stanislav_nehrii_personal');
    await sideBar.launches.click();
  });

  it('Ckeck total count of Launches', async () => {
    const expectedTotalLaunches = 5;
    await expect(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches)).toEqual(
      expectedTotalLaunches);
  });
});
