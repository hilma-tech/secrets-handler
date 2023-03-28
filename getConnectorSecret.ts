import { connectorSecret } from "./types/connectorSecret.type";
import { connectorSecretConfig } from "./types/connectorSecretConfig.type";
import { DatabaseType } from "./types/database.type";

/**
 * @param {*} secretObj from type connector
 * @returns secret data from env file
 */

const getConnectorSecret = async (secretObj: connectorSecretConfig): Promise<connectorSecret> => {
    return {
        username: typeof secretObj.username == "string" ? secretObj.username : process.env[`${secretObj.alias}_USER`],
        password: typeof secretObj.password == "string" ? secretObj.password : process.env[`${secretObj.alias}_PASSWORD`],
        engine: typeof secretObj.engine == "string" ? secretObj.engine : process.env[`${secretObj.alias}_ENGINE`] as DatabaseType,
        host: typeof secretObj.host == "string" ? secretObj.host : process.env[`${secretObj.alias}_HOST`],
        port: typeof secretObj.port == "number" ? secretObj.port : Number(process.env[`${secretObj.alias}_PORT`]),
        dbname: typeof secretObj.dbname == "string" ? secretObj.dbname : process.env[`${secretObj.alias}_NAME`],
    }
}

export default getConnectorSecret;