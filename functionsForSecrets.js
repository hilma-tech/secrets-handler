const { join } = require("path");

const fs = require("fs");

const getPass019 = () => {
    // return fs.readFileSync(join(__dirname, '../src/utils/019.txt'), 'utf-8')
    return "hi"
};

const getDBName = () => {
    return process.env.DB_NAME_DW
}

module.exports = { getDBName, getPass019 }