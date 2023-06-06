const { expect } = require('chai');
const { sendRequest } = require('../helpers/api.helper');
const testData = require('../dto/testData.json');

require('dotenv').config().parsed;

describe('API Test Suite', () => {
  let demoProjectID;
  let arrOfDemoLaunchesID = [];
  let demoProjectName = 'demoproject'

  before('Create demo project and data for tests', async function () {
    const bodyForProject = {
      "entryType": "INTERNAL",
      "projectName": demoProjectName
    }
    response = await sendRequest('project', 'post', bodyForProject);
    expect(await response.status).to.equal(201);
    demoProjectID = response.data.id
    const bodyForData = {}
    response = await sendRequest(`demo/${demoProjectName}`, 'post', bodyForData);
    expect(await response.status).to.equal(200);
    arrOfDemoLaunchesID = response.data.launchIds
  });

  it('[GET POSITIVE] Get list of project launches and compare with DTO file', async () => {
    const response = await sendRequest(`${process.env.PROJECT}/launch`);
    expect(response.status).to.equal(200);
    expect(response.data.page.totalElements).to.equal(5);
    const launchIds = response.data.content.map((launch) => launch.id);
    const expectedIds = testData.map((data) => Number(data.launchesID))
    expect(launchIds).to.deep.equal(expectedIds);
  });

  it('[GET NEGATIVE] Get list of project launches for incorect project name', async () => {
    const response = await sendRequest('fake_project_name/launch');
    expect(response.status).to.equal(403);
    expect(response.data.errorCode).to.equal(4003);
    expect(response.data.message).to.equal('You do not have enough permissions. Please check the list of your available projects.');
  });

  it('[POST NEGATIVE_1] Merge set of incorect launches in common one', async () => {
    const body = {
      "launches": [arrOfDemoLaunchesID[0], arrOfDemoLaunchesID[1]],
      "mergeType": "standart",
      "name": "New Merge"
    }
    response = await sendRequest(`${demoProjectName}/launch/merge `, 'post', body);
    expect(response.status).to.equal(406);
    expect(response.data.errorCode).to.equal(40033);
    expect(response.data.message).to.equal("Merge Strategy type null is unsupported");
  });

  it('[POST NEGATIVE_2] Merge set of incorect launches in common one', async () => {
    const body = {
      "launches": [(Math.max(...arrOfDemoLaunchesID) + 1), (Math.max(...arrOfDemoLaunchesID) + 2)],
      "mergeType": "DEEP",
      "name": "New Merge"
    }
    response = await sendRequest(`${demoProjectName}/launch/merge `, 'post', body);
    expect(response.status).to.equal(400);
    expect(response.data.errorCode).to.equal(40016);
    expect(response.data.message).to.equal("Error in handled Request. Please, check specified parameters: 'Not all launches with provided ids were found'");
    response = await sendRequest(`${demoProjectName}/launch`);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).not.to.deep.contain((Math.max(...arrOfDemoLaunchesID) + 1), (Math.max(...arrOfDemoLaunchesID) + 2));
  });

  it('[POST POSITIVE] Deep Merge set of specified launches in common one', async function () {
    const body = {
      "launches": [arrOfDemoLaunchesID[2], arrOfDemoLaunchesID[3]],
      "mergeType": "DEEP",
      "name": "New Merge"
    }
    response = await sendRequest(`${demoProjectName}/launch/merge `, 'post', body);
    expect(response.status).to.equal(200);
    response = await sendRequest(`${demoProjectName}/launch`);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).not.to.deep.contain(arrOfDemoLaunchesID[2], arrOfDemoLaunchesID[3]);
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
      "ids": [arrOfDemoLaunchesID[4]]
    }
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
    expect(response.status).to.equal(200);
    response = await sendRequest(`${demoProjectName}/launch`);
    await expect(response.data.content.find(elem => elem.id === arrOfDemoLaunchesID[4]).attributes.some(elem => elem.key === `demo` && elem.value === `MacOS`)).to.be.true;
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
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
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
      "ids": [arrOfDemoLaunchesID[0]]
    }
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
    expect(response.status).to.equal(500);
    expect(response.data.errorCode).to.equal(5000);
    expect(response.data.message).to.equal("Unclassified error [null]");
  });

  it('[DELETE NEGATIVE] Delete specified launches by id', async () => {
    const body = {
      "ids": [(Math.max(...arrOfDemoLaunchesID) + 10)]
    }
    response = await sendRequest(`${demoProjectName}/launch `, 'delete', body);
    expect(response.status).to.equal(200);
    expect(response.data.successfullyDeleted.length).to.equal(0);
    expect(response.data.errors.length).to.equal(0);
    expect(response.data.notFound).to.deep.equal(body.ids);
  });

  it('[DELETE POSITIVE] Delete specified launches by id', async () => {
    const body = {
      "ids": [arrOfDemoLaunchesID[1]]
    }
    response = await sendRequest(`${demoProjectName}/launch `, 'delete', body);
    expect(response.status).to.equal(200);
    expect(response.data.successfullyDeleted).to.deep.equal(body.ids);
    expect(response.data.errors.length).to.equal(0);
    expect(response.data.notFound.length).to.equal(0);
    response = await sendRequest(`${demoProjectName}/launch`);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(body.ids.every(value => !launchIds.includes(value))).is.true
  });

  after('Delete demo project and data after tests', async function () {
    this.timeout(120000)
    const body = {
      "ids": [demoProjectID]
    }
    response = await sendRequest('project', 'delete', body);
    expect(await response.status).to.equal(200);
    response = await sendRequest('project/names');
    expect(await response.status).to.equal(200);
    expect(await response.data.includes(demoProjectName)).to.equal(false);
  });
});
