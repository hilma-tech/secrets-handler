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

  const secretsArr: any = {};

  if (process.env.USE_AWS === "true") {
    handleSecretsFromAws(connectors, secretsArr);
    handleSecretsFromAws(unknowns, secretsArr);
    handleSecretsFromAws(preknowns, secretsArr);
  }
  else {
    handleConnectorSecrets(connectors, secretsArr);
    handleUnknownSecrets(unknowns, secretsArr);
    handlePreknownSecrets(preknowns, secretsArr)
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

const handleConnectorSecrets = async (connectors: connectorSecretConfig[], secretsArr: any) => {
  for (let i = 0; i < connectors.length; i++) {

    let secretConfig = connectors[i]
    secretConfig = {
      ...secretConfig,
      ...checkIfFunction(secretConfig)
    }
    secretsArr[secretConfig.name] = await getConnectorSecret(secretConfig);
  }
}

const handleUnknownSecrets = async (unknowns: unknownSecretConfig[], secretsArr: any) => {
  for (let i = 0; i < unknowns.length; i++) {
    secretsArr[unknowns[i].name] = await getUnknownSecretObj(unknowns[i]);
  }
}

const handlePreknownSecrets = (preknowns: preknownSecretConfig[], secretsArr: any) => {
  for (let i = 0; i < preknowns.length; i++) {
    const modifiedValue = checkIfFunction(preknowns[i].value);
    secretsArr[preknowns[i].name] = modifiedValue
  }
}


export default getSecrets;