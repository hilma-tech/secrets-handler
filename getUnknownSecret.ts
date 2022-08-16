import unknownSecretConfig from "./types/unknownSecretConfig.type";

interface secretsObject {
    [key: string]: any;
}

/**
 * @param {*} secretObj from type unknown secret
 * @returns secret data from env
 */
const getUnknownSecretObj = async (secretObj: unknownSecretConfig): Promise<secretsObject> => {

    const unknownSecret: secretsObject = {}

    for (let i = 0; i < secretObj.envNameArr.length; i++) {
        const propertyName: string = secretObj.envNameArr[i]
        unknownSecret[propertyName] = process.env[propertyName]
    }

    return unknownSecret;

}

export default getUnknownSecretObj;