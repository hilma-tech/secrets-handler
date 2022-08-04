const aws = require('aws-sdk')

class AwsSecretsManager {
    awsSecretsManager: any;
    constructor(SecretsManagerOptions: any) {
        this.awsSecretsManager = new aws.SecretsManager(SecretsManagerOptions)
    }

    async getSecValue(secretId: string) {
        console.log('secretId: ', secretId);
        let value: any, buffer, decodedBinarySecret;
        try {
            const data = await this.awsSecretsManager.getSecretValue({ SecretId: "super/secretname" }).promise();
            console.log('data: ', data);
            if ('SecretString' in data) {
                console.log('data.SecretString: ', data.SecretString);
                value = data.SecretString;
            } else {
                buffer = Buffer.from(data.SecretBinary, 'base64')
                decodedBinarySecret = buffer.toString('ascii')
                console.log('decodedBinarySecret: ', decodedBinarySecret);
                value = decodedBinarySecret
            }
        } catch (error) {
            console.log("jnjnj")
            console.error(error);
            throw error;
        }

        return value;
    }


}


export default AwsSecretsManager