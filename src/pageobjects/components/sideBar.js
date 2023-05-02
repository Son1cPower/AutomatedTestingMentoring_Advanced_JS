import logger from '../../utils/loggers/logger.config';

const BaseComponent = require('../components/baseComponent');

class SideBar extends BaseComponent {
  constructor() {
    const sideBar = '.sidebar__sidebar--1J7aD';
    logger.info(`Get element sideBar with selector ${sideBar}`);
    super(sideBar);
  }

  async selectProjectByTitle(title) {
    const projectSelector = "div[class='projectSelector__project-selector--FXbsR']";
    logger.info(`Get element projectSelector with selector ${projectSelector}`);
    await this.rootEl.$(projectSelector).click();

    const projectByTitle = `span[title='${title}']`;
    logger.info(`Get element projectByTitle with selector ${projectByTitle}`);
    await this.rootEl.$(projectByTitle).click();
  }

  get launches() {
    const launches = 'a[href*="launches"]';
    logger.info(`Get element Launches with selector ${launches}`);
    return this.rootEl.$(launches);
  }
}

module.exports = new SideBar();
