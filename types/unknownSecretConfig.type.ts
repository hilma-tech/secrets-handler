import secretConfigTypes from "../types/secretConfigTypesEnum.type";

type unknownSecretConfig = {
    objType: "unknown";
    name: string;
    envNameArr: string[]
    type: string;
}

export default unknownSecretConfig