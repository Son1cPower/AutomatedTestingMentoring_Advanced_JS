const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')


describe('Open and check all Launches', () => {
  beforeAll('Login with credentials', async () => {
    const login = conf.default.LOGIN
    const password = conf.default.PASSWORD
    await page('login').login(login, password);
  });

  beforeEach('Select project by title', async () => {
    const sideBar = page('launches').sideBar
    await sideBar.selectProjectByTitle('stanislav_nehrii_personal');
    await sideBar.launches.click();
  });

  it('Ckeck Product bug for Launche ID', async () => {
    await expect(await page('launches').launchesByID(7).countOfProductBug).toHaveText('1');
  });
});
