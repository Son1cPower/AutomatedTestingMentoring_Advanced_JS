
const LoginPage = require('../../pageobjects/pages/login.page')
const SideBar = require('../../pageobjects/components/sideBar')
const SecurePage = require('../../pageobjects/pages/secure.page')

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


        await browser.pause(2000);
    })


    // it('Select project by title', async () => {
    //     await SideBar.selectProjectByTitle('project_js')
    //     await SideBar.launches.click()


    //     await browser.pause(5000);
    // })
})

