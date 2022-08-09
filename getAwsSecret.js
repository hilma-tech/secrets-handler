const AwsSecretsManager = require("./AwsSecretsManager")

const getAwsSecret = async (secretName) => {
    try {
        const secretManager
            = new AwsSecretsManager({
                region: 'eu-west-2'
            })
        const secretValue = await secretManager.getSecValue(secretName)
        return secretValue;
    } catch (error) {
        console.error("error in getAwsSecret: ", error);
        return;
    }
}

module.exports = getAwsSecret;