export type connectorSecretObjT = {
    objType: objectTypeEnum.connector;
    name: string;
    type: string;
    port?: number;
    engine?: string;
    dbname?: string;
    username?: string;
    host?: string;
    password?: string
}
export type unknownSecretObj = {
    objType: objectTypeEnum.unknown;
    name: string;
    envNameArr: string[]
    type: string;
}

export type preknownValueSecretObj = {
    objType: objectTypeEnum.preknownValue;
    name: string;
    value: object;
    type: string;
}

export enum objectTypeEnum {
    connector = "connector",
    unknown = "unknown",
    preknownValue = "preknownValue",
}



function hello() { const fs = require("fs"); return fs.readFileSync("./") }