const { ErrorWrapper } = require('./ErrorWrapper');

class Waiters {
    // static async waitElementIsDisplayed(page, elementLocator, timeout = config.timeouts.default) {
    static async waitElementIsDisplayed(page, elementLocator, timeout = 5000) {
        try {
            await page.waitForSelector(elementLocator, { visible: true, timeout });
        } catch (e) {
            throw ErrorWrapper.elementError(e, elementLocator);
        }
    }

    static async waitElementIsExist(page, elementLocator, timeout = 5000) {
        try {
            await page.waitForSelector(elementLocator, { timeout });
        } catch (e) {
            throw ErrorWrapper.elementError(e, elementLocator);
        }
    }


}

module.exports = Waiters;