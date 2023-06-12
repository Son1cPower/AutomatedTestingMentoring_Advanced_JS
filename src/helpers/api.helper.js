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
    return response;
  } catch (error) {
    return error.response;
  }
};

module.exports = {
  sendRequest,
};


