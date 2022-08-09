const checkIfFunction = require("./checkIfFunction");
const getAwsSecret = require("./getAwsSecret");
const getConnectorSecret = require("./getConnectorSecret");
const getUnknownSecretObj = require("./getUnknownSecret");
const objectTypeEnum = require("./objectTypeEnum")

async function genericSecrets(secretsObjects) {

    if (!Array.isArray(secretsObjects)) {
        console.error( `secretsObjects must be an array. you passed ${typeof secretsObjects}`);
        return;
    }

    const secretsArr = {};

    for (let i = 0; i < secretsObjects.length; i++) {
        if (process.env.USE_AWS === 'true') {
            secretsArr[secretsObjects[i].name] = await getAwsSecret(`${secretsObjects[i].type}_SECRET_NAME`)
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