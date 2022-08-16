import { DatabaseType } from "../types/database.type";
import secretConfigTypes from "../types/secretConfigTypesEnum.type";

type connectorSecretConfig = {
    objType: secretConfigTypes.connectorSecretConfig;
    name: string;
    type: string;
    port?: number;
    engine?: DatabaseType;
    dbname?: string;
    username?: string;
    host?: string;
    password?: string
}

export default connectorSecretConfig;