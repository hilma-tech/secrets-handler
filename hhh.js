// const aws = require('aws-sdk')

// class AwsSecretsManager {
//     awsSecretsManager;
//     constructor(SecretsManagerOptions) {
//         this.awsSecretsManager = new aws.SecretsManager(SecretsManagerOptions)
//     }

//     async getSecValue(secretId) {
//         console.log('secretId: ', secretId);
//         let value, buffer, decodedBinarySecret;
//         try {
//             const data = await this.awsSecretsManager.getSecretValue({ SecretId: "super/secretname" }).promise();
//             if ('secretString' in data) {
//                 console.log('data.SecretString: ', data.SecretString);
//                 value = data.SecretString;
//             } else {
//                 buffer = Buffer.from(data.SecretBinary, 'base64')
//                 decodedBinarySecret = buffer.toString('ascii')
//                 console.log('decodedBinarySecret: ', decodedBinarySecret);
//                 value = decodedBinarySecret
//             }
//         } catch (error) {
//             console.log("cf")
//             console.error(error);
//             throw error;
//         }

//         return value;
//     }


// }

// const hhh = new AwsSecretsManager({
//     region: 'eu-west-2'
// });


// hhh.getSecValue("super/secretname")

// // module.exports = hhh.getSecValue;



// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "eu-west-2",
    secretName = "super/unknownsecrettype",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
        else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            throw err;
    }
    else {
        // Decrypts secret using the associated KMS key.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = data.SecretString;
            console.log('data.SecretString: ', data.SecretString);
            console.log('secret: ', secret);
        } else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            console.log('buff: ', buff);
            decodedBinarySecret = buff.toString('ascii');
        }
    }
    
    // Your code goes here. 
});

console.log(secret)