const { test, expect } = require('@playwright/test');
const Waiters = require('../../helpers/Waiters');
const JsExecutors = require('../../helpers/JsExecutors');

test.describe('Open and check all Launches', () => {
  test('Log in', async ({ page }) => {

    await page.goto('http://localhost:8080/ui/#login');

    await Waiters.waitElementIsDisplayed(page, "input[placeholder='Login']");
    await page.locator("input[placeholder='Login']").fill('superadmin');

    await Waiters.waitElementIsDisplayed(page, "input[placeholder='Password']");
    await page.locator("input[placeholder='Password']").fill('erebus');

    await Waiters.waitElementIsDisplayed(page, "button[type='submitt']");
    await Waiters.waitElementIsExist(page, "button[type='submit']");
    // await JsExecutors.javaScriptClick(page, "button[type='submit']")
    // await page.evaluate('arguments[0].click()', element);

    // const element = await page.locator("input[placeholder='Password']");
    // await browser.execute('arguments[0].click()', element);

    await page.waitForTimeout(5000);

  });
});
