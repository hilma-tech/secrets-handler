import connectorSecret from "./types/connectorSecret.type";
import connectorSecretConfig from "./types/connectorSecretConfig.type";

/**
 * @param {*} secretObj from type connector
 * @returns secret data from env file
 */
const getConnectorSecret = async (secretObj: connectorSecretConfig): Promise<connectorSecret> => {
    
    return {
        username: secretObj.username !== undefined ? secretObj.username : process.env[`${secretObj.type}_USER`],
        password: secretObj.password !== undefined ? secretObj.password : process.env[`${secretObj.type}_PASSWORD`],
        engine: secretObj.engine !== undefined ? secretObj.engine : process.env[`${secretObj.type}_ENGINE`],
        host: secretObj.host !== undefined ? secretObj.host : process.env[`${secretObj.type}_HOST`],
        port: secretObj.port !== undefined ? secretObj.port : Number(process.env[`${secretObj.type}_PORT`]),
        dbname: secretObj.dbname !== undefined ? secretObj.dbname : process.env[`${secretObj.type}_NAME`],
    }
}

export default getConnectorSecret;