require('dotenv').config().parsed;
const environment = process.env.ENVIRONMENT;
const urls = {
  local: 'http://localhost:8080',
  epam: 'https://reportportal.epam.com/',
};
const environmentUrl = urls[environment];
if (!environmentUrl) {
  console.log("Can't run tests, ENVIRONMENT can be only local OR epam");
}
const data = {
  URL: environmentUrl,
  APIURL: `${environmentUrl}/api/v1`,
  ENVIRONMENT: environment,
  APIBEARERTOKEN: process.env.APIBEARERTOKEN,
  LOGGER: process.env.LOGGER,
  PROJECT: process.env.PROJECT,
  THREADS: process.env.THREADS,
  LOGIN: process.env.LOGIN,
  PASSWORD: process.env.PASSWORD,
};
module.exports = data;

