"use strict";
const fs = require('fs');


const connector = `
 { 
    port: number,
    engine: DatabaseType,
    dbname: string,
    username: string,
    host: string,
    password: string
}
`;

let modifiedReturnTypeStr = `
declare type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";

type execObj = {
    exec: true,
    filePath: string,
    funcName: string
}

type connectorSecretConfig = {
    objType: "connector";
    name: string;
    alias: string;
    port?: number | execObj;
    engine?: DatabaseType | execObj;
    dbname?: string | execObj;
    username?: string | execObj;
    host?: string | execObj;
    password?: string | execObj;
}

type preknownSecretConfig = {
    objType: "preknown";
    name: string;
    value: object;
    alias: string;
}

type unknownSecretConfig = {
    objType: "unknown";
    name: string;
    envNameArr: string[]
    alias: string;
}

type secretConfigObjectsArray = Array<connectorSecretConfig | unknownSecretConfig | preknownSecretConfig>


    

declare module "@hilma/secrets-handler" { 
    const getSecrets:(secretArr: secretConfigObjectsArray) => returnType
}

    type returnType = {
`;


const getType = async (secretObject) => {
    try {
        for (let i = 0; i < secretObject.length; i++) {
            switch (secretObject[i].objType) {
                case "connector":
                    modifiedReturnTypeStr += `${secretObject[i].name}: ${connector}`;
                    break;
                case "unknown":
                    let unknown = `${secretObject[i].name} : {`;
                    for (let j = 0; j < secretObject[i].envNameArr.length; j++) {
                        unknown += `${secretObject[i].envNameArr[j]}: any`;
                        if (j != secretObject[i].envNameArr.length - 1)
                            unknown += "\n,";
                    }
                    unknown += "}";
                    modifiedReturnTypeStr += unknown;
                    break;
                case "preknown":
                    modifiedReturnTypeStr += `\n${secretObject[i].name}: any\n`;
                    break;
                default:
                    console.log('no');
                    break;
            }
            if (i != secretObject.length - 1)
                modifiedReturnTypeStr += ',';
        }
        modifiedReturnTypeStr += `}`;
        await fs.writeFileSync("./secrets-handler.d.ts", modifiedReturnTypeStr);
        console.log("done 🛸");
    }
    catch (error) {
        console.error("error in getting the return type of getSecrets:", error);
    }
};


module.exports = getType;
