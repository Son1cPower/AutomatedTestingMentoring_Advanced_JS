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


  it('Ckeck Product bug for Launche ID', async () => {
    const idLaunches = '7';
    await expect(await LaunchesPage.getLaunchesByID(idLaunches)).toExist();
    //await expect(await LaunchesPage.getLauncheByID(7).$('.launchSuiteGrid__pb-col---Q-5f.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr')).toHaveText('1')
    //await expect(await LaunchesPage.getLauncheByID(7).LaunchesPage.getProductBugForLaunche).toHaveText('1')

    await expect(await $('.grid__grid--utIJA .gridRow__grid-row-wrapper--1dI9K[data-id="7"] .launchSuiteGrid__pb-col---Q-5f.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr')).toHaveText('1');
  });
});
