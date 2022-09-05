# secrets-handler
This package handles the projects secrets and gets the secrets from env file or from aws

## How to use:
 1. Install the package 
 2. In setEnv or main.ts import getSecrets function and give it you secret config. 
 3. In your tsconfig file, remove "node_modules" from exclude and insert "node_modules/@hilma/secrets-handler" to include.
 4. Give to your secret object this type: ReturnType\<typeof getSecrets\>


**Secert config syntax**: 
An array containig objects. 
Object can be from type connector(db), unknown, preknown.

*If you cannot see the object type open secrets-handler.d.ts file*: 