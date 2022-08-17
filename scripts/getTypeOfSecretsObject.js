"use strict";
const fs = require('fs');
const connector = `
 {   port: number,
    engine: DatabaseType,
    dbname: string,
    username: string,
    host: string,
    password: string}
`;
const DatabaseType = `
export declare type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";
`

const enumSecretConfigType = `
export enum secretConfigTypes {
    connectorSecretConfig = "connector",
    unknownSecretConfig = "unknown",
    preKnownSecretConfig = "preknown"
}`

const configObjects = `

type connectorSecretConfig = {
    objType: "connector";
    name: string;
    type: string;
    port?: number;
    engine?: DatabaseType;
    dbname?: string;
    username?: string;
    host?: string;
    password?: string
}

type preknownSecretConfig = {
    objType: "preknown";
    name: string;
    value: object;
    type: string;
}

type unknownSecretConfig = {
    objType: "unknown";
    name: string;
    envNameArr: string[]
    type: string;
}
`

const secretConfigObjectsArray = `
export type secretConfigObjectsArray = Array<connectorSecretConfig | unknownSecretConfig | preknownSecretConfig>
`

const getType = (secretObject) => {
    const fout = fs.createWriteStream("secrets_config.d.ts", 'utf-8');
    fout.write(`
    ${DatabaseType}
    ${enumSecretConfigType}
    ${configObjects}
    ${secretConfigObjectsArray}
    declare module "secrets_config" { const genericSecrets:(secretArr: secretConfigObjectsArray) => {`);
    for (let i = 0; i < secretObject.length; i++) {
        switch (secretObject[i].objType) {
            case "connector":
                fout.write(`${secretObject[i].name}: ${connector}`);
                break;
            case "unknown":
                let unknown = "{";
                for (let j = 0; j < secretObject[i].envNameArr.length; j++) {
                    unknown += `${secretObject[i].envNameArr[j]}: any`;
                    if (j != secretObject[i].envNameArr.length - 1)
                        unknown += ",\n";
                }
                unknown += "}";
                fout.write(unknown);
                break;
            case "preknown":
                fout.write(`${secretObject[i].name}: any`);
                break;
            default:
                console.log('no');
                break;
        }
        if (i != secretObject.length - 1)
            fout.write(',');
    }
    fout.write(`}`);
    fout.close();
    console.log("done 🛸");
};
module.exports = getType;
