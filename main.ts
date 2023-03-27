import checkIfFunction from "./checkIfFunction";
import getAwsSecret from "./getAwsSecret";
import getConnectorSecret from "./getConnectorSecret";
import getUnknownSecretObj from "./getUnknownSecret";
import connectorSecretConfig from "./types/connectorSecretConfig.type";
import unknownSecretConfig from "./types/unknownSecretConfig.type";
import preknownSecretConfig from "./types/preknownSecretConfig.type";

/**
 * @param {*} secretsObjects an array containing secret objects from type connector/preknown/unknown
 * @returns array containing secrets and their value from the wanted destenation
 */


interface getSecretsParams {
  connectors: connectorSecretConfig[],
  unknowns: unknownSecretConfig[],
  preknowns: preknownSecretConfig[]
}
async function getSecrets<Type>({ connectors, preknowns, unknowns }: getSecretsParams): Promise<Type | undefined> {

  // if secretsObjects is not an array, throw error
  // if (!Array.isArray(connectors) && !Array.isArray(preknowns) && !Array.isArray(unknowns)) {
  //   console.error(`secretsObjects must be an array`);
  //   return;
  // }


  const secretsArr: any = {};

  if (process.env.USE_AWS === "true") {
    handleSecretsFromAws(connectors, secretsArr);
    handleSecretsFromAws(unknowns, secretsArr);
    handleSecretsFromAws(preknowns, secretsArr);
  }
  else {
    handleConnectorSecret(connectors, secretsArr);
    handleUnknownSecret(unknowns, secretsArr);
    handlePreknownSecret(preknowns, secretsArr)
  }
  return secretsArr;
}


const handleSecretsFromAws = async (secretsConfArr: connectorSecretConfig[] | unknownSecretConfig[] | preknownSecretConfig[], secretsArr: any) => {
  if (!secretsConfArr.length) return;

  for (let i = 0; i < secretsConfArr.length; i++) {
    if (!process.env[`${secretsConfArr[i].alias}_SECRET_NAME`])
      secretsArr[secretsConfArr[i].name] = await getAwsSecret(process.env[`${secretsConfArr[i].alias}_SECRET_NAME`]!)
  }
}


const handleConnectorSecret = async (connectors: connectorSecretConfig[], secretsArr: any) => {
  // secretConfig = {
  //   ...secretConfig,
  //   // ...checkIfFunction((({ port, engine, dbname, username, host, password }) => ({ port, engine, dbname, username, host, password }))(secretConfig))
  // }
  for (let i = 0; i < connectors.length; i++) {
    secretsArr[connectors[i].name] = await getConnectorSecret(connectors[i]);
  }
}

const handleUnknownSecret = async (unknowns: unknownSecretConfig[], secretsArr: any) => {
  for (let i = 0; i < unknowns.length; i++) {
    secretsArr[unknowns[i].name] = await getUnknownSecretObj(unknowns[i]);
  }
}

const handlePreknownSecret = (preknowns: preknownSecretConfig[], secretsArr: any) => {
  for (let i = 0; i < preknowns.length; i++) {
    const modifiedValue = checkIfFunction(preknowns[i].value);
    secretsArr[preknowns[i].name] = modifiedValue
  }
}


export default getSecrets;