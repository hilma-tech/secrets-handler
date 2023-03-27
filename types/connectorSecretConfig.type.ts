import { DatabaseType } from "../types/database.type";


type execObj = {
    exec: true,
    filePath: string,
    funcName: string
}

type connectorSecretConfig = {
    name: string;
    alias: string;
    port?: number | execObj;
    engine?: DatabaseType | execObj;
    dbname?: string | execObj;
    username?: string | execObj;
    host?: string | execObj;
    password?: string | execObj;
}

export default connectorSecretConfig;