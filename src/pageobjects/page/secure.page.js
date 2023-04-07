const BaseComponent = require('../components/baseComponent');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends BaseComponent {
    /**
     * define selectors using getter methods
     */
    get flashAlert() {
        return $('#flash');
    }
}

module.exports = new SecurePage();
