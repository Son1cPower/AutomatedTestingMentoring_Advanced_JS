const puppeteer = require('puppeteer');

const conf = require('../../../configs/conf');

const { resizeMouse, scrollToElement, dragAndDrop } = require('../../helpers/JsExecutors.js');
const { waitElementIsExist } = require('../../helpers/Waiters')

const LoginPage = require('./pageObjects/LoginPage');

const DashboardPage = require('./pageObjects/DashboardPage');

const loginPage = new LoginPage();

const dashBoardPage = new DashboardPage();




async function runPuppeteerTest() {
    let browser;
    let page;
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 },
        slowMo: 40,
        args: ['--start-maximized']
    });
    page = await browser.newPage();
    try {
        await page.goto(conf.URL);
        await loginPage.fillUsername(page, conf.LOGIN);
        await loginPage.fillPassword(page, conf.PASSWORD);
        await loginPage.clickSubmitButton(page);
        await page.waitForSelector('[class="gridCell__grid-cell--3e2mS gridCell__align-left--2beIG dashboardTable__name--1sWJs"]');
        await dashBoardPage.openDashboard(page);
        const itemToResizeXpath = '//*[@id="app"] //span [contains(@class, "react-resizable-handle react-resizable-handle-se") and contains(../div, "FAILED CASES TREND CHART")]';
        await waitElementIsExist(page, itemToResizeXpath)
        await page.screenshot({ path: 'src/tests/puppeteer/screen/resizeFrom.png' });
        await resizeMouse(page, itemToResizeXpath, 80, 80);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/resizeAfter.png' });
        await resizeMouse(page, itemToResizeXpath, -80, -80);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/dragFrom.png' });
        const dragFrom = "//div[text()='LAUNCH STATISTICS AREA']";
        const dragTo = "//div[text()='LAUNCH STATISTICS BAR']";
        await dragAndDrop(page, dragFrom, dragTo);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/dragAfter.png' });
        const item = "//div[text()='FLAKY TEST CASES']";
        await page.screenshot({ path: 'src/tests/puppeteer/screen/scrollBefore.png' });
        await scrollToElement(page, item);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/scrollAfter.png' });
        await browser.close();
    } catch (error) {
        console.error('Error:', error);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/error-screenshot.png' });
        await browser.close();
    }
}

runPuppeteerTest()