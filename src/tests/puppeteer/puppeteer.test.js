const puppeteer = require('puppeteer');
const conf = require('../../../configs/conf');
const { resizeMouse, scrollToElement, dragAndDrop } = require('../../helpers/JsExecutors.js');
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
    page = (await browser.pages())[0];
    await page.bringToFront();
    try {
        await page.goto(conf.URL);
        await loginPage.fillUsername(page, conf.LOGIN);
        await loginPage.fillPassword(page, conf.PASSWORD);
        await loginPage.clickSubmitButton(page);
        await page.waitForSelector('div[class="projectSelector__project-selector--FXbsR"]');
        // await page.waitForSelector('[class="gridCell__grid-cell--3e2mS gridCell__align-left--2beIG dashboardTable__name--1sWJs"]');
        await dashBoardPage.openDashboard(page);
        const itemToResizeXpath = '//*[@id="app"] //span [contains(@class, "react-resizable-handle react-resizable-handle-se") and contains(../div, "FAILED CASES TREND CHART")]';
        await page.screenshot({ path: 'src/tests/puppeteer/screen/resizeFrom.png' });
        await resizeMouse(page, itemToResizeXpath, 80, 80);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/resizeAfter.png' });
        await resizeMouse(page, itemToResizeXpath, -80, -80);
        const source = "//div[text()='LAUNCH STATISTICS AREA']";
        const target = "//div[text()='LAUNCH STATISTICS BAR']";
        await page.screenshot({ path: 'src/tests/puppeteer/screen/dragBefore.png' });
        await dragAndDrop(page, source, target);
        await page.screenshot({ path: 'src/tests/puppeteer/screen/dragAfter.png' });
        //await dragAndDrop(page, target, source);
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