import getAwsSecret from "./getAwsSecret";
import getConnectorSecret from "./getConnectorSecret";
import getUnknownSecretObj from "./getUnknownSecret";
import { connectorSecretObjT, unknownSecretObj } from "./types/typeOfSecretObj.type";


async function genericSecrets(secretsObjects: connectorSecretObjT[] | unknownSecretObj[]) {

    const secretsArr: any = {};
    for (let i = 0; i < secretsObjects.length; i++) {
        if (process.env.USE_AWS === 'true') {
            console.log('Boolean(process.env.USE_AWS): ', Boolean(process.env.USE_AWS));
            secretsArr[secretsObjects[i].name] = await getAwsSecret(`${secretsObjects[i].type}_SECRET_NAME`)
        } else {
            const a: any = secretsObjects[i];
            if (a.isConnector) {
                secretsArr[a.name] = await getConnectorSecret(a)
            } else {
                //@ts-ignore
                secretsArr[a.name] = await getUnknownSecretObj(a)
            }
        }
    }
    console.log('s: ', secretsArr);
}

//@ts-ignore
genericSecrets([{ name: "mysqldbinfo", type: "DB", isConnector: true }, { isConnector: false, type: "CAT", envNameArr: ["CAT_DB", "CAT_NUMBER"], name: "cattyoe" }])
