const { ErrorWrapper } = require('./ErrorWrapper');
const Waiters = require('./Waiters');

class JsExecutors {
    static async javaScriptClick(elementLocator) {
        try {
            const element = await elementLocator;
            await Waiters.waitElementIsExist(elementLocator);

            await browser.execute('arguments[0].click()', element);

        } catch (e) {
            throw ErrorWrapper.elementError(e, elementLocator);
        }
    }
}

module.exports = JsExecutors;