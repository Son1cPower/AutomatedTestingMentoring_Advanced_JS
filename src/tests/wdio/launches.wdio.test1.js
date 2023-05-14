const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')

describe('Open and check all Launches', () => {
  before('Select project by title', async () => {
    expect(await browser.getUrl()).toContain(conf.default.PROJECT + '/launches/all');
  });

  it('Check total count of Launches', async () => {
    const expectedTotalLaunches = 5;
    await expect(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches)).toEqual(
      expectedTotalLaunches);
  });
  it('Check exist Launches IDs', async () => {
    const expectedLaunchesIDs = ['10', '6', '7', '8', '9'];
    await expect(await page('launches').getArrayOfLaunchesIDs(await page('launches').getAllLaunches)).toEqual(
      expectedLaunchesIDs,
    );
  });
});
