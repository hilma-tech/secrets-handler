import getConnectorSecret from "./getConnectorSecret";

async function genericSecrets(useAws: boolean, secrets: any[]) {
    const s = {};
    for (let i = 0; i < secrets.length; i++) {
        const a = secrets[i];
        if (a.isConnector) {
            s[a.name] = getConnectorSecret(useAws, a)
        }
    }

}
