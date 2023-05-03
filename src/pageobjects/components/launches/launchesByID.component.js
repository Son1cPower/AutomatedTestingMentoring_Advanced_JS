/* eslint-disable indent */
import logger from '../../../utils/loggers/logger.config';
const BaseComponent = require('../baseComponent');

class LaunchesByIDcomponent extends BaseComponent {
    constructor(id) {
        const launchesByID = `.gridRow__grid-row-wrapper--1dI9K[data-id="${id}"]`;
        logger.info(`Get element launchesByID with selector ${launchesByID}`);
        super(launchesByID);
    }


    get countOfProductBug() {
        const countOfProductBug = '.launchSuiteGrid__pb-col---Q-5f.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element Launches with selector ${countOfProductBug}`);
        return this.rootEl.$(countOfProductBug);
    }
}

module.exports = LaunchesByIDcomponent;
