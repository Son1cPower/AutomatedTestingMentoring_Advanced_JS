const LaunchesPage = require('./launches.page');
const LoginPage = require('./login.page');

/**
 * @param name {'login' | 'launches'}
 * @returns {LoginPage|LaunchesPage}
 */
function page(name) {
    const items = {
        login: new LoginPage(),
        launches: new LaunchesPage(),
    };
    return items[name.toLowerCase()];
}

module.exports = {
    page,
    LoginPage,
    LaunchesPage,
};
