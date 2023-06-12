const { test, expect } = require('@playwright/test');

test.describe('Open and check all Launches', () => {
  test('Log in', async ({ page }) => {
    await page.goto('http://localhost:8080/ui/#login');
    await page.locator("input[placeholder='Login']").fill('superadmin');
    await page.locator("input[placeholder='Password']").fill('erebus');
    await page.locator("button[type='submit']").click();
  });
});
