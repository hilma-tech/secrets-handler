import AwsSecretsManager from "./AwsSecretsManager";
import secretsObject from "./types/genericObjTypes";

/**
 * @param {*} secretName secretId(aws)
 * @returns secret value from aws
 */
const getAwsSecret = async (secretName: string): Promise<secretsObject | undefined>  => {
    try {
        const secretManager
            = new AwsSecretsManager({
                region: process.env.AWS_REGION
            });

        const secretValue: secretsObject = await secretManager.getSecValue(secretName)
        return secretValue;
        
    } catch (error) {
        console.error("error in getAwsSecret: ", error);
        return;
    }
}
export default getAwsSecret;