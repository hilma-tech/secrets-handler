import connectorSecret from "./types/connectorSecret.type";
import connectorSecretConfig from "./types/connectorSecretConfig.type";
import { DatabaseType } from "./types/database.type";

/**
 * @param {*} secretObj from type connector
 * @returns secret data from env file
 */
const getConnectorSecret = async (secretObj: connectorSecretConfig): Promise<connectorSecret> => {

    return {
        username: typeof secretObj.username == "string" ? secretObj.username : process.env[`${secretObj.type}_USER`],
        password: typeof secretObj.password == "string" ? secretObj.password : process.env[`${secretObj.type}_PASSWORD`],
        engine: typeof secretObj.engine == "string" ? secretObj.engine : process.env[`${secretObj.type}_ENGINE`] as DatabaseType,
        host: typeof secretObj.host == "string" ? secretObj.host : process.env[`${secretObj.type}_HOST`],
        port: typeof secretObj.port == "string" ? secretObj.port : Number(process.env[`${secretObj.type}_PORT`]),
        dbname: typeof secretObj.dbname == "string" ? secretObj.dbname : process.env[`${secretObj.type}_NAME`],
    }
}

export default getConnectorSecret;