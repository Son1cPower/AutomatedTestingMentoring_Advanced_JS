import logger from '../../../utils/loggers/logger.config';
const BaseComponent = require('../baseComponent');

class LaunchesByIDcomponent extends BaseComponent {
    constructor(id) {
        const launchesByID = `.gridRow__grid-row-wrapper--1dI9K[data-id="${id}"]`;
        logger.info(`Get element launchesByID with selector ${launchesByID}`);
        super(launchesByID);
        this.id = id;
    }

    get getLaunchesName() {
        const getLaunchesName = 'td .tooltip__tooltip-trigger--3Z4Hc.itemInfo__name--27fwI span';
        logger.info(`Get element getLaunchesName with selector ${getLaunchesName}`);
        return this.rootEl.$(getLaunchesName);
    }


    get getTotalTests() {
        const getTotalTests = '.launchSuiteGrid__total-col--1zT8z.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a';
        logger.info(`Get element getTotalTests with selector ${getTotalTests}`);
        return this.rootEl.$(getTotalTests);
    }
    get getPassedTests() {
        const getPassedTests = '.launchSuiteGrid__passed-col--2EZNC.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a';
        logger.info(`Get element getTotalBugs with selector ${getPassedTests}`);
        return this.rootEl.$(getPassedTests);
    }
    get getFailedTests() {
        const getFailedTests = '.launchSuiteGrid__failed-col--1LKOb.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a';
        logger.info(`Get element getTotalBugs with selector ${getFailedTests}`);
        return this.rootEl.$(getFailedTests);
    }
    get getSkippedTests() {
        const getSkippedTests = '.launchSuiteGrid__skipped-col--1zvap.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG a';
        logger.info(`Get element getTotalBugs with selector ${getSkippedTests}`);
        return this.rootEl.$(getSkippedTests);
    }
    get getCountOfProductBug() {
        const getCountOfProductBug = '.launchSuiteGrid__pb-col---Q-5f.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfProductBug with selector ${getCountOfProductBug}`);
        return this.rootEl.$(getCountOfProductBug);
    }
    get getCountOfAutomationBug() {
        const getCountOfAutomationBug = '.launchSuiteGrid__ab-col--1e3O7.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfAutomationBug with selector ${getCountOfAutomationBug}`);
        return this.rootEl.$(getCountOfAutomationBug);
    }

    get getCountOfSystemIssue() {
        const getCountOfSystemIssue = '.launchSuiteGrid__si-col--1selD.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfSystemIssue with selector ${getCountOfSystemIssue}`);
        return this.rootEl.$(getCountOfSystemIssue);
    }

    get getCountOfToInvestigate() {
        const getCountOfToInvestigate = '.launchSuiteGrid__ti-col--33O72.gridCell__grid-cell--3e2mS.gridCell__align-left--2beIG .donutChart__total--3QqJr';
        logger.info(`Get element getCountOfToInvestigate with selector ${getCountOfToInvestigate}`);
        return this.rootEl.$(getCountOfToInvestigate);
    }

    async openLaunches() {

        const getLaunchesLink = 'td>div>div>.itemInfo__name-link--1ItPc';
        logger.info(`Get element getLaunchesLink with selector ${getLaunchesLink}`);
        return (await this.rootEl.$(getLaunchesLink)).click()
    }

}

module.exports = LaunchesByIDcomponent;
