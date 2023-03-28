import executeFunctionIfExists from "./executeFunctionIfExists";
import getAwsSecret from "./getAwsSecret";
import getConnectorSecret from "./getConnectorSecret";
import getSingletonEnvSecret from "./getSingletonSecret";
import { connectorSecretConfig } from "./types/connectorSecretConfig.type";
import { singletonSecretConfig } from "./types/singletonSecretConfig.type";
import { preknownSecretConfig } from "./types/preknownSecretConfig.type";
import { readFileSync } from "fs";
import { DatabaseType } from "./types/database.type";

/**
 * @param {*} secretsObjects Object containing 2 arrays for connector and preknown secrets and one object for singleton secret
 * @returns array containing secrets and their value from the wanted destenation
 */


export interface getSecretsParams {
  connectors?: connectorSecretConfig[],
  singleton?: singletonSecretConfig,
  preknowns?: preknownSecretConfig[],
  pass019?: boolean
}
async function getSecrets<Type>({ connectors, preknowns, singleton, pass019 }: getSecretsParams): Promise<Type | undefined> {

  const secretsObj: any = {};

  if (process.env.USE_AWS === "true") {
    if (connectors) await handleSecretsFromAws(connectors, secretsObj);
    if (preknowns) await handleSecretsFromAws(preknowns, secretsObj);
    if (singleton) secretsObj[singleton.name] = await getAwsSecret(process.env[`SINGELTON_SECRET_NAME`]!);
    if (pass019) secretsObj["pass019"] = await getAwsSecret("pass019");
  }
  else {
    if (connectors) await handleConnectorSecrets(connectors, secretsObj);
    if (preknowns) await handlePreknownSecrets(preknowns, secretsObj);
    if (singleton) secretsObj[singleton.name] = await getSingletonEnvSecret(singleton);
    if (pass019) secretsObj["pass019"] = await readFileSync(process.env.PASS019!, "utf-8")
  }
  return secretsObj;
}


const handleSecretsFromAws = async (secretsConfArr: connectorSecretConfig[] | preknownSecretConfig[], secretsArr: any) => {

  for (let i = 0; i < secretsConfArr.length; i++) {
    // if (!!process.env[`${secretsConfArr[i].alias}_SECRET_NAME`])
    secretsArr[secretsConfArr[i].name] = await getAwsSecret(process.env[`${secretsConfArr[i].alias}_SECRET_NAME`]!)
  }
}


const handleConnectorSecrets = async (connectors: connectorSecretConfig[], secretsArr: any) => {
  try {
    for (let i = 0; i < connectors.length; i++) {

      let secretConfig = connectors[i]
      secretConfig = {
        ...secretConfig,
        ...executeFunctionIfExists(secretConfig)
      }
      secretsArr[secretConfig.name] = await getConnectorSecret(secretConfig);
    }
  } catch (error) {
    console.error('error in handleConnectorSecrets: ', error);
    throw error;
  }
}



const handlePreknownSecrets = (preknowns: preknownSecretConfig[], secretsArr: any) => {
  for (let i = 0; i < preknowns.length; i++) {
    const modifiedValue = executeFunctionIfExists(preknowns[i].value);
    secretsArr[preknowns[i].name] = modifiedValue
  }
}

export interface connectorSecret {
  port?: number;
  engine?: DatabaseType;
  dbname?: string;
  username?: string;
  host?: string;
  password?: string
}


export default getSecrets;
