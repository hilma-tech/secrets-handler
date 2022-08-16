const getAwsSecret = require("./getAwsSecret");
const checkIfFunction = require("./checkIfFunction");
const getConnectorSecret = require("./getConnectorSecret");
const getUnknownSecretObj = require("./getUnknownSecret");
const getTypeOfSecrets = require("./getTypeOfSecrets")
const objectTypeEnum = require("./objectTypeEnum");

/**
 * @param {*} secretsObjects an array containing secret objects from type connector/preknown/unknown
 * @returns array containing secrets and their value from the wanted destenation
 */
async function genericSecrets(secretsObjects) {

    // if secretsObjects is not an array, throw error
    if (!Array.isArray(secretsObjects)) {
        console.error(`secretsObjects must be an array. you passed ${typeof secretsObjects}`);
        return;
    }

    getTypeOfSecrets(secretsObjects)

    const secretsArr = {};

    // for every secret object in secretsObjects retrives the secret from the wanted source(aws or env file)  and according to the secret type(connector/unknown/preknown)
    for (let i = 0; i < secretsObjects.length; i++) {
        if (process.env.USE_AWS === 'true') {
            secretsArr[secretsObjects[i].name] = await getAwsSecret(process.env[`${secretsObjects[i].type}_SECRET_NAME`])
        } else {
            const a = secretsObjects[i];

            switch (secretsObjects[i].objType) {
                case objectTypeEnum.connector:
                    secretsArr[a.name] = await getConnectorSecret(a)
                    break;
                case objectTypeEnum.preknownValue:
                    const modifiedValue = checkIfFunction(secretsObjects[i].value);
                    secretsArr[a.name] = modifiedValue
                    break;
                case objectTypeEnum.unknown:
                    secretsArr[a.name] = await getUnknownSecretObj(a)
                    break;

                default:
                    break;
            }

        }
    }
    return secretsArr;
}


module.exports = genericSecrets