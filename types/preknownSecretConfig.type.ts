import secretConfigTypes from "./secretConfigTypesEnum.type";

type preknownSecretConfig = {
    objType: secretConfigTypes.preKnownSecretConfig;
    name: string;
    value: object;
    type: string;
}

export default preknownSecretConfig;