const objectTypeEnum = {
    connector : "connector", // object has keys: user, port, engine, host, secretname, password
    unknown: "unknown", // object has key that are not in the connector type
    preknownValue: "preknownValue" // object has known value 
}

module.exports = objectTypeEnum