import { singletonSecretConfig } from "./types/singletonSecretConfig.type";

interface secretsObject {
    [key: string]: any;
}

/**
 * @param {*} secretObj from type unknown secret
 * @returns secret data from env
 */
const getSingletonEnvSecret = async (secretObj: singletonSecretConfig): Promise<secretsObject> => {

    const singletonSecret: secretsObject = {}

    for (let i = 0; i < secretObj.envNameArr.length; i++) {
        const propertyName: string = secretObj.envNameArr[i]
        singletonSecret[propertyName] = process.env[propertyName]
    }

    return singletonSecret;

}

export default getSingletonEnvSecret;