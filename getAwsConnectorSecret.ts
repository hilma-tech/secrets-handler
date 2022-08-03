import AwsSecretsManager from "./AwsSecretsManager"
import { connector } from "./types/typeOfConnector"

const getAwsConnectorSecret = async (secretName: string) => {
    const secretManager
        = new AwsSecretsManager({
            region: 'eu-west-1'
        })
    const secretValue: connector = await secretManager.getSecValue(secretName)

    return (secretValue)
}

export default getAwsConnectorSecret;