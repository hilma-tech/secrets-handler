const aws = require('aws-sdk')

class AwsSecretsManager {
    awsSecretsManager;
    constructor(SecretsManagerOptions) {
        this.awsSecretsManager = new aws.SecretsManager(SecretsManagerOptions)
    }

    
    // retrive secret from aws by secretId
    async getSecValue(secretId) {
        let value, buffer, decodedBinarySecret;
        try {
            const data = await this.awsSecretsManager.getSecretValue({ SecretId: secretId }).promise();
            if ('SecretString' in data) {
                const str = data.SecretString;
                value = JSON.parse(str);
            } else {
                buffer = Buffer.from(data.SecretBinary, 'base64')
                decodedBinarySecret = buffer.toString('ascii')
                const str = decodedBinarySecret
                value = JSON.parse(str);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }

        return value;
    }


}


module.exports = AwsSecretsManager