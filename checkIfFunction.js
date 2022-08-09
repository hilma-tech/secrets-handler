

const checkIfFunction = (secretObj) => {
    Object.entries(secretObj).forEach(i => {
        if (i[1]?.exec) {
            try {
                const h = require(`${i[1]?.file}`);
                const res = h[i[1].funcName]();
                if (res) secretObj[i[0]] = res;
            } catch (error) {
                console.error("error in checkIfFunction.js. \nplease make sure the file path and the function name are valid. \nthe action returned the following error: \n", error);
                process.exit(1);
            }
        }
    })
    return secretObj;
}


module.exports = checkIfFunction;