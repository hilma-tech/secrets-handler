import { connectorSecretConfig } from "./connectorSecretConfig.type";
import { preknownSecretConfig } from "./preknownSecretConfig.type";
import { singletonSecretConfig } from "./singletonSecretConfig.type";

export type secretConfigObjectsArray = Array<connectorSecretConfig | singletonSecretConfig | preknownSecretConfig>


export default secretConfigObjectsArray;