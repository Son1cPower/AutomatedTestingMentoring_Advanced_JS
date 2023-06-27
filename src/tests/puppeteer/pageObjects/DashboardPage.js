const conf = require('../../../../configs/conf');
const puppeteer = require('puppeteer');




class DashboardPage {

    async openDashboard(page) {

        await page.click('div[class="projectSelector__project-selector--FXbsR"]');
        await page.click(`.sidebar__sidebar--1J7aD span[title='${conf.PROJECT}']`);
        await page.click('[class="sidebarButton__nav-link--2TC0L sidebarButton__active--3dvg_"]');
        await page.click('[class="gridCell__grid-cell--3e2mS gridCell__align-left--2beIG dashboardTable__name--1sWJs"]');
    }

}

module.exports = DashboardPage;