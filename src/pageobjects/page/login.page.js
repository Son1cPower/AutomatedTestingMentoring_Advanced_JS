import logger from '../../utils/loggers/logger.config';

logger.info("START - login.page.js");

const BaseComponent = require('../components/baseComponent');


class LoginPage extends BaseComponent {

    get inputUsername() {
        const userName = '#username'
        logger.info(`Get element userName with selector ${userName}`)
        return $('#username');
    }

    get inputPassword() {
        const inputPassword = '#password'
        logger.info(`Get element userName with selector ${inputPassword}`)
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }


    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }


    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
