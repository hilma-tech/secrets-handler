import connectorSecretConfig from "./connectorSecretConfig.type";
import preknownSecretConfig from "./preknownSecretConfig.type";
import unknownSecretConfig from "./unknownSecretConfig.type";

type secretConfigObjectsArray = Array<connectorSecretConfig | unknownSecretConfig | preknownSecretConfig>

export default secretConfigObjectsArray;