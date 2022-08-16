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
/**
 * @param {*} secretObj from type connector
 * @returns secret data from env file
 */
const getConnectorSecret = (secretObj) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        username: secretObj.username !== undefined ? secretObj.username : process.env[`${secretObj.type}_USER`],
        password: secretObj.password !== undefined ? secretObj.password : process.env[`${secretObj.type}_PASSWORD`],
        engine: secretObj.engine !== undefined ? secretObj.engine : process.env[`${secretObj.type}_ENGINE`],
        host: secretObj.host !== undefined ? secretObj.host : process.env[`${secretObj.type}_HOST`],
        port: secretObj.port !== undefined ? secretObj.port : Number(process.env[`${secretObj.type}_PORT`]),
        dbname: secretObj.dbname !== undefined ? secretObj.dbname : process.env[`${secretObj.type}_NAME`],
    };
});
exports.default = getConnectorSecret;
