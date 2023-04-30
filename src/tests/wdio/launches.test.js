const LoginPage = require('../../pageobjects/pages/login.page')
const SideBar = require('../../pageobjects/components/sideBar')
const LaunchesPage = require('../../pageobjects/pages/launches.page')
import logger from '../../utils/loggers/logger.config'

describe('Open and check all Launches', () => {

    beforeEach('Login with credentials', async () => {
        logger.info(`Start - login.page.js`)
        await LoginPage.open()
        await LoginPage.login('superadmin', 'erebus')
    });

    it('Select project by title', async () => {
        logger.info(`Start - sideBar.js`)
        await SideBar.selectProjectByTitle('stanislav_nehrii_personal')
        logger.info(`Open launches.page.js`)
        await SideBar.launches.click()

        //await browser.pause(2000);

        const expectedTotalLaunches = 5
        logger.info(`Start - launches.page.js`)
        await expect(await LaunchesPage.getTotalCountOfSelectors(await LaunchesPage.getAllLaunches)).toEqual(expectedTotalLaunches)

        const expectedLaunchesIDs = ['10', '6', '7', '8', '9',];
        await expect(await LaunchesPage.getArrayOfLaunchesIDs(await LaunchesPage.getAllLaunches)).toEqual(expectedLaunchesIDs)









        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

    })


    // it('total launches', async () => {
    //     await SideBar.selectProjectByTitle('project_js')
    //     await SideBar.launches.click()


    //     await browser.pause(5000);
    // })
})

