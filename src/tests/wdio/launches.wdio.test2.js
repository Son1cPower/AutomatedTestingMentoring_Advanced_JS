const { page } = require('../../pageobjects');
import logger from '../../utils/loggers/logger.config';
const { LOGIN: login, PASSWORD: password } = require('dotenv').config().parsed;

describe('Open and check all Launches', () => {
  before('Login with credentials', async () => {
    logger.info('Start - login.page.js');
    await page('login').login(login, password);
  });

  beforeEach('Select project by title', async () => {
    logger.info('Start - sideBar.js');
    await page('launches').sideBar.selectProjectByTitle('stanislav_nehrii_personal');
    logger.info('Open launches.page.js');
    await page('launches').sideBar.launches.click();
  });


  it('Ckeck exist Launches IDs', async () => {
    const expectedLaunchesIDs = ['10', '6', '7', '8', '9'];
    await expect(await page('launches').getArrayOfLaunchesIDs(await page('launches').getAllLaunches)).toEqual(
      expectedLaunchesIDs,
    );
  });
});
