export type connectorSecretObjT = {
    isConnector:true;
    name: string;
    type: string;
    port?: number;
    engine?: string;
}
export type unknownSecretObj = {
    isConnector:false;

    name: string;
    envNameArr: string[]
    type: string;
}