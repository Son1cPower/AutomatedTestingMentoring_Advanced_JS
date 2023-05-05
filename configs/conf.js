require('dotenv').config().parsed;

let data = undefined;
let environmentUrl;
let urls = {
  local: 'http://localhost:8080',
  epam: 'https://reportportal.epam.com/',
};

if (Object.keys(urls).includes(process.env.ENVIRONMENT)) {
  environmentUrl = urls[process.env.ENVIRONMENT];
} else {
  console.log("Can't run tests, ENVIRONMENT can be only local OR epam");
}

if (process.env.ENVIRONMENT === 'epam') {
  data = {
    url: environmentUrl,
    ENVIRONMENT: process.env.ENVIRONMENT,
    //RUNNER: process.env.RUNNER,
    LOGGER: process.env.LOGGER,
    LOGIN: process.env.LOGIN_EPAM,
    PASSWORD: process.env.PASSWORD_EPAM,
  };
} else if (process.env.ENVIRONMENT === 'local') {
  data = {
    url: environmentUrl,
    ENVIRONMENT: process.env.ENVIRONMENT,
    //RUNNER: process.env.RUNNER,
    LOGGER: process.env.LOGGER,
    LOGIN: process.env.LOGIN_LOCAL,
    PASSWORD: process.env.PASSWORD_LOCAL,
  };
}

export default data;
