import checkIfFunction from "./checkIfFunction";
import getAwsSecret from "./getAwsSecret";
import getConnectorSecret from "./getConnectorSecret";
import getUnknownSecretObj from "./getUnknownSecret";
import getType from "./scripts/getTypeOfSecretsObject";

import secretConfigObjectsArray from "./types/secretConfigObject";
import secretsObject from "./types/secretConfigTypesEnum.type"


/**
 * @param {*} secretsObjects an array containing secret objects from type connector/preknown/unknown
 * @returns array containing secrets and their value from the wanted destenation
 */

async function genericSecrets<Type>(secretsObjects: secretConfigObjectsArray): Promise<Type | undefined> {

  // if secretsObjects is not an array, throw error
  if (!Array.isArray(secretsObjects)) {
    console.error(`secretsObjects must be an array. you passed ${typeof secretsObjects}`);
    return;
  }

  getType(secretsObjects);

  const secretsArr: any | secretsObject = {};

  // for every secret object in secretsObjects retrives the secret from the wanted source(aws or env file)  and according to the secret type(connector/unknown/preknown)
  for (let i = 0; i < secretsObjects.length; i++) {
    if (process.env.USE_AWS === 'true' && !!process.env[`${secretsObjects[i].type}_SECRET_NAME`]) {
      secretsArr[secretsObjects[i].name] = await getAwsSecret(process.env[`${secretsObjects[i].type}_SECRET_NAME`]!)
    } else {
      let secretConfig = secretsObjects[i];

      switch (secretConfig.objType) {
        case "connector":
          //@ts-ignore
          secretConfig = {
            ...secretConfig,
            ...checkIfFunction((({ port, engine, dbname, username, host, password }) => ({ port, engine, dbname, username, host, password }))(secretConfig))
          }
          secretsArr[secretConfig.name] = await getConnectorSecret(secretConfig)
          break;
        case "preknown":
          const modifiedValue = checkIfFunction(secretConfig.value);
          secretsArr[secretConfig.name] = modifiedValue
          break;
        case "unknown":
          secretsArr[secretConfig.name] = await getUnknownSecretObj(secretConfig)
          break;

        default:
          break;
      }

    }
  }
  return secretsArr;
}


genericSecrets([
  {
    "objType": "connector",
    "name": "hospikolMysql",
    "type": "DB",
    "port": 3306,
    "engine": "mysql"
  },
  {
    "objType": "connector",
    "name": "hospikolMongo",
    "type": "MDB",
    "port": 27017,
    "engine": "mongodb"
  },
  // {
  //   "objType": "connector",
  //   "name": "hospikolMssqldw",
  //   "type": "DWSQL",
  //   "engine": "mssql"
  // },
  // {
  //   "objType": "connector",
  //   "name": "hospikolMysqldw",
  //   "type": "DB",
  //   "engine": "mysql",
  //   "port": 3306,
  //   "dbname": {
  //     "exec": true,
  //     "filePath": "/home/dina/devops/projects/hospikol/server/src/functionsForSecrets.js",
  //     "funcName": "getDBName"
  //   }
  // },
  // {
  //   "objType": "unknown",
  //   "name": "sharedSecrets",
  //   "envNameArr": [
  //     "ENCRYPTION_KEY",
  //     "ENCRYPTION_IV",
  //     "SALT",
  //     "FIREBASE_API_KEY",
  //     "FIREBASE_MESSANGING_SENDER_ID",
  //     "FIREBASE_APP_ID",
  //     "FIREBASE_VAPID_KEY"
  //   ],
  //   "type": "SINGELTON"
  // },
  // {
  //   "objType": "preknown",
  //   "name": "pass019",
  //   "value": {
  //     "pass019": {
  //       "exec": true,
  //       "filePath": "./functionsForSecrets.js",
  //       "funcName": "getPass019"
  //     }
  //   },
  //   "type": "PASS019"
  // },
  // {
  //   "objType": "preknown",
  //   "name": "hospitalAdmin",
  //   "value": {
  //     "username": "",
  //     "password": ""
  //   },
  //   "type": "HOSPITAL_ADMIN"
  // }
])

export { genericSecrets };