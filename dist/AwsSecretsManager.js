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
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require('aws-sdk');
class AwsSecretsManager {
    constructor(SecretsManagerOptions) {
        this.awsSecretsManager = new aws.SecretsManager(SecretsManagerOptions);
    }
    // retrive secret from aws by secretId
    getSecValue(secretId) {
        return __awaiter(this, void 0, void 0, function* () {
            let value, buffer, decodedBinarySecret;
            try {
                const data = yield this.awsSecretsManager.getSecretValue({ SecretId: secretId }).promise();
                if ('SecretString' in data) {
                    const str = data.SecretString;
                    value = JSON.parse(str);
                }
                else {
                    buffer = Buffer.from(data.SecretBinary, 'base64');
                    decodedBinarySecret = buffer.toString('ascii');
                    const str = decodedBinarySecret;
                    value = JSON.parse(str);
                }
            }
            catch (error) {
                console.error(error);
                throw error;
            }
            return value;
        });
    }
}
exports.default = AwsSecretsManager;
