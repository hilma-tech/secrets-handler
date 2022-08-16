import secretConfigTypes from "./secretConfigTypesEnum.type";

type unknownSecretConfig = {
    objType: secretConfigTypes.unknownSecretConfig;
    name: string;
    envNameArr: string[]
    type: string;
}

export default unknownSecretConfig