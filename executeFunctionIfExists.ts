function isFunction(funcToCheck: any) {
    return funcToCheck && {}.toString.call(funcToCheck) == "[Object Function]"
}
const executeFunctionIfExists = (secretObj: { [key: string]: any }) => {
    Object.entries(secretObj).forEach(entry => {
        //if the object has an exec key do:
        if (entry[1]) {
            try {
                if (isFunction(entry[1])) {
                    const res = entry[1]()
                    if (res)
                        secretObj[entry[0]] = res;
                }
            } catch (error) {
                console.error("error in executeFunctionIfExists.js.");
                throw error
            }
        }
    })
    return secretObj;
}

export default executeFunctionIfExists;