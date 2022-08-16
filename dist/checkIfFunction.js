"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {*} secretObj that needs to load a file
 * @returns secret object with the value loaded from the file
 */
const checkIfFunction = (secretObj) => {
    Object.entries(secretObj).forEach(entry => {
        var _a, _b;
        //if the object has an exac key do:
        //@ts-ignore
        if ((_a = entry[1]) === null || _a === void 0 ? void 0 : _a.exec) {
            try {
                // require the file in the file entry
                //@ts-ignore
                const file = require(`${(_b = entry[1]) === null || _b === void 0 ? void 0 : _b.file}`);
                // excecute the function in the loaded file
                //@ts-ignore
                const res = file[entry[1].funcName]();
                // if a value was returend from the function, apply it as a sceret key data
                if (res)
                    //@ts-ignore
                    secretObj[entry[0]] = res;
            }
            catch (error) {
                console.error("error in checkIfFunction.js. \nplease make sure the file path and the function name are valid. \nthe action returned the following error: \n", error);
                process.exit(1);
            }
        }
    });
    return secretObj;
};
exports.default = checkIfFunction;
