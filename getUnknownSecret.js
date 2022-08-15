
/**
 * @param {*} secretObj from type unknown secret
 * @returns secret data from env
 */
const getUnknownSecretObj = async (secretObj) => {

    const unknownSecret = {}

    for (let i = 0; i < secretObj.envNameArr.length; i++) {
        unknownSecret[secretObj.envNameArr[i]] = process.env[secretObj.envNameArr[i]]
    }

    return unknownSecret;

}

module.exports = getUnknownSecretObj;