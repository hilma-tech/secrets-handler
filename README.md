# secrets-handler

This package handles the projects secrets and gets the secrets from either an .env file or from secrets manager in aws. It means that all projects should use this package in case any day it will be deployed on AWS.

## How to use:
 1. Install the package and follow conventions
 2. In setEnv import getSecrets function and give it your secret config object. (see example below). setEnv should be called from main.ts as earlier as posible.
 3. in project, secrets are retrieved from privateSecret object.

## Installation

$ npm i @hilma/secrets-handler

## Types of Secrets:
For all projects we save all secrets in  "AWS secrets manager" service. For each project there can be multiple types of secrets:</br>
  connectors: credentials for all type of databases (mysql, mongodb,...)</br>
  Singletone: used for secret APIs (ie: Google API)</br>
  Preknowns: ???? for future use</br>
  pass019 : to get our common secret for all projects on sms 019 service</br>

### convention to use 
#### for typeorm
In nestjs, typeorm needs a number of variables related to the connection (host, port, credentials). These variables should be named in the .env file as follows:

XXX_HOST for hostname </br>
XXX_PORT for port </br>
XXX_PASSWORD for password</br>
XXX_ENGINE for engine type (mysql, mongodb</br>
XXX_USER for user name </br> 
XXX_SECRET_NAME for name of this secret in aws (ie: project_secret_mysql1) </br>
 Where XXX takes a value (ie: DB (for mysql primary db), MDB (for mongo), DW (for datawarehouse). 
 
 XXX value is the ALIAS value that will be decribed later in the document
#### for all secrets not related to Databases

SINGLETON_SECRET_NAME should be defined in your .env file (ie: Myproject_singleton)

#### for pass019

PASS019= <path of file with pass019 password> should be defined in you.env file

### Connectors:
| key/s | value/ typeof value   | what for    |
| :---:   | :---: | :---: |
|name <br />**required**|string|the name refering to the object in the code.<br />*privateSecret[name]* </br> ie: name= mysql1|
|alias<br />**required**|string|short string that precedes env variables names. <br />ex: DB_NAME and DB_SECRET_NAME - "DB" is the alias |
|port, engine, host, dbname, username, pasword<br />*optional*|string / number|hard coded data for your db connection to override env. This is optional and unlikely to be used|
### Singleton:
| key/s | value/ typeof value   | what for    |
| :---:   | :---: | :---: |
|name <br />**required**|string|the name refering to the object in the code.<br />*privateSecret[name]*</br> ie: name= globalsecrets|
|envNameArr<br />**required**|string array|array containing names of the wanted variables from the .env file</br> ie: [GOOGLE_MAP_KEY, GOOGLE_PHOTOS_KEY]|
### Preknowns:
| key/s | value/ typeof value   | what for    |
| :---:   | :---: | :---: |
|name <br />**required**|string|the name refering to the object in the code.<br />*privateSecret[name]*|
|alias<br />**required**|string|short string that precedes env variables names. <br />ex: DB_NAME and DB_SECRET_NAME - "DB" is the alias |
|value<br />**required**|object. key: string, value: any.|for secrets that do not have data in the env file.|
### Pass019:
boolean (true, false)</br>

## setEnv:

setEnv.ts:
```javascript
import { connectorSecret, getSecretsParams } from "@hilma/secrets-handler";
import getSecrets from "@hilma/secrets-handler";

export let privateSecret: {
    mysqlSecret?: connectorSecret;
    DWSecret?: connectorSecret;
    global?: {
        GOOGLE_MAP_KEY: string;
        GOOGLE_PHOTOS_KEY: string;
    };
    pass019?: string;
};
let param: getSecretsParams = {
    connectors: [{
        name: "mysqlSecret",
        alias: 'DB'
    }, {
        name: "DWSecret",
        alias: 'DW'
    }],
    singleton: {
        name: "global",
        envNameArr: ["GOOGLE_MAP_KEY", "GOOGLE_PHOTOS_KEY"]
    },
    pass019: true
}
export const setEnv = async () => {
    privateSecret = await getSecrets(param);
};
```

## typeORM in app.modules

in app module change forRoot => forRootAsync
example:
```javascript
     import { privateSecret } from "./setEnv";
      ....
     @Module({
    imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: "mysql",
          host: privateSecret.mysqlSecret.dbname,
          port: Number(privateSecret.mysqlSecret.port),
          database: privateSecret.mysqlSecret.dbname,
          username: privateSecret.mysqlSecret.username,
          password: privateSecret.mysqlSecret.password,
          ssl: process.env.DB_SSL === 'true' ? true : false,
          
          synchronize: process.env.DB_SYNC === 'true' ? true : false,
          // logging: true,
          extra: {
            charset: "utf8mb4_unicode_ci"
          },
          entities: [
            "dist/**/*{.ts,.js}",
            "node_modules/@hilma/auth-nest/dist/**/*.entity{.ts,.js}"
          ]
        }
      }
    }),

```


