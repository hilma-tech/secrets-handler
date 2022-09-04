declare type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";

type execObj = {
    exec: true,
    filePath: string,
    funcName: string
}

type connectorSecretConfig = {
    objType: "connector";
    name: string;
    type: string;
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
    type: string;
}

type unknownSecretConfig = {
    objType: "unknown";
    name: string;
    envNameArr: string[]
    type: string;
}

type secretConfigObjectsArray = Array<connectorSecretConfig | unknownSecretConfig | preknownSecretConfig>


    type returnType = {
hospikolMysql: 
 {   port: number,
    engine: DatabaseType,
    dbname: string,
    username: string,
    host: string,
    password: string}
}

declare module "secrets_config" { 
    const genericSecrets:(secretArr: secretConfigObjectsArray) => returnType
}


