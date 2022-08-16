
    type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";
    declare module "secrets_config" { const secretFunc:(secretArr: secretConfigObjectsArray) => [
 {   port: number,
    engine: DatabaseType,
    dbname: string,
    username: string,
    host: string,
    password: string}
,
 {   port: number,
    engine: DatabaseType,
    dbname: string,
    username: string,
    host: string,
    password: string}
,{ENCRYPTION_KYE: any,
NCRYPTION_KEY: any,
ENCRYPTION_KEY: any}]   
     export {secretFunc}; }
    