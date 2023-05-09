import logger from '../../utils/loggers/logger.config';
const { LaunchesByID, SuiteByID, SideBar } = require('../components');
const BaseComponent = require('../components/baseComponent');


class LaunchesPage extends BaseComponent {
  constructor() {
    const launchesTable = '.grid__grid--utIJA';
    logger.info(`Get element launchesTable with selector ${launchesTable}`);
    super(launchesTable);
    this.sideBar = new SideBar();
  }

  launchesByID(id) {
    return new LaunchesByID(id);
  }

  suiteByID(id) {
    return new SuiteByID(id);
  }

  get btnRefresh() {
    const btnRefresh = "div[class='actionPanel__action-button--3hEFC'] button[type='button']";
    logger.info(`Get element userName with selector ${btnRefresh}`);
    return $(btnRefresh);
  }

  get getAllLaunches() {
    const getAllLaunches = '.gridRow__grid-row-wrapper--1dI9K';
    logger.info(`Get element Launches with selector ${getAllLaunches}`);
    return this.rootEl.$$(getAllLaunches);
  }

  async getArrayOfLaunchesIDs(arrayOfSelectors) {
    const array = [];
    for (const selectors of arrayOfSelectors) {
      array.push(await selectors.getAttribute('data-id'));
    }
    return array.sort();
  }

}

module.exports = LaunchesPage;
