import { DatabaseType } from "../types/database.type";
import secretConfigTypes from "../types/secretConfigTypesEnum.type";


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

export default connectorSecretConfig;