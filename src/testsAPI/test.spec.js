const { expect } = require('chai');
const { sendRequest } = require('../helpers/api.helper');

describe('API Test Suite', () => {


  it('Get list of project launches ', async () => {
    const response = await sendRequest('project_js/launch');

    expect(response.status).to.equal(200);
    expect(response.data.page.totalElements).to.equal(5);
    const launchIds = response.data.content.map((launch) => launch.id);
    const expectedIds = [1, 2, 3, 4, 5];
    expect(launchIds).to.deep.equal(expectedIds);
  });







});
