export const __esModule: boolean;
export default AwsSecretsManager;
declare class AwsSecretsManager {
    constructor(SecretsManagerOptions: any);
    awsSecretsManager: aws.SecretsManager;
    getSecValue(secretId: any): any;
}
import aws = require("aws-sdk");
