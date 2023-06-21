const { ErrorWrapper } = require("./ErrorWrapper");
const Waiters = require("./Waiters");

class JsExecutors {

    static async dragAndDrop(page, fromLocator, toLocator) {
        try {
            const dragHandleBoundingBox = await fromLocator.boundingBox();
            const dropZoneBoundingBox = await toLocator.boundingBox();
            await page.mouse.move(
                dragHandleBoundingBox.x + dragHandleBoundingBox.width / 2,
                dragHandleBoundingBox.y + dragHandleBoundingBox.height / 2
            );
            await page.mouse.down();
            await page.mouse.move(dropZoneBoundingBox.x + dropZoneBoundingBox.width / 2, dropZoneBoundingBox.y + dropZoneBoundingBox.height / 2);
            await page.mouse.up();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async clickElem(page, selector) {
        await page.evaluate(`document.querySelector('${selector}').click()`);
    };

    static async resizeElement(elementSelector, newWidth, newHeight) {
        const element = document.querySelector(elementSelector);
        if (!element) {
            throw new Error(`Element not found for selector: ${elementSelector}`);
        }
        const { width: currentWidth, height: currentHeight } = element.getBoundingClientRect();
        const widthRatio = newWidth / currentWidth;
        const heightRatio = newHeight / currentHeight;
        const scaleX = widthRatio.toFixed(2);
        const scaleY = heightRatio.toFixed(2);
        element.style.transformOrigin = 'top left';
        element.style.transform = `scale(${scaleX}, ${scaleY})`;

    }

    static async scrollToElement(page, selector) {
        await page.evaluate(`async function scrollToElement('${selector}') {
          const element = document.querySelector('${selector}');
          if (element) {
            await element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        };`)
    }

}




module.exports = JsExecutors;