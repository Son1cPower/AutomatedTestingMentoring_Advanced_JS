const chai = require('chai');
chai.use(require('chai-json-schema'));
const { sendRequest } = require('../helpers/api.helper');


describe('API Test Suite', () => {
  let demoProjectID;
  let arrOfDemoLaunchesID = [];
  let demoProjectName = 'demoproject'
  const commonAttributes = [
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
    }
  ];
  let responseSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "status": {
        "type": "integer"
      },
      "statusText": {
        "type": "string"
      },
      "data": {}
    },
    "required": ["status", "statusText", "data"]
  }

  before('[PRECONDITIONS] Create demo project and data for tests', async function () {
    const bodyForProject = {
      "entryType": "INTERNAL",
      "projectName": demoProjectName
    }
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        }
      },
      "required": ["id"]
    }
    response = await sendRequest('project', 'post', bodyForProject);
    expect(await response.status).to.equal(201);
    demoProjectID = response.data.id
    expect(await response).to.be.jsonSchema(responseSchema);
    const bodyForData = {}
    response = await sendRequest(`demo/${demoProjectName}`, 'post', bodyForData);
    expect(await response.status).to.equal(200);
    arrOfDemoLaunchesID = response.data.launchIds
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "dashboardId": {
          "type": "integer"
        },
        "launchIds": {
          "type": "array",
          "items": {
            "type": "integer"
          }
        }
      },
      "required": ["dashboardId", "launchIds"]
    }

    expect(await response).to.be.jsonSchema(responseSchema);
  });

  after('[POSTCONDITIONS] Delete demo project and data after tests', async function () {
    const body = {
      "ids": [demoProjectID]
    }
    response = await sendRequest('project', 'delete', body);
    expect(await response.status).to.equal(200);
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "successfullyDeleted": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "notFound": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "errors": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      },
      "required": ["successfullyDeleted", "notFound", "errors"]
    }
    response = await sendRequest('project/names');
    responseSchema.properties.data = {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
    expect(await response.status).to.equal(200);
    expect(await response.data.includes(demoProjectName)).to.equal(false);
  });

  it('[GET POSITIVE] Get list of project launches', async () => {
    const response = await sendRequest(`${demoProjectName}/launch`);
    expect(response.status).to.equal(200);
    expect(response.data.page.totalElements).to.equal(5);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).to.deep.equal(arrOfDemoLaunchesID);
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
      "attributes": [...commonAttributes],
      "ids": [arrOfDemoLaunchesID[4]]
    };
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
    expect(response.status).to.equal(200);
    response = await sendRequest(`${demoProjectName}/launch`);
    await expect(response.data.content.find(elem => elem.id === arrOfDemoLaunchesID[4]).attributes.some(elem => elem.key === `demo` && elem.value === `MacOS`)).to.be.true;
  });

  it('[PUT NEGATIVE_1] Bulk added attributes', async () => {
    const body = {
      "attributes": [...commonAttributes]
    };
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


});
