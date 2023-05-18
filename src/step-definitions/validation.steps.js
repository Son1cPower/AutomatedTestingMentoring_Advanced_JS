const { Then } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const compareText = require('./utils/compare-text');

Then('Page title should {string} {string}', async function (shouldBeParam, titleText) {
  const pageTitle = await browser.getTitle();
  return compareText(pageTitle, titleText, shouldBeParam);
});


Then('Page url should {string} {string}', async function (shouldBeParam, urlText) {
  const pageURL = await browser.getUrl();
  return compareText(pageURL, urlText, shouldBeParam);
});


Then('total count of Launches should {string} {string}', async function (shouldBeParam, expectedTotalLaunches) {
  const totalLaunches = String(await page('launches').getTotalCountOfSelectors(await page('launches').getAllLaunches));
  return compareText(totalLaunches, expectedTotalLaunches, shouldBeParam);
});


Then('exist Launches IDs should {string} {string}', async function (shouldBeParam, expectedLaunchesIDs) {
  const allLaunchesIDs = (await page('launches').getArrayOfLaunchesIDs(await page('launches').getAllLaunches)).join(", ");
  return compareText(allLaunchesIDs, expectedLaunchesIDs, shouldBeParam);
});



Then('Name for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedLaunchesName) {
  const launchesName = await page('launches').launchesByID(launchesId).getLaunchesName.getText();
  // console.log("!!!!!!!!! " + launchesName)
  // console.log("????????? " + await page('launches').launchesByID(3).getLaunchesName.getText())
  return compareText(launchesName, expectedLaunchesName, shouldBeParam);
});










Then(/^modal window should( not)? be displayed$/, async param => {
  let assert = expect(page('doctors').addDoctorModal.rootEl);
  if (param) {
    assert = assert.not;
  }
  return assert.toBeDisplayed();
});

// Then(/^Page title should "(:not )? (conatin|be equal to)" "(.*)"$/, function(notArg, shouldBeParam, titleText) {
//   const compareParameter = `${notArg}${shouldBeParam}`;
//   const pageTitle = await browser.getTitle();
//   return compareText(pageTitle, titleText, shouldBeParam, compareParameter);
// });

// /**
//  * @param parameter {'name' | 'phone' | 'email' | 'education' | 'designation'}
//  */
// Then('Specialist Card ID={string} should {string} {string} {string}', async function (id, shouldBeParam, parameter, titleText) {
//   const pageTitle = await page('doctors').specialistCard(id).checkSpecialistParameter(parameter).getText();
//   return compareText(pageTitle, titleText, shouldBeParam);
// });

Then('Specialist Card ID={string} should {string} name {string}', async function (id, shouldBeParam, titleText) {
  const specialistParameter = await page('doctors').specialistCard(id).name.getText();
  return compareText(specialistParameter, titleText, shouldBeParam);
});

Then('Specialist Card ID={string} should {string} education {string}', async function (id, shouldBeParam, titleText) {
  const specialistParameter = await page('doctors').specialistCard(id).education.getText();
  return compareText(specialistParameter, titleText, shouldBeParam);
});
