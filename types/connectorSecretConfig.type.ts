import secretConfigTypes from "./secretConfigTypesEnum.type";

type connectorSecretConfig = {
    objType: secretConfigTypes.connectorSecretConfig;
    name: string;
    type: string;
    port?: number;
    engine?: string;
    dbname?: string;
    username?: string;
    host?: string;
    password?: string
}

export default connectorSecretConfig;