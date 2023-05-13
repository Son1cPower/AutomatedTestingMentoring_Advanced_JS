const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')

describe('Open and check all Launches', () => {
  before('Select project by title', async () => {
    const sideBar = page('launches').sideBar
    await sideBar.selectProjectByTitle(conf.default.PROJECT);
    await sideBar.launches.click();
    expect(await browser.getUrl()).toContain(conf.default.PROJECT + '/launches/all');
  });

  it('Check total count of Launches', async () => {
    const expectedTotalLaunches = 5;
    await expect(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches)).toEqual(
      expectedTotalLaunches);
  });
});
