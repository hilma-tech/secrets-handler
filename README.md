# secrets-handler
This package handles the projects secrets and gets the secrets from either env file or from secrets manager in aws

secrets-handler is a package for getting secrets, from an env file or from aws secrets manager.

## Installation

$ npm i @hilma/secrets-handler

## Setup

in app module change forRoot => forRootAsync

for connector(db) secrets you should follow this syntax:

ALIAS_HOST </br>
ALIAS_PORT </br>
ALIAS_PASSWORD </br>
ALIAS_ENGINE </br>
ALIAS_USER </br>
ALIAS_SECRET_NAME </br>

## Usage

Call getSecrets with an object, according to the tables below.


## Types for getSecrets:

### Connectors:
| key/s | value/ typeof value   | what for    |
| :---:   | :---: | :---: |
|name <br />**required**|string|the name refering to the object in the code.<br />*privateSecret[name]*|
|alias<br />**required**|string|short string that precedes env variables names. <br />ex: DB_NAME and DB_SECRET_NAME - "DB" is the alias |
|port, engine, host, dbname, username, pasword<br />*optional*|string / number|hard coded data for your db connection|

### Singleton: 
| key/s | value/ typeof value   | what for    |
| :---:   | :---: | :---: |
|name <br />**required**|string|the name refering to the object in the code.<br />*privateSecret[name]*|
|envNameArr<br />**required**|array containing names of the wanted aliases from the env|To get them from the env file|database information|Use in cases when the key is not in the env file or you want to override it.|

### Preknowns:
| key/s | value/ typeof value   | what for    |
| :---:   | :---: | :---: |
|name <br />**required**|string|the name refering to the object in the code.<br />*privateSecret[name]*|
|alias<br />**required**|string|short string that precedes env variables names. <br />ex: DB_NAME and DB_SECRET_NAME - "DB" is the alias |
|value<br />**required**|object. key: string, value: any.|for secrets that do not have data in the env file.|


setEnv.ts:
```javascript
import getSecrets, { connectorSecret } from "@hilma/secrets-handler"

export let privateSecret: {
   mysqlSecret: connectorSecret,
   unknownSecrets: {
    SECRET: string
   },
   pass019: string
}

export const setEnv = async () => {
    privateSecret = await getSecrets([
        {
            alias: "DB",
            engine: "mysql",
            name: "mysqlSecret"
        },
        {
            alias: "SINGELTON",
            envNameArr: [
                "SECRET",
            ],
            name: "unknownSecrets"
        },
        pass019: true
    ]);
}
```
