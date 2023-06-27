//import logger from '../utils/loggers/logger.config';
const logger = require('../tests/puppeteer/log4js/logger');
const { waitElementIsExist } = require('./Waiters')


class JsExecutors {
    static async scrollToElement(page, selector) {
        try {
            if (selector.startsWith('//')) {
                await waitElementIsExist(page, selector);
                await page.evaluate(async (xpathSelector) => {
                    const xpathResult = document.evaluate(xpathSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                    const element = xpathResult.singleNodeValue;
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }, selector);
            } else {
                await waitElementIsExist(page, selector);
                await page.evaluate(async (cssSelector) => {
                    const element = document.querySelector(cssSelector);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }, selector);
            }
            logger.info(`Scroll to element: ${selector}`);
        } catch (error) {
            throw new Error(error, `Scroll to element: ${selector}`);
        }
    }


    static async dragAndDrop(page, fromLocator, toLocator) {
        try {
            const isXPathFrom = fromLocator.startsWith('//');
            const isXPathTo = toLocator.startsWith('//');
            let dragHandle;
            let dropZone;

            if (isXPathFrom) {
                await waitElementIsExist(page, fromLocator);
                const xpathResult = await page.$x(fromLocator);
                if (xpathResult.length > 0) {
                    dragHandle = xpathResult[0];
                }
            } else {
                await waitElementIsExist(page, fromLocator);
                dragHandle = await page.$(fromLocator);
            }

            if (isXPathTo) {
                await waitElementIsExist(page, toLocator);
                const xpathResult = await page.$x(toLocator);
                if (xpathResult.length > 0) {
                    dropZone = xpathResult[0];
                }
            } else {
                await waitElementIsExist(page, toLocator);
                dropZone = await page.$(toLocator);
            }

            if (!dragHandle) {
                logger.error('Element not found');
                throw new Error('Element not found');
            }

            if (!dropZone) {
                logger.error('Draggable zone is not found');
                throw new Error('Draggable zone is not found');
            }

            const dragHandleBoundingBox = await dragHandle.boundingBox();
            const dropZoneBoundingBox = await dropZone.boundingBox();

            if (!dragHandleBoundingBox) {
                logger.error(`Doesn't get position Draggable zone`);
                throw new Error(`Doesn't get position Draggable zone`);
            }

            if (!dropZoneBoundingBox) {
                logger.error(`Doesn't get position Draggable zone`);
                throw new Error(`Doesn't get position Draggable zone`);
            }

            const dragHandleCenterX = dragHandleBoundingBox.x + dragHandleBoundingBox.width / 2;
            const dragHandleCenterY = dragHandleBoundingBox.y + dragHandleBoundingBox.height / 2;
            const dropZoneCenterX = dropZoneBoundingBox.x + dropZoneBoundingBox.width / 2;
            const dropZoneCenterY = dropZoneBoundingBox.y + dropZoneBoundingBox.height / 2;

            await page.mouse.move(dragHandleCenterX, dragHandleCenterY);
            await page.mouse.down();
            await page.waitForTimeout(500);
            await page.mouse.move(dropZoneCenterX, dropZoneCenterY);
            await page.waitForTimeout(500);
            await page.mouse.up();

            logger.info(`DragAndDrop from: handle-X:[${dragHandleCenterX}], handle-Y:[${dragHandleCenterY}] to: zone-X:[${dropZoneCenterX}], zone-Y:[${dropZoneCenterY}]`);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async resizeMouse(page, selector, deltaX, deltaY) {
        const isXPath = selector.startsWith('//');
        let el;

        if (isXPath) {
            await waitElementIsExist(page, selector);
            const xpathResult = await page.$x(selector);
            if (xpathResult.length > 0) {
                el = xpathResult[0];
            }
        } else {
            await waitElementIsExist(page, selector);
            el = await page.$(selector);
        }

        if (!el) {
            logger.error('Element is not found');
            console.error('Element is not found');
            return;
        }

        const box = await el.boundingBox();
        if (!box) {
            logger.error(`Doesn't got coordinate of position element`);
            console.error(`Doesn't got coordinate of position element`);
            return;
        }

        const { x, y, width, height } = box;
        const startPosX = x + width / 2;
        const startPosY = y + height / 2;

        await page.mouse.move(startPosX, startPosY);
        await page.mouse.down();

        const newPosX = startPosX + deltaX;
        const newPosY = startPosY + deltaY;
        await page.waitForTimeout(500);
        await page.mouse.move(newPosX, newPosY);

        const newWidth = width + deltaX;
        const newHeight = height + deltaY;
        await page.waitForTimeout(500);
        await page.mouse.move(newPosX + newWidth, newPosY + newHeight);
        await page.mouse.up();

        if (isXPath) {
            await waitElementIsExist(page, selector);
            const xpathResult = await page.$x(selector);
            if (xpathResult.length > 0) {
                el = xpathResult[0];
                el.click()
            }
        } else {
            await waitElementIsExist(page, selector);
            el = await page.$(selector);
            el.click()
        }
        logger.info(`Resize item with position from ${newPosX} to ${startPosX}`);
    }

    static async clickElem(page, selector) {
        logger.info(`Click element: ${selector}`)
        await page.click(selector);
    }
}

module.exports = JsExecutors;
