
const puppeteer = require('puppeteer');




class DashboardPage {

    async openDashboard(page) {

        await page.click('[class="gridCell__grid-cell--3e2mS gridCell__align-left--2beIG dashboardTable__name--1sWJs"]');

    }

}

module.exports = DashboardPage;