const { expect } = require('chai');
const { sendRequest } = require('../helpers/api.helper');
const testData = require('../dto/testData.json');

describe('API Test Suite', () => {
  it('[GET POSITIVE] Get list of project launches', async () => {
    const response = await sendRequest('project_js/launch');
    expect(response.status).to.equal(200);
    expect(response.data.page.totalElements).to.equal(5);
    const launchIds = response.data.content.map((launch) => launch.id);
    const expectedIds = testData.map((data) => Number(data.launchesID))
    expect(launchIds).to.deep.equal(expectedIds);
  });

  it('[GET NEGATIVE] Get list of project launches for incorect project name', async () => {
    const response = await sendRequest('NEWproject_js/launch');
    expect(response.status).to.equal(403);
    expect(response.data.errorCode).to.equal(4003);
    expect(response.data.message).to.equal('You do not have enough permissions. Please check the list of your available projects.');
  });

  it('[POST NEGATIVE_1] Merge set of incorect launches in common one', async () => {
    const body = {
      "launches": [1, 2],
      "mergeType": "standart",
      "name": "New Merge"
    }
    response = await sendRequest('project_js/launch/merge ', 'post', body);
    expect(response.status).to.equal(406);
    expect(response.data.errorCode).to.equal(40033);
    expect(response.data.message).to.equal("Merge Strategy type null is unsupported");
    response = await sendRequest('stanislav_nehrii_personal/launch');
  });

  it('[POST NEGATIVE_2] Merge set of incorect launches in common one', async () => {
    const body = {
      "launches": [1111, 2222],
      "mergeType": "DEEP",
      "name": "New Merge"
    }
    response = await sendRequest('stanislav_nehrii_personal/launch/merge ', 'post', body);
    expect(response.status).to.equal(400);
    expect(response.data.errorCode).to.equal(40016);
    expect(response.data.message).to.equal("Error in handled Request. Please, check specified parameters: 'Not all launches with provided ids were found'");
    response = await sendRequest('stanislav_nehrii_personal/launch');
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).not.to.deep.contain(1111, 2222);
  });


  it.skip('[POST POSITIVE] Deep Merge set of specified launches in common one', async () => {
    const body = {
      "launches": [12, 13],
      "mergeType": "DEEP",
      "name": "New Merge"
    }
    response = await sendRequest('stanislav_nehrii_personal/launch/merge ', 'post', body);
    expect(response.status).to.equal(200);
    response = await sendRequest('project_js/launch');
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).not.to.deep.contain(12, 13);
    const launchNames = response.data.content.map((launch) => launch.name);
    expect(launchNames).to.deep.contain("New Merge");
  });

  it('[PUT POSITIVE] Bulk added attributes', async () => {
    const body = {
      "attributes": [
        {
          "action": "CREATE",
          "from": {
            "key": "os",
            "value": "Android"
          },
          "to": {
            "key": "demo",
            "value": "MacOS"
          }
        }],
      "ids": [6]
    }
    response = await sendRequest('stanislav_nehrii_personal/launch/info ', 'put', body);
    expect(response.status).to.equal(200);
    response = await sendRequest('stanislav_nehrii_personal/launch');
    await expect(response.data.content.find(elem => elem.id === 6).attributes.some(elem => elem.key === `demo` && elem.value === `MacOS`)).to.be.true;
  });

  it('[PUT NEGATIVE_1] Bulk added attributes', async () => {
    const body = {
      "attributes": [
        {
          "action": "CREATE",
          "from": {
            "key": "os",
            "value": "Android"
          },
          "to": {
            "key": "demo",
            "value": "MacOS"
          }
        }],

    }
    response = await sendRequest('stanislav_nehrii_personal/launch/info ', 'put', body);
    expect(response.status).to.equal(400);
    expect(response.data.errorCode).to.equal(4001);
    expect(response.data.message).to.equal("Incorrect Request. [Field 'ids' should not be null.] ");
  });

  it('[PUT NEGATIVE_2] Bulk added attributes', async () => {
    const body = {
      "attributes": [
        {
          "to": {
            "key": "demo",
            "value": "demo"
          }
        }],
      "ids": [1]
    }
    response = await sendRequest('stanislav_nehrii_personal/launch/info ', 'put', body);
    expect(response.status).to.equal(500);
    expect(response.data.errorCode).to.equal(5000);
    expect(response.data.message).to.equal("Unclassified error [null]");
  });

  it('[DELETE NEGATIVE] Delete specified launches by id', async () => {
    const body = {
      "ids": [555]
    }
    response = await sendRequest('stanislav_nehrii_personal/launch ', 'delete', body);
    expect(response.status).to.equal(200);
    expect(response.data.successfullyDeleted.length).to.equal(0);
    expect(response.data.errors.length).to.equal(0);
    expect(response.data.notFound).to.deep.equal(body.ids);
  });

  it('[DELETE POSITIVE] Delete specified launches by id', async () => {
    const body = {
      "ids": [9]
    }
    response = await sendRequest('stanislav_nehrii_personal/launch ', 'delete', body);
    expect(response.status).to.equal(200);
    expect(response.data.successfullyDeleted).to.deep.equal(body.ids);
    expect(response.data.errors.length).to.equal(0);
    expect(response.data.notFound.length).to.equal(0);
    response = await sendRequest('stanislav_nehrii_personal/launch');
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(body.ids.every(value => !launchIds.includes(value))).is.true
  });

});
