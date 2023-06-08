const { test, expect } = require('@playwright/test');
const { pages } = require('../../pageobjects');
const conf = require('../../../configs/conf');

test.describe('Open and check all Launches', () => {
  // test('Ckeck total count of Launches', async ({ page }) => {
  //   await pages('login').login(conf.LOGIN, conf.PASSWORD);
  //   await pages('launches').sideBar.selectProjectByTitle(conf.PROJECT);
  //   await pages('launches').sideBar.launches.click();
  // });
  test('Log in', async ({ page }) => {
    await page.goto('http://localhost:8080/ui/#login');
    await page.locator("input[placeholder='Login']").fill('superadmin');
    await page.locator("input[placeholder='Password']").fill('erebus');
    await page.locator("button[type='submit']").click();
  });
});
