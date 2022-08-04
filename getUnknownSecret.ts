import getAwsConnectorSecret from "./getAwsSecret";
import { unknownSecretObj } from "./types/typeOfSecretObj.type";

const getUnknownSecretObj = async (secretObj: unknownSecretObj) => {
    console.log('secretObj: ', secretObj);

    const a: any= {}

    for (let i = 0; i < secretObj.envNameArr.length; i++) {
        a[secretObj.envNameArr[i]] = process.env[secretObj.envNameArr[i]]
    }

    return a;

}

export default getUnknownSecretObj;