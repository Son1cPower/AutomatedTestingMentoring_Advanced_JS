const conf = require("../../../configs/conf");
const { test, expect } = require("@playwright/test");
//const { selectors } = require("playwright");
const { scrollToElement, clickElem, dragAndDrop, resizeElement } = require("./../../helpers/JsExecutors");
const { waitElementIsDisplayed } = require("../../helpers/Waiters");

test.describe("Open and check all Launches", () => {
  test("Check total count of Launches", async ({ page }) => {
    await page.goto("http://localhost:8080/ui/#login");
    await page.locator("input[placeholder='Login']").fill(conf.LOGIN)
    await page.locator("input[placeholder='Password']").fill(conf.PASSWORD)
    await clickElem(page, 'button[type="submit"]');

    await page.locator("div[class='projectSelector__project-selector--FXbsR']").click();
    await page.locator(`.sidebar__sidebar--1J7aD span[title='${conf.PROJECT}']`).click();
    await page.locator('[class="sidebarButton__nav-link--2TC0L sidebarButton__active--3dvg_"]').click();
    await page.locator('[class="gridCell__grid-cell--3e2mS gridCell__align-left--2beIG dashboardTable__name--1sWJs"]').click();

    const dropFrom = page.getByText("LAUNCH STATISTICS AREA");
    const dropTo = page.getByText("LAUNCH STATISTICS BAR");
    await dragAndDrop(page, dropFrom, dropTo);

    await page.pause(10000)

    const elemntForResize = page.locator('.launchStatisticsChart__launch-statistics-chart--2JugX.launchStatisticsChart__area-view--17Qp6 svg')
    await resizeElement(page, elemntForResize, 800, 800)


    //const itemScroll = await page.getByText("Flaky test cases table (TOP-50)");
    //await scrollToElement(page, 'div > div > div > div.layout__content--2bbWd > div.scrollWrapper__scroll-component--3vuv7 > div.scrollWrapper__scrolling-content--XWgeG.scrollWrapper__with-footer--25_wC > div > div.layout__page-container--qkF50 > div > div.pageLayout__page-content--2R36V > div > div.container > div > div > div:nth-child(2) > div > div.widget__widget-header--eR4Gu.draggable-field.widget__modifiable--3g79h > div > div.widgetHeader__info-block--1n0yX > div.widgetHeader__widget-type--30B6s > span')


  });
});