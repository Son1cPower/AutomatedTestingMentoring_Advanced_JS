const { Then, Given } = require('@wdio/cucumber-framework');
const { page } = require('../pageobjects');
const compareText = require('./utils/compare-text');
const conf = require('../../configs/conf')


Given('I LogIn to Report Portal and selected my project', async function () {
  return expect(await browser.getUrl()).toContain(conf.default.PROJECT);
});

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

Then('name for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedLaunchesName) {
  const launchesName = await page('launches').launchesByID(launchesId).getLaunchesName.getText();
  return compareText(launchesName, expectedLaunchesName, shouldBeParam);
});

Then('total tests for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedTotal) {
  if (expectedTotal) {
    const launchesTotal = await page('launches').launchesByID(launchesId).getTotalTests.getText();
    return compareText(launchesTotal, expectedTotal, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getTotalTests).not.toBeDisplayed()
});

Then('passed tests for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedPassed) {
  if (expectedPassed) {
    const launchesSkipped = await page('launches').launchesByID(launchesId).getPassedTests.getText();
    return compareText(launchesSkipped, expectedPassed, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getPassedTests).not.toBeDisplayed()
});

Then('failed tests for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedFailed) {
  if (expectedFailed) {
    const launchesFailed = await page('launches').launchesByID(launchesId).getFailedTests.getText();
    return compareText(launchesFailed, expectedFailed, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getFailedTests).not.toBeDisplayed()
});

Then('skipped tests for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedSkipped) {
  if (expectedSkipped) {
    const launchesSkipped = await page('launches').launchesByID(launchesId).getSkippedTests.getText();
    return compareText(launchesSkipped, expectedSkipped, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getSkippedTests).not.toBeDisplayed()
});

Then('product bug for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedProductBug) {
  if (expectedProductBug) {
    const productBug = await page('launches').launchesByID(launchesId).getCountOfProductBug.getText();
    return compareText(productBug, expectedProductBug, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getCountOfProductBug).not.toBeDisplayed()
});

Then('automation bug for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedAutomationBug) {
  if (expectedAutomationBug) {
    const automationBug = await page('launches').launchesByID(launchesId).getCountOfAutomationBug.getText();
    return compareText(automationBug, expectedAutomationBug, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getCountOfAutomationBug).not.toBeDisplayed()
});

Then('system issue for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedSystemIssue) {
  if (expectedSystemIssue) {
    const systemIssue = await page('launches').launchesByID(launchesId).getCountOfSystemIssue.getText();
    return compareText(systemIssue, expectedSystemIssue, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getCountOfSystemIssue).not.toBeDisplayed()
});

Then('to investigate issue for Launche ID:{string} {string} {string}', async function (launchesId, shouldBeParam, expectedToInvestigateIssue) {
  if (expectedToInvestigateIssue) {
    const toInvestigateIssue = await page('launches').launchesByID(launchesId).getCountOfToInvestigate.getText();
    return compareText(toInvestigateIssue, expectedToInvestigateIssue, shouldBeParam);
  } else
    await expect(await page('launches').launchesByID(launchesId).getCountOfToInvestigate).not.toBeDisplayed()
});

Then('name for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedSiuteName) {
  const siutesName = await page('launches').suiteByID(siuteID).getSuiteName.getText();
  return compareText(siutesName, expectedSiuteName, shouldBeParam);
});

Then('total tests for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedTotalTests) {
  if (expectedTotalTests) {
    const totalTests = await page('launches').suiteByID(siuteID).getTotalSiutes.getText();
    return compareText(totalTests, expectedTotalTests, shouldBeParam);
  } else
    await expect(await page('launches').suiteByID(siuteID).getTotalSiutes).not.toBeDisplayed()
});

Then('passed tests for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedPassedTests) {
  if (expectedPassedTests) {
    const passedTests = await page('launches').suiteByID(siuteID).getPassedSiutes.getText();
    return compareText(passedTests, expectedPassedTests, shouldBeParam);
  } else
    await expect(await page('launches').suiteByID(siuteID).getPassedSiutes).not.toBeDisplayed()
});

Then('failed tests for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedFailedTests) {
  if (expectedFailedTests) {
    const failedTests = await page('launches').suiteByID(siuteID).getFailedSiutes.getText();
    return compareText(failedTests, expectedFailedTests, shouldBeParam);
  } else
    await expect(await page('launches').suiteByID(siuteID).getFailedSiutes).not.toBeDisplayed()
});

Then('product bug for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedProductBug) {
  if (expectedProductBug) {
    const productBug = await page('launches').suiteByID(siuteID).getCountOfSiutesProductBug.getText();
    return compareText(productBug, expectedProductBug, shouldBeParam);
  } else
    await expect(await page('launches').suiteByID(siuteID).getCountOfSiutesProductBug).not.toBeDisplayed()
});

Then('automation bug for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedAutomationBug) {
  if (expectedAutomationBug) {
    const automationBug = await page('launches').suiteByID(siuteID).getCountOfSiutesAutoBug.getText();
    return compareText(automationBug, expectedAutomationBug, shouldBeParam);
  } else
    await expect(await page('launches').suiteByID(siuteID).getCountOfSiutesAutoBug).not.toBeDisplayed()
});

Then('to investigate issue for Siute ID:{string} {string} {string}', async function (siuteID, shouldBeParam, expectedToInvestigateIssue) {
  if (expectedToInvestigateIssue) {
    const investigateIssue = await page('launches').suiteByID(siuteID).getCountOfSiutesToInvestigate.getText();
    return compareText(investigateIssue, expectedToInvestigateIssue, shouldBeParam);
  } else
    await expect(await page('launches').suiteByID(siuteID).getCountOfSiutesToInvestigate).not.toBeDisplayed()
});
