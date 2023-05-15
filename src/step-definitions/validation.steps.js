const { Then } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const compareText = require('./utils/compare-text');

Then('Page title should {string} {string}', async function (shouldBeParam, titleText) {
  const pageTitle = await browser.getTitle();
  return compareText(pageTitle, titleText, shouldBeParam);
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
