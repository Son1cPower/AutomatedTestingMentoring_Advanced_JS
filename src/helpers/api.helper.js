const axios = require('axios');
const conf = require('../../configs/conf')

const sendRequest = async (url, method = 'get', data = null) => {
  try {
    const response = await axios({
      method,
      url: `${conf.APIURL}/${url}`,
      headers: { Authorization: `Bearer ${conf.APIBEARERTOKEN}` },
      data,
    });
    return {
      status: response.status,
      data: response.data,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
      statusText: error.response.statusText
    };
  }
};

module.exports = {
  sendRequest,
};


