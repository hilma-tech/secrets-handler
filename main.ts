import getConnectorSecret from "./getConnectorSecret";
import { secretObjT } from "./types/typeOfSecretObj.type";

async function genericSecrets(useAws: boolean, secrets: secretObjT[]) {
    const s: any = {};
    for (let i = 0; i < secrets.length; i++) {
        const a = secrets[i];
        if (a.isConnector) {
            s[a.name] = await getConnectorSecret(useAws, a)
        }
    }
    
    console.log('s: ', s);
}

genericSecrets(Boolean(process.env.USE_AWS), [{name: "mysqldbinfo", type: "DB", isConnector: true}])
