const LoginPage = require('../../pageobjects/pages/login.page');
const SideBar = require('../../pageobjects/components/sideBar');
const LaunchesPage = require('../../pageobjects/pages/launches.page');
import logger from '../../utils/loggers/logger.config';
const { LOGIN: login, PASSWORD: password } = require('dotenv').config().parsed;


describe('Open and check all Launches', () => {
  before('Login with credentials', async () => {
    logger.info('Start - login.page.js');
    await LoginPage.login(login, password);
  });

  beforeEach('Select project by title', async () => {
    logger.info('Start - sideBar.js');
    await SideBar.selectProjectByTitle('stanislav_nehrii_personal');
    logger.info('Open launches.page.js');
    await SideBar.launches.click();
  });

  it('Ckeck total count of Launches', async () => {
    const expectedTotalLaunches = 5;
    logger.info('Start - launches.page.js');
    await expect(await LaunchesPage.getTotalCountOfSelectors(await LaunchesPage.getAllLaunches)).toEqual(
      expectedTotalLaunches);
  });
});
