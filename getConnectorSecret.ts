import { connectorSecretObjT } from "./types/typeOfSecretObj.type";

const getConnectorSecret = async (secretObj: connectorSecretObjT) => {
        return {
            username: process.env[`${secretObj.type}_USER`],
            password: process.env[`${secretObj.type}_PASSWORD`],
            engine: secretObj.engine || process.env[`${secretObj.type}_ENGINE`],
            host: process.env[`${secretObj.type}_HOST`],
            port: secretObj.port || process.env[`${secretObj.type}_PORT`],
            dbname: process.env[`${secretObj.type}_NAME`],
        } 
}

export default getConnectorSecret;