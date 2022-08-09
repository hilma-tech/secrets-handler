
const getUnknownSecretObj = async (secretObj) => {

    const a = {}

    for (let i = 0; i < secretObj.envNameArr.length; i++) {
        a[secretObj.envNameArr[i]] = process.env[secretObj.envNameArr[i]]
    }

    return a;

}

module.exports = getUnknownSecretObj;