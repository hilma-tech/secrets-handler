const fs = require('fs');
const fsPromises = fs.promises;
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
let stringToAppend = ''
const getType = (secretObject, times) => {
    try {
        if (times) return
        times++;
        const fout = fs.createWriteStream("secrets_config.d.ts", 'utf-8');

        stringToAppend += `
        ${DatabaseType}
        ${enumSecretConfigType}
        ${configObjects}
        ${secretConfigObjectsArray}
        declare module "secrets_config" { const genericSecrets:(secretArr: secretConfigObjectsArray) => {`

        for (let i = 0; i < secretObject.length; i++) {
            switch (secretObject[i].objType) {
                case "connector":
                    stringToAppend += `${secretObject[i].name}: ${connector}`
                    break;
                case "unknown":
                    let unknown = "{";
                    for (let j = 0; j < secretObject[i].envNameArr.length; j++) {
                        unknown += `${secretObject[i].envNameArr[j]}: any`;
                        if (j != secretObject[i].envNameArr.length - 1)
                            unknown += ",\n";
                    }
                    unknown += "}";
                    stringToAppend += unknown
                    break;
                case "preknown":
                    stringToAppend += `${secretObject[i].name}: any`
                    break;
                default:
                    console.log('no');
                    break;
            }
            if (i != secretObject.length - 1)
                stringToAppend += ','
        }
        stringToAppend += `}}`;

        fout.write(stringToAppend);
        fout.close();


        console.log("done 🛸");

    } catch (error) {
        console.log('error: ', error);
    }
};
module.exports = getType;
