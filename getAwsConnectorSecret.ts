import AwsSecretsManager from "./AwsSecretsManager"
import { connector } from "./types/typeOfConnector"

const getAwsConnectorSecret = async (secretName: string) => {
    const secretManager
        = new AwsSecretsManager({
            region: 'eu-west-2'
        })
    const secretValue: connector = await secretManager.getSecValue(secretName)
    console.log('secretValue: ', secretValue);

    return (secretValue)
}

export default getAwsConnectorSecret;