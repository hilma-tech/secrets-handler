#!/bin/bash

# Script for creating an env file with connectors

echo "Enter the name of the env file"
read FILE_NAME

echo "Enter names saperated by a space for database configuration
 for example: DB MYSQLDB MONGODB"
read VAR_STRING

touch $FILE_NAME

echo """
USE_AWS=
AWS_REGION=
""" >>$FILE_NAME

for VAR_NAME in ${VAR_STRING[@]}; do
    echo """
${VAR_NAME}_HOST=
${VAR_NAME}_PORT=
${VAR_NAME}_ENGINE=
${VAR_NAME}_USER=
${VAR_NAME}_PASSWORD=
${VAR_NAME}_SECRET_NAME=
${VAR_NAME}_NAME=
""" >>$FILE_NAME
done

echo "done 🛸"
