const { ErrorWrapper } = require('./ErrorWrapper');
const logger = require('../tests/puppeteer/log4js/logger');

class Waiters {
    static async waitElementIsExist(page, elementLocator, timeout = 5000) {
        try {
            if (elementLocator.startsWith('//')) {
                logger.info(`Element: ['${elementLocator}'] is exist`)
                return await page.waitForXPath(elementLocator, { timeout });
            } else {
                logger.info(`Element: ['${elementLocator}'] is exist`)
                return await page.waitForSelector(elementLocator, { timeout });
            }
        } catch (error) {
            logger.error(`Element: ['${elementLocator}'] is not exist`)
            throw new Error(`Element "${elementLocator}" does not exist within the specified timeout`);
        }
    }

    static async waitForElementDisplayed(page, elementLocator, timeout = 5000) {
        try {
            await page.waitForSelector(elementLocator, { visible: true, timeout });
        } catch (error) {
            throw new Error(`Element "${elementLocator}" was not displayed within the specified timeout`);
        }
    }
    static async waitElementIsNotDisplayed(page, elementLocator, timeout = 5000) {
        try {
            await page.waitForSelector(elementLocator, { hidden: true, timeout });
        } catch (error) {
            throw new Error(`Element "${elementLocator}" is still displayed within the specified timeout`);
        }
    }
    static async waitElementIsClickable(page, elementLocator, timeout = 5000) {
        try {
            await page.waitForSelector(elementLocator, { visible: true, timeout });
            await page.waitForFunction(
                (elementLocator) => {
                    const element = document.querySelector(elementLocator);
                    return element && element.offsetParent !== null && !element.disabled;
                },
                { timeout },
                elementLocator
            );
        } catch (error) {
            throw new Error(`Element "${elementLocator}" was not clickable within the specified timeout`);
        }
    }
}
module.exports = Waiters;