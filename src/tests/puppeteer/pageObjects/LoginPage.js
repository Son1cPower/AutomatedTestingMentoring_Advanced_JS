const puppeteer = require('puppeteer');




class LoginPage {

    async navigate(url) {

        await page.goto(url);

    }




    async getTitle(page) {

        return page.title();

    }




    async fillUsername(page, username) {

        await page.type("input[placeholder='Login']", username);

    }




    async fillPassword(page, password) {

        await page.type("input[placeholder='Password']", password);

    }




    async clickSubmitButton(page) {

        await page.click("[type='submit']");

    }

}




module.exports = LoginPage;