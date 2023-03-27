const fs = require('fs')
const path = require("path")

const readSecretValueFromFile = async (filename) => {
    console.log("dirname", __dirname);
    const value = await fs.promises.readFile(path.join(__dirname, filename), "utf-8");
    console.log('value: ', value);
    return value;
}
module.exports = readSecretValueFromFile;