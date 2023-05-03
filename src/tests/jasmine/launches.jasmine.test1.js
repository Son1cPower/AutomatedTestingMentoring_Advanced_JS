import logger from '../../utils/loggers/logger.config';
const { LOGIN: login, PASSWORD: password } = require('dotenv').config().parsed;
const { page } = require('../../pageobjects');

describe('Open and check all Launches', () => {
  beforeAll('Login with credentials', async () => {
    logger.info('Start - login.page.js');
    await page('login').login(login, password);
  });

  beforeEach('Select project by title', async () => {
    logger.info('Start - sideBar.js');
    await page('launches').sideBar.selectProjectByTitle('stanislav_nehrii_personal');
    logger.info('Open launches.page.js');
    await page('launches').sideBar.launches.click();
  });

  it('Ckeck total count of Launches', async () => {
    const expectedTotalLaunches = 5;
    logger.info('Start - launches.page.js');
    await expect(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches)).toEqual(
      expectedTotalLaunches);
  });
});
