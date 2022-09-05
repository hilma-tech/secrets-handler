import checkIfFunction from "./checkIfFunction";
import getAwsSecret from "./getAwsSecret";
import getConnectorSecret from "./getConnectorSecret";
import getUnknownSecretObj from "./getUnknownSecret";
import getType from "./scripts/getTypeOfSecretsObject";

import secretConfigObjectsArray from "./types/secretConfigObject";


/**
 * @param {*} secretsObjects an array containing secret objects from type connector/preknown/unknown
 * @returns array containing secrets and their value from the wanted destenation
 */

async function getSecrets<Type>(secretsObjects: secretConfigObjectsArray): Promise<Type | undefined> {

  // if secretsObjects is not an array, throw error
  if (!Array.isArray(secretsObjects)) {
    console.error(`secretsObjects must be an array. you passed ${typeof secretsObjects}`);
    return;
  }

  getType(secretsObjects);

  const secretsArr: any = {};

  // for every secret object in secretsObjects retrives the secret from the wanted source(aws or env file)  and according to the secret type(connector/unknown/preknown)
  for (let i = 0; i < secretsObjects.length; i++) {
    if (process.env.USE_AWS === 'true' && !!process.env[`${secretsObjects[i].alias}_SECRET_NAME`]) {
      secretsArr[secretsObjects[i].name] = await getAwsSecret(process.env[`${secretsObjects[i].alias}_SECRET_NAME`]!)
    } else {
      let secretConfig = secretsObjects[i];

      switch (secretConfig.objType) {
        case "connector":
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


export { getSecrets };