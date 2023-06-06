const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')

describe('Open and check all Launches', () => {
  beforeAll('Select project by title', async () => {
    expect(await browser.getUrl()).toContain(conf.PROJECT + '/launches/all');
  });

  it('Check total count of Launches', async () => {
    const expectedTotalLaunches = 5;
    await expect(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches)).toEqual(
      expectedTotalLaunches);
  });
  it('Check exist Launches IDs', async () => {
    const expectedLaunchesIDs = ['1', '2', '3', '4', '5'];
    await expect(await page('launches').getArrayOfLaunchesIDs(await page('launches').getAllLaunches)).toEqual(
      expectedLaunchesIDs,
    );
  });
});
