import checkIfFunction from "./checkIfFunction";
import getAwsSecret from "./getAwsSecret";
import getConnectorSecret from "./getConnectorSecret";
import getUnknownSecretObj from "./getUnknownSecret";
import getType from "./scripts/getTypeOfSecretsArray";

import { DatabaseType } from "./types/database.type"
import connectorSecretConfig from "./types/connectorSecretConfig.type";
import connectorSecret from './types/connectorSecret.type';
import secretConfigTypes from "./types/secretConfigTypesEnum.type"
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
            const secretConfig = secretsObjects[i];

            switch (secretConfig.objType) {
                case secretConfigTypes.connectorSecretConfig:
                    secretsArr[secretConfig.name] = await getConnectorSecret(secretConfig)
                    break;
                case secretConfigTypes.preKnownSecretConfig:
                    //@ts-ignore
                    const modifiedValue = checkIfFunction(secretConfig.value);
                    secretsArr[secretConfig.name] = modifiedValue
                    break;
                case secretConfigTypes.unknownSecretConfig:
                    secretsArr[secretConfig.name] = await getUnknownSecretObj(secretConfig)
                    break;

                default:
                    break;
            }

        }
    }
    return secretsArr;
}



// const secretsObjs: secretConfigObjectsArray = [
//     {
//         objType: secretConfigTypes.connectorSecretConfig,
//         name: 'secret1',
//         type: 'DB'
//     }, {
//         objType: secretConfigTypes.connectorSecretConfig,
//         name: 'secret2',
//         type: 'DB_DW'
//     }, {
//         objType: secretConfigTypes.unknownSecretConfig,
//         name: 'secret3',
//         type: 'UN',
//         envNameArr: ['ENCRYPTION_KYE', 'NCRYPTION_KEY', 'ENCRYPTION_KEY']
//     }
// ]

// const a = async () => {
//     const secrets: typeF | undefined = await genericSecrets<typeF>(secretsObjs)
//     getType(secretsObjs, "fType.type.ts")
//     console.log('secrets: ', secrets);
// }
// a()


export { genericSecrets, secretConfigObjectsArray, secretConfigTypes, DatabaseType, connectorSecret, connectorSecretConfig };