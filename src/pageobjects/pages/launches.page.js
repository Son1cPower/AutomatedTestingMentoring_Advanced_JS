import logger from '../../utils/loggers/logger.config';



const BaseComponent = require('../components/baseComponent');


class LaunchesPage extends BaseComponent {


    // get showPage() {
    //     logger.info("START - Launches.page.js");
    // }

    // showPage()

    get inputUsername() {
        const userName = "input[placeholder='Login']"
        logger.info(`Get element userName with selector ${userName}`)
        return $(userName);
    }





    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }



}

module.exports = new LaunchesPage();
