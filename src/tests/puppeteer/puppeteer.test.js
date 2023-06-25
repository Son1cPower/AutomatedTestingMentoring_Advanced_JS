const puppeteer = require('puppeteer');

const conf = require('../../../configs/conf');

const { resizeMouse, scrollToElement, dragAndDrop } = require('../../helpers/JsExecutors');

const LoginPage = require('./pageObjects/LoginPage');

const DashboardPage = require('./pageObjects/DashboardPage');

const loginPage = new LoginPage();

const dashBoardPage = new DashboardPage();




async function runPuppeteerTest() {

    let browser;

    let page;

    browser = await puppeteer.launch({
        headless: false,

        defaultViewport: null,

        args: ['--start-maximized']
    });

    page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });

    try {

        await page.goto(conf.URL);

        await loginPage.fillUsername(page, conf.LOGIN);

        await loginPage.fillPassword(page, conf.PASSWORD);

        await loginPage.clickSubmitButton(page);

        await page.waitForSelector('[class="gridCell__grid-cell--3e2mS gridCell__align-left--2beIG dashboardTable__name--1sWJs"]');

        await dashBoardPage.openDashboard(page);

        const itemToResizeXpath = 'div > div > div > div.layout__content--2bbWd > div.scrollWrapper__scroll-component--3vuv7 > div.scrollWrapper__scrolling-content--XWgeG.scrollWrapper__with-footer--25_wC > div > div.layout__page-container--qkF50 > div > div.pageLayout__page-content--2R36V > div > div.container > div > div > div:nth-child(1) > span';

        await resizeMouse(page, itemToResizeXpath, 150, 150);

        const item = '#app > div > div > div > div.layout__content--2bbWd > div.scrollWrapper__scroll-component--3vuv7 > div.scrollWrapper__scrolling-content--XWgeG.scrollWrapper__with-footer--25_wC > div.layout__scrolling-content--1Wdau > div.layout__page-container--qkF50 > div > div.pageLayout__page-content--2R36V > div > div.container > div > div > div:nth-child(9) > div > div.widget__widget-header--eR4Gu.draggable-field.widget__modifiable--3g79h > div > div.widgetHeader__info-block--1n0yX > div.widgetHeader__widget-name--FjJLi > div.widgetHeader__widget-name-block--7fZoV';

        await scrollToElement(page, item);

        const dragFrom = '#app > div > div > div > div.layout__content--2bbWd > div.scrollWrapper__scroll-component--3vuv7 > div.scrollWrapper__scrolling-content--XWgeG.scrollWrapper__with-footer--25_wC > div > div.layout__page-container--qkF50 > div > div.pageLayout__page-content--2R36V > div > div.container > div > div > div:nth-child(1) > div > div.widget__widget-header--eR4Gu.draggable-field.widget__modifiable--3g79h > div > div.widgetHeader__info-block--1n0yX > div.widgetHeader__widget-name--FjJLi > div.widgetHeader__widget-name-block--7fZoV';

        const dragTo = '#app > div > div  div > div.layout__content--2bbWd > div.scrollWrapper__scroll-component--3vuv7 > div.scrollWrapper__scrolling-content--XWgeG.scrollWrapper__with-footer--25_wC > div > div.layout__page-container--qkF50 > div > div.pageLayout__page-content--2R36V > div > div.container > div > div > div:nth-child(5) > div > div.widget__widget-header--eR4Gu.draggable-field.widget__modifiable--3g79h > div > div.widgetHeader__info-block--1n0yX > div.widgetHeader__widget-name--FjJLi > div.widgetHeader__widget-name-block--7fZoV';

        await dragAndDrop(page, dragFrom, dragTo);

        await browser.close();

    } catch (error) {

        console.error('Error:', error);

        await page.screenshot({ path: 'src/tests/puppeteer/screen/error-screenshot.png' });

        await browser.close();

    }

}




runPuppeteerTest();