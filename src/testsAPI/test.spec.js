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
  const responceSchemaForGetLaunches = {
    ...responseSchema,
    properties: {
      ...responseSchema.properties,
      data: {
        "type": "object",
        "properties": {
          "content": {
            "type": "array",
            "items": {
              "type": "object"
            }
          },
          "page": {
            "type": "object",
            "properties": {
              "number": {
                "type": "number"
              },
              "size": {
                "type": "number"
              },
              "totalElements": {
                "type": "number"
              },
              "totalPages": {
                "type": "number"
              }
            },
            "required": ["number", "size", "totalElements", "totalPages"]
          }
        },
        "required": ["content", "page"]
      }
    }
  };

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
    expect(await response).to.be.jsonSchema(responseSchema);
    response = await sendRequest('project/names');
    responseSchema.properties.data = {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
    expect(await response.status).to.equal(200);
    expect(await response.data.includes(demoProjectName)).to.equal(false);
    expect(await response).to.be.jsonSchema(responseSchema);
  });

  it('[GET POSITIVE] Get list of project launches', async () => {
    const response = await sendRequest(`${demoProjectName}/launch`);
    expect(response.status).to.equal(200);
    expect(response.data.page.totalElements).to.equal(5);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).to.deep.equal(arrOfDemoLaunchesID);
    expect(await response).to.be.jsonSchema(responceSchemaForGetLaunches);
  });

  it('[GET NEGATIVE] Get list of project launches for incorect project name', async () => {
    const response = await sendRequest('fake_project_name/launch');
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "errorCode": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": ["errorCode", "message"]
    }
    expect(response.status).to.equal(403);
    expect(response.data.errorCode).to.equal(4003);
    expect(response.data.message).to.equal('You do not have enough permissions. Please check the list of your available projects.');
    expect(await response).to.be.jsonSchema(responseSchema);
  });

  it('[POST NEGATIVE_1] Merge set of incorect launches in common one', async () => {
    const body = {
      "launches": [arrOfDemoLaunchesID[0], arrOfDemoLaunchesID[1]],
      "mergeType": "standart",
      "name": "New Merge"
    }
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "errorCode": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": ["errorCode", "message"]
    }
    response = await sendRequest(`${demoProjectName}/launch/merge `, 'post', body);
    expect(response.status).to.equal(406);
    expect(response.data.errorCode).to.equal(40033);
    expect(response.data.message).to.equal("Merge Strategy type null is unsupported");
    expect(await response).to.be.jsonSchema(responseSchema);
  });

  it('[POST NEGATIVE_2] Merge set of incorect launches in common one', async () => {
    const body = {
      "launches": [(Math.max(...arrOfDemoLaunchesID) + 1), (Math.max(...arrOfDemoLaunchesID) + 2)],
      "mergeType": "DEEP",
      "name": "New Merge"
    }
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "errorCode": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": ["errorCode", "message"]
    }
    response = await sendRequest(`${demoProjectName}/launch/merge `, 'post', body);
    expect(response.status).to.equal(400);
    expect(response.data.errorCode).to.equal(40016);
    expect(response.data.message).to.equal("Error in handled Request. Please, check specified parameters: 'Not all launches with provided ids were found'");
    expect(await response).to.be.jsonSchema(responseSchema);
    response = await sendRequest(`${demoProjectName}/launch`);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).not.to.deep.contain((Math.max(...arrOfDemoLaunchesID) + 1), (Math.max(...arrOfDemoLaunchesID) + 2));
    expect(await response).to.be.jsonSchema(responceSchemaForGetLaunches);
  });

  it('[POST POSITIVE] Deep Merge set of specified launches in common one', async function () {
    const body = {
      "launches": [arrOfDemoLaunchesID[2], arrOfDemoLaunchesID[3]],
      "mergeType": "DEEP",
      "name": "New Merge"
    }
    response = await sendRequest(`${demoProjectName}/launch/merge `, 'post', body);
    expect(response.status).to.equal(200);
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "owner": {
          "type": "string"
        },
        "share": {
          "type": "boolean"
        },
        "description": {
          "type": "string"
        },
        "id": {
          "type": "integer"
        },
        "uuid": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "number": {
          "type": "integer"
        },
        "startTime": {
          "type": "integer"
        },
        "endTime": {
          "type": "integer"
        },
        "lastModified": {
          "type": "integer"
        },
        "status": {
          "type": "string"
        },
        "statistics": {
          "type": "object",
          "properties": {
            "executions": {
              "type": "object"
            },
            "defects": {
              "type": "object"
            }
          }
        },
        "attributes": {
          "type": "array",
          "items": {
            "type": "object"
          }
        },
        "mode": {
          "type": "string"
        },
        "analysing": {
          "type": "array"
        },
        "approximateDuration": {
          "type": "integer"
        },
        "hasRetries": {
          "type": "boolean"
        },
        "rerun": {
          "type": "boolean"
        }
      },
      "required": [
        "owner",
        "share",
        "description",
        "id",
        "uuid",
        "name",
        "number",
        "startTime",
        "endTime",
        "lastModified",
        "status",
        "statistics",
        "attributes",
        "mode",
        "analysing",
        "approximateDuration",
        "hasRetries",
        "rerun"
      ]
    }
    expect(await response).to.be.jsonSchema(responseSchema);
    response = await sendRequest(`${demoProjectName}/launch`);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(launchIds).not.to.deep.contain(arrOfDemoLaunchesID[2], arrOfDemoLaunchesID[3]);
    const launchNames = response.data.content.map((launch) => launch.name);
    expect(launchNames).to.deep.contain("New Merge");
    expect(await response).to.be.jsonSchema(responceSchemaForGetLaunches);
  });

  it('[PUT POSITIVE] Bulk added attributes', async () => {
    const body = {
      "attributes": [...commonAttributes],
      "ids": [arrOfDemoLaunchesID[4]]
    };
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": ["message"]
    }
    expect(response.status).to.equal(200);
    expect(await response).to.be.jsonSchema(responseSchema);
    response = await sendRequest(`${demoProjectName}/launch`);
    await expect(response.data.content.find(elem => elem.id === arrOfDemoLaunchesID[4]).attributes.some(elem => elem.key === `demo` && elem.value === `MacOS`)).to.be.true;
    expect(await response).to.be.jsonSchema(responceSchemaForGetLaunches);
  });

  it('[PUT NEGATIVE_1] Bulk added attributes', async () => {
    const body = {
      "attributes": [...commonAttributes]
    };
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "errorCode": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": ["errorCode", "message"]
    }
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
    expect(await response).to.be.jsonSchema(responseSchema);
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
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "errorCode": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": ["errorCode", "message"]
    }
    response = await sendRequest(`${demoProjectName}/launch/info `, 'put', body);
    expect(await response).to.be.jsonSchema(responseSchema);
    expect(response.status).to.equal(500);
    expect(response.data.errorCode).to.equal(5000);
    expect(response.data.message).to.equal("Unclassified error [null]");
  });

  it('[DELETE NEGATIVE] Delete specified launches by id', async () => {
    const body = {
      "ids": [(Math.max(...arrOfDemoLaunchesID) + 10)]
    }
    response = await sendRequest(`${demoProjectName}/launch `, 'delete', body);
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "successfullyDeleted": {
          "type": "array",
          "items": {}
        },
        "notFound": {
          "type": "array",
          "items": {
            "type": "integer"
          }
        },
        "errors": {
          "type": "array",
          "items": {}
        }
      },
      "required": [
        "successfullyDeleted",
        "notFound",
        "errors"
      ]
    }
    expect(response.status).to.equal(200);
    expect(response.data.successfullyDeleted.length).to.equal(0);
    expect(response.data.errors.length).to.equal(0);
    expect(response.data.notFound).to.deep.equal(body.ids);
    expect(await response).to.be.jsonSchema(responseSchema);
  });

  it('[DELETE POSITIVE] Delete specified launches by id', async () => {
    const body = {
      "ids": [arrOfDemoLaunchesID[1]]
    }
    responseSchema.properties.data = {
      "type": "object",
      "properties": {
        "successfullyDeleted": {
          "type": "array",
          "items": {}
        },
        "notFound": {
          "type": "array",
          "items": {
            "type": "integer"
          }
        },
        "errors": {
          "type": "array",
          "items": {}
        }
      },
      "required": [
        "successfullyDeleted",
        "notFound",
        "errors"
      ]
    }
    response = await sendRequest(`${demoProjectName}/launch `, 'delete', body);
    expect(response.status).to.equal(200);
    expect(response.data.successfullyDeleted).to.deep.equal(body.ids);
    expect(response.data.errors.length).to.equal(0);
    expect(response.data.notFound.length).to.equal(0);
    expect(await response).to.be.jsonSchema(responseSchema);
    response = await sendRequest(`${demoProjectName}/launch`);
    const launchIds = response.data.content.map((launch) => launch.id);
    expect(body.ids.every(value => !launchIds.includes(value))).is.true
    expect(await response).to.be.jsonSchema(responceSchemaForGetLaunches);
  });
});