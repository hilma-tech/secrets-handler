
/**
 * @param {*} secretObj that needs to load a file
 * @returns secret object with the value loaded from the file
 */

const checkIfFunction = (secretObj: { [key: string]: any }) => {

    Object.entries(secretObj).forEach(entry => {
        //if the object has an exec key do:
        if (entry[1]) {
            if (entry[1].exec) {
                try {
                    // require the file in the file entry
                    const file = require(`${entry[1].filePath}`);
                    // excecute the function in the loaded file
                    const res = file[entry[1].funcName]();
                    // if a value was returend from the function, apply it as a secret key data
                    if (res)
                        secretObj[entry[0]] = res;
                } catch (error) {
                    console.error("error in checkIfFunction.js. \nplease make sure the file path and the function name are valid. \nthe action returned the following error: \n", error, "\n given filePath: ", entry[1].filePath, "\n given funcName: ", entry[1].funcName);
                    process.exit(1);
                }
            }
        }
    })

    return secretObj;

}


export default checkIfFunction;