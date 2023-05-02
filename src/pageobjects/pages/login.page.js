import logger from '../../utils/loggers/logger.config';
const BaseComponent = require('../components/baseComponent');

class LoginPage extends BaseComponent {
  get inputUsername() {
    const userName = "input[placeholder='Login']";
    logger.info(`Get element userName with selector ${userName}`);
    return $(userName);
  }

  get inputPassword() {
    const inputPassword = "input[placeholder='Password']";
    logger.info(`Get element inputPassword with selector ${inputPassword}`);
    return $(inputPassword);
  }

  get btnLogin() {
    const btnLogin = "button[type='submit']";
    logger.info(`Get element btnLogin with selector ${btnLogin}`);
    return $(btnLogin);
  }

  async login(username, password) {
    await this.open();
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  get btnLoginWithEPAM() {
    const btnLoginWithEPAM = "button[type='button']";
    logger.info(`Get element btnLoginWithEPAM with selector ${btnLoginWithEPAM}`);
    return $(btnLoginWithEPAM);
  }

  async loginWithEPAM() {
    await this.btnLoginWithEPAM.click();
  }

  open() {
    return super.open('http://localhost:8080/ui/#login');
  }
}

module.exports = new LoginPage();
