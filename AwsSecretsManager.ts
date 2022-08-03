const aws = require('aws-sdk')

class AwsSecretsManager {
    awsSecretsManager: any;
    constructor(SecretsManagerOptions: any) {
        this.awsSecretsManager = new aws.SecretsManager(SecretsManagerOptions)
    }

    async getSecValue(secretId: string) {
        let value, buffer, decodedBinarySecret;
        this.awsSecretsManager.getSecretValue({
            SecretId: secretId, function(err, data) {
                if (err) {
                    console.error('err: ', err);
                    throw new Error(err)
                } else {
                    if ('secretString' in data) {
                        value = data.SecretString;
                    } else {
                        buffer = Buffer.from(data.SecretBinary, 'base64')
                        decodedBinarySecret = buffer.toString('ascii')
                        value = decodedBinarySecret
                    }
                }
            }
        })
        return value;
    }


}


export default AwsSecretsManager