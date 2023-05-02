const { test, expect } = require('@playwright/test');
import logger from '../../utils/loggers/logger.config';

test.describe('Open and check all Launches', () => {
  test('Ckeck total count of Launches', async ({ page }) => {
    logger.info(`Start - launches.playwright.test.js`);
    await page.goto('http://localhost:8080/ui/#login');

    await page.locator("input[placeholder='Login']").fill('superadmin');
    await page.locator("input[placeholder='Password']").fill('erebus');
    await page.locator("button[type='submit']").click();

    // await page.pause(3000)
  });
});
