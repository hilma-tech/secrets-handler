const fs = require('fs');
const connector = `
 {   port: number,
    engine: DatabaseType,
    dbname: string,
    username: string,
    host: string,
    password: string}
`

const getType = (secretObject, filename) => {
    const fout = fs.createWriteStream(filename, 'utf-8');
    fout.write(`
    type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-data-api" | "aurora-data-api-pg" | "expo" | "better-sqlite3" | "capacitor";
    declare module "secrets_config" { const secretFunc:(secretArr: secretConfigObjectsArray) => [`)
    for (let i = 0; i < secretObject.length; i++) {
        switch (secretObject[i].objType) {
            case "connector":
                fout.write(connector)
                break;
            case "unknown":
                let unknown = "{";
                for (let j = 0; j < secretObject[i].envNameArr.length; j++) {
                    unknown += `${secretObject[i].envNameArr[j]}: any`
                    if (j != secretObject[i].envNameArr.length - 1)
                        unknown += ",\n"
                }
                unknown += "}"
                fout.write(unknown)
                break;
            case "preknown":
                fout.write(`${secretObject[i].name}: any`)
                break;

            default:
                console.log('no');
                break;
        }
        if (i != secretObject.length - 1)
            fout.write(',')
    }

    fout.write(`]   
     export {secretFunc}; }
    `)
    fout.close()
    console.log("done 🎂");

}

getType([{
    objType: "connector",
    name: 'secret1',
    type: 'DB'
}, {
    objType: "connector",
    name: 'secret2',
    type: 'DB_DW'
}, {
    objType: "unknown",
    name: 'secret3',
    type: 'UN',
    envNameArr: ['ENCRYPTION_KYE', 'NCRYPTION_KEY', 'ENCRYPTION_KEY']
}], "fileq.type.ts")

module.exports = getType