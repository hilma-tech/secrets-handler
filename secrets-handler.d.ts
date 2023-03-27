
// declare type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";

// type execObj = {
//     exec: true,
//     filePath: string,
//     funcName: string
// }

// type connectorSecretConfig = {
//     name: string;
//     alias: string;
//     port?: number | execObj;
//     engine?: DatabaseType | execObj;
//     dbname?: string | execObj;
//     username?: string | execObj;
//     host?: string | execObj;
//     password?: string | execObj;
// }

// type preknownSecretConfig = {
//     name: string;
//     value: object;
//     alias: string;
// }

// type unknownSecretConfig = {
//     name: string;
//     envNameArr: string[]
//     alias: string;
// }

// type secretConfigObjectsArray = Array<connectorSecretConfig | unknownSecretConfig | preknownSecretConfig>




// declare module "@hilma/secrets-handler" {
//     const getSecrets: (secretArr: secretConfigObjectsArray) => returnType
// }

// type returnType = any;