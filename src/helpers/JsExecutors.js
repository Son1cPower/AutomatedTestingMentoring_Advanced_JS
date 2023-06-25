class JsExecutors {

    static async dragAndDrop(page, fromLocator, toLocator) {

        try {

            const dragHandle = await page.$(fromLocator);

            const dropZone = await page.$(toLocator);




            if (!dragHandle) {

                throw new Error('Element not found');

            }




            if (!dropZone) {

                throw new Error('Draggable zone is not found');

            }




            const dragHandleBoundingBox = await dragHandle.boundingBox();

            const dropZoneBoundingBox = await dropZone.boundingBox();




            if (!dragHandleBoundingBox) {

                throw new Error(`Doesn't get position Draggable zone`);

            }




            if (!dropZoneBoundingBox) {

                throw new Error(`Doesn't get position Draggable zone`);

            }




            const dragHandleCenterX = dragHandleBoundingBox.x + dragHandleBoundingBox.width / 2;

            const dragHandleCenterY = dragHandleBoundingBox.y + dragHandleBoundingBox.height / 2;

            const dropZoneCenterX = dropZoneBoundingBox.x + dropZoneBoundingBox.width / 2;

            const dropZoneCenterY = dropZoneBoundingBox.y + dropZoneBoundingBox.height / 2;




            await page.mouse.move(dragHandleCenterX, dragHandleCenterY);

            await page.mouse.down();

            await page.mouse.move(dropZoneCenterX, dropZoneCenterY);

            await page.mouse.up();

        } catch (error) {

            throw new Error(error);

        }

    }





    static async resizeMouse(page, selector, deltaX, deltaY) {

        const isXPath = selector.startsWith('//');

        let el;




        if (isXPath) {

            const xpathResult = await page.$x(selector);

            if (xpathResult.length > 0) {

                el = xpathResult[0];

            }

        } else {

            el = await page.$(selector);

        }




        if (!el) {

            console.error('Element is not found');

            return;

        }




        const box = await el.boundingBox();

        if (!box) {

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

        await page.mouse.move(newPosX, newPosY);




        const newWidth = width + deltaX;

        const newHeight = height + deltaY;

        await page.mouse.move(newPosX + newWidth, newPosY + newHeight);

        await page.mouse.up();

    }






    static async clickElem(page, selector) {

        await page.click(selector);

    }




    static async scrollToElement(page, selector) {

        await page.evaluate(async (selector) => {

            const element = document.querySelector(selector);

            if (element) {

                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                await new Promise(resolve => setTimeout(resolve, 1000));

            }

        }, selector);

    }




}




module.exports = JsExecutors;