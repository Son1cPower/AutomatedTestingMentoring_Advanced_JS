const { expect } = require('chai');
const { sendRequest } = require('../helpers/api.helper');

describe('API Test Suite', () => {


  it('Get list of project launches ', async () => {
    const response = await sendRequest('project_js/launch');

    expect(response.status).to.equal(200);
    //expect(response.data[0].id).to.equal(1);
    console.log(response.data)
    expect(response.data.page.totalElements).to.equal(5);
  });







});
