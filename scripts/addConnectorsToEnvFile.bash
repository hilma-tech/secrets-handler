#!/bin/bash

#Script for adding connectors to an env file

echo "Enter the name of the env file"
read FILE_NAME

echo "Enter names saperated by a space for database configuration
 for example: DB MYSQLDB MONGODB"
read VAR_STRING

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

echo "done 🎂"
