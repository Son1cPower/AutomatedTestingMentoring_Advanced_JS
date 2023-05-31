const { expect } = require('chai');
const { sendRequest } = require('../helpers/api.helper');

describe('API Test Suite', () => {


  it('should get() all launches for project', async () => {
    const response = await sendRequest('project_js/launch');

    expect(response.status).to.equal(200);
    //expect(response.data[0].id).to.equal(1);
  });







});
