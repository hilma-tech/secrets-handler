"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkIfFunction_1 = __importDefault(require("./checkIfFunction"));
const getAwsSecret_1 = __importDefault(require("./getAwsSecret"));
const getConnectorSecret_1 = __importDefault(require("./getConnectorSecret"));
const getUnknownSecret_1 = __importDefault(require("./getUnknownSecret"));
const secretConfigTypesEnum_type_1 = __importDefault(require("./types/secretConfigTypesEnum.type"));
/**
 * @param {*} secretsObjects an array containing secret objects from type connector/preknown/unknown
 * @returns array containing secrets and their value from the wanted destenation
 */
function genericSecrets(secretsObjects) {
    return __awaiter(this, void 0, void 0, function* () {
        // if secretsObjects is not an array, throw error
        if (!Array.isArray(secretsObjects)) {
            console.error(`secretsObjects must be an array. you passed ${typeof secretsObjects}`);
            return;
        }
        const secretsArr = {};
        // for every secret object in secretsObjects retrives the secret from the wanted source(aws or env file)  and according to the secret type(connector/unknown/preknown)
        for (let i = 0; i < secretsObjects.length; i++) {
            if (process.env.USE_AWS === 'true' && !!process.env[`${secretsObjects[i].type}_SECRET_NAME`]) {
                secretsArr[secretsObjects[i].name] = yield (0, getAwsSecret_1.default)(process.env[`${secretsObjects[i].type}_SECRET_NAME`]);
            }
            else {
                const secretConfig = secretsObjects[i];
                switch (secretConfig.objType) {
                    case secretConfigTypesEnum_type_1.default.connectorSecretConfig:
                        secretsArr[secretConfig.name] = yield (0, getConnectorSecret_1.default)(secretConfig);
                        break;
                    case secretConfigTypesEnum_type_1.default.preKnownSecretConfig:
                        //@ts-ignore
                        const modifiedValue = (0, checkIfFunction_1.default)(secretConfig.value);
                        secretsArr[secretConfig.name] = modifiedValue;
                        break;
                    case secretConfigTypesEnum_type_1.default.unknownSecretConfig:
                        secretsArr[secretConfig.name] = yield (0, getUnknownSecret_1.default)(secretConfig);
                        break;
                    default:
                        break;
                }
            }
        }
        return secretsArr;
    });
}
const secretsObjs = [
    {
        objType: secretConfigTypesEnum_type_1.default.connectorSecretConfig,
        name: 'secret1',
        type: 'DB'
    }, {
        objType: secretConfigTypesEnum_type_1.default.connectorSecretConfig,
        name: 'secret2',
        type: 'DB_DW'
    }, {
        objType: secretConfigTypesEnum_type_1.default.unknownSecretConfig,
        name: 'secret3',
        type: 'UN',
        envNameArr: ['ENCRYPTION_KYE', 'NCRYPTION_KEY', 'ENCRYPTION_KEY']
    }
];
const a = () => __awaiter(void 0, void 0, void 0, function* () {
    const secrets = yield genericSecrets(secretsObjs);
    console.log('secrets: ', secrets);
});
a();
exports.default = genericSecrets;
