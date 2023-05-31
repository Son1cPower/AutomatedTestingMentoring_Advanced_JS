const axios = require('axios');
//const TEST_URL = require('../../configs/conf').default.url;
const TEST_URL = 'http://localhost:8080/api/v1';
//const authToken = '2dd17ed6-a0f0-4a99-a299-2855be6924d2';
require('dotenv').config().parsed;

const authToken = process.env.APIBEARERTOKEN;
// const conf = require('../../configs/conf')
// const authToken = conf.APIBEARERTOKEN


const sendRequest = async (url, method = 'get', data = null) => {
  try {
    const response = await axios({
      method,
      url: `${TEST_URL}/${url}`,
      headers: { Authorization: `Bearer ${authToken}` },
      data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
    };
  }
};

module.exports = {
  sendRequest,
};


