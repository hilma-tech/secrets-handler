import connectorSecretConfig from "./connectorSecretConfig.type";
import preknownSecretConfig from "./preknownSecretConfig.type";
import unknownSecretConfig from "./unknownSecretConfig.type";

export type secretConfigObjectsArray = Array<connectorSecretConfig | unknownSecretConfig | preknownSecretConfig>


export default secretConfigObjectsArray;