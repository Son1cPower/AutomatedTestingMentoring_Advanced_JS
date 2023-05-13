const { page } = require('../../pageobjects');
const conf = require('../../../configs/conf')
const testDataSiutes = require('../../../configs/testData-Siute_9.json');
import { multiremote } from 'webdriverio'

describe('Open and check all Launches', () => {

  const browserInstances = testDataSiutes.map((data) => {
    return {
      // Определяем параметры браузера и URL для каждого пользователя
      browserName: 'chrome',
      baseUrl: 'https://example.com',
      capabilities: {
        'goog:chromeOptions': {
          args: ['--start-maximized']
        }
      },

      loginFunc: async function () {

        before('Login with credentials', async () => {
          const login = conf.default.LOGIN
          const password = conf.default.PASSWORD
          await page('login').login(login, password);
          const sideBar = page('launches').sideBar
          await sideBar.selectProjectByTitle('stanislav_nehrii_personal');
          await sideBar.launches.click();
          await page('launches').launchesByID('9').openLaunches()
        });


        if (data.name) {
          it(`Ckeck Name for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getSuiteName).toHaveText(data.name);
          });
        }
        if (data.total) {
          it(`Ckeck Total tests for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getTotalSiutes).toHaveText(data.total);
          });
        }
        if (data.passed) {
          it(`Ckeck Passed tests for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getPassedSiutes).toHaveText(data.passed);
          });
        }
        if (data.failed) {
          it(`Ckeck Failed tests for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getFailedSiutes).toHaveText(data.failed);
          });
        }



        // if (data.skipped) {
        //   it(`Ckeck Skipped tests for Siute ID:${data.siuteID}`, async () => {
        //     await expect(await page('launches').suiteByID(data.siuteID).getSkippedSiutes).toHaveText(data.skipped);
        //   });
        // }

        if (data.productBug) {
          it(`Ckeck Product Bug for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesProductBug).toHaveText(data.productBug);
          });
        }

        if (data.automationBug) {
          it(`Ckeck Automation Bug for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesAutoBug).toHaveText(data.automationBug);
          });
        }
        if (data.toInvestigate) {
          it(`Ckeck To Investigate for Siute ID:${data.siuteID}`, async () => {
            await expect(await page('launches').suiteByID(data.siuteID).getCountOfSiutesToInvestigate).toHaveText(data.toInvestigate);
          });
        }
      }
    }
  });






  // multiremote(browserInstances).it('should login', async () => {
  //   await browser.loginFunc();
  //   // Здесь должна быть проверка успешной авторизации
  //   // ...
  // });
});





