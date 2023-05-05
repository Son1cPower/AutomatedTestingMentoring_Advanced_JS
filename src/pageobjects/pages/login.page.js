import logger from '../../utils/loggers/logger.config';
const BaseComponent = require('../components/baseComponent');
const conf = require('../../../configs/conf')

class LoginPage extends BaseComponent {
  constructor() {
    const loginBlock = '.pageBlockContainer__page-block-container--2K6rq';
    logger.info(`Get element loginBlock with selector ${loginBlock}`);
    super(loginBlock);
  }


  get inputUsername() {
    const userName = "input[placeholder='Login']";
    logger.info(`Get element userName with selector ${userName}`);
    return this.rootEl.$(userName);
  }

  get inputPassword() {
    const inputPassword = "input[placeholder='Password']";
    logger.info(`Get element inputPassword with selector ${inputPassword}`);
    return this.rootEl.$(inputPassword);
  }

  get btnLogin() {
    const btnLogin = "button[type='submit']";
    logger.info(`Get element btnLogin with selector ${btnLogin}`);
    return this.rootEl.$(btnLogin);
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
    return this.rootEl.$(btnLoginWithEPAM);
  }

  async loginWithEPAM() {
    await this.btnLoginWithEPAM.click();
  }

  open() {
    let url = conf.default.url;
    return super.open(url);
  }
}

module.exports = LoginPage;
