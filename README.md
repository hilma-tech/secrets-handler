# secrets-handler

This package handles the projects secrets and gets the secrets from either env file or from secrets manager in aws

<!-- ## How to use:
 1. Install the package
 2. In setEnv or main.ts import getSecrets function and give it you secret config array. (see example below)
 3. (optional) In your tsconfig file, remove "node_modules" from exclude and insert "node_modules/@hilma/secrets-handler" to include in order to have autocomplete working during development.
 4. (optional) Give to your secret object this type: ReturnType\<typeof getSecrets\> -->

<!--
**Secret config syntax**:
 An object containing three arrays
 {
    connectors: [],
    unknowns: [],
    preknowns: []
 }


*If you cannot see the object type open secrets-handler.d.ts file*:  -->

secrets-handler is a package for getting secrets, from an env file or from aws secrets manager.

## Installation

$ npm i @hilma/secrets-handler

## Setup

in app module change forRoot => forRootAsync

for connector(db) secrets you should follow this syntax:

ALIAS_HOST
ALIAS_PORT
ALIAS_PASSWORD
ALIAS_ENGINE
ALIAS_USER
ALIAS_SECRET_NAME

in tsconfig file add:

“include”: [“node_modules/@hilma/secrets_handler”, “src”]

If types are not visible:

Restart ts server or enter node_modules/@hilma/secrets_handler/secrets_handler.d.ts

## Usage

call getSecrets with an array, according to the table below.

## Array type for getSecrets

|                                        key/s                                        |                                        value/ typeof value                                         |                                                 what for                                                 |
| :---------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | -------------------- | ---------------------------------------------------------------------------- |
|                             objType <br /> **required**                             | connector - for databases <br />unknown - for singleton secret<br />preknown - for preknown values |                       to determine the type of the secret and get it accordingly.                        |
|                               name <br />**required**                               |                                               string                                               |                 the name refering to the object in the code.<br />_privateSecret[name]_                  |
|                               alias<br />**required**                               |                                               string                                               | short string that precedes env variables names. <br />ex: DB_NAME and DB_SECRET_NAME - "DB" is the alias |
|                     envName<br />_required for objType unknown_                     |                     array containing names of the wanted aliases from the env                      |                                      To get them from the env file                                       | database information | Use in cases when the key is not in the env file or you want to override it. |
|                     value<br />_required for objType preknown_                      |                                  object. key: string, value: any.                                  |                            for secrets that do not have data in the env file.                            |
| port, engine, host, dbname, username, pasword<br />_optional for objType connector_ |                                          string / number                                           |                                  hard coded data for your db connection                                  |

setEnv.ts:

```javascript
import { getSecrets } from "@hilma/secrets-handler";

export let privateSecret: ReturnType<typeof getSecrets>;

export const setEnv = async () => {
  privateSecret = await getSecrets([
    {
      objType: "connector",
      alias: "DB",
      engine: "mysql",
      name: "mysqlSecret",
    },
    {
      objType: "unknown",
      alias: "SINGELTON",
      envNameArr: ["SECRET"],
      name: "unknownSecrets",
    },
  ]);
};
```
