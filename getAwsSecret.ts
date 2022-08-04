import AwsSecretsManager from "./AwsSecretsManager"
import { connector } from "./types/typeOfConnector"

const getAwsSecret = async (secretName: string) => {
    console.log('secretName: ', secretName);
    const secretManager
        = new AwsSecretsManager({
            region: 'eu-west-2'
        })
    const secretValue: connector = await secretManager.getSecValue(secretName)
    console.log('secretValue: ', secretValue);

    return (secretValue)
}

export default getAwsSecret;