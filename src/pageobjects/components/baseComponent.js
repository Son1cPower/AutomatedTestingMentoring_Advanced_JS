module.exports = class BaseComponent {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  async open(path) {
    return browser.url(`${path}`);
  }
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }
  get rootEl() {
    return $(this.rootSelector);
  }
  async getTotalCountOfSelectors(arrayOfSelectors) {
    return await arrayOfSelectors.length;
  }
};
