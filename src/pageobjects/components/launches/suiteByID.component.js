/* eslint-disable indent */
import logger from '../../../utils/loggers/logger.config';
const BaseComponent = require('../baseComponent');

class SuiteByIDcomponent extends BaseComponent {
    constructor(id) {
        const suiteByID = `.gridRow__grid-row-wrapper--1dI9K[data-id="${id}"]`;
        logger.info(`Get element suiteByID with selector ${suiteByID}`);
        super(suiteByID);
    }
    get getSuiteName() {
        const getSuiteName = 'td .tooltip__tooltip-trigger--3Z4Hc.itemInfo__name--27fwI span';
        logger.info(`Get element getSuiteName with selector ${getSuiteName}`);
        return this.rootEl.$(getSuiteName);
    }
    get getTotalSiutes() {
        const getTotalSiutes = '.launchSuiteGrid__total-col--1zT8z.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a';
        logger.info(`Get element getTotalSiutes with selector ${getTotalSiutes}`);
        return this.rootEl.$(getTotalSiutes);
    }
    get getPassedSiutes() {
        const getPassedSiutes = '.launchSuiteGrid__passed-col--2EZNC.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a[href]';
        logger.info(`Get element getPassedSiutes with selector ${getPassedSiutes}`);
        return this.rootEl.$(getPassedSiutes);
    }
    get getFailedSiutes() {
        const getFailedSiutes = '.launchSuiteGrid__failed-col--1LKOb.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a[href]';
        logger.info(`Get element getFailedSiutes with selector ${getFailedSiutes}`);
        return this.rootEl.$(getFailedSiutes);
    }
    get getCountOfSiutesProductBug() {
        const getCountOfSiutesProductBug = '.launchSuiteGrid__pb-col---Q-5f.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfSiutesProductBug with selector ${getCountOfSiutesProductBug}`);
        return this.rootEl.$(getCountOfSiutesProductBug);
    }
    get getCountOfSiutesAutoBug() {
        const getCountOfSiutesAutoBug = '.launchSuiteGrid__ab-col--1e3O7.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfSiutesAutoBug with selector ${getCountOfSiutesAutoBug}`);
        return this.rootEl.$(getCountOfSiutesAutoBug);
    }
    get getCountOfSiutesToInvestigate() {
        const getCountOfSiutesToInvestigate = '.launchSuiteGrid__ti-col--33O72.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfSiutesToInvestigate with selector ${getCountOfSiutesToInvestigate}`);
        return this.rootEl.$(getCountOfSiutesToInvestigate);
    }
}
module.exports = SuiteByIDcomponent;
