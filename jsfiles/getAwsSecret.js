const AwsSecretsManager = require("./AwsSecretsManager")

/**
 * @param {*} secretName secretId(aws)
 * @returns secret value from aws
 */
const getAwsSecret = async (secretName) => {
    try {
        const secretManager
            = new AwsSecretsManager({
                region: process.env.AWS_REGION
            })
        const secretValue = await secretManager.getSecValue(secretName)
        return secretValue;
    } catch (error) {
        console.error("error in getAwsSecret: ", error);
        return;
    }
}

module.exports = getAwsSecret;