import secretConfigTypes from "./secretConfigTypesEnum.type";

type preknownSecretConfig = {
    objType: "preknown";
    name: string;
    value: object;
    type: string;
}

export default preknownSecretConfig;