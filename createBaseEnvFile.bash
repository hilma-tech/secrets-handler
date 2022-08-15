#!/bin/bash

echo "Script for creating an env file with variable names"

echo 'Enter the name of the env file'
read FILE_NAME

echo 'Enter variables names saperated by a space. for example: DB MYSQLDB MONGODB'
read VAR_STRING

touch $FILE_NAME

echo "USE_AWS=false" >>$FILE_NAME

for VAR_NAME in ${VAR_STRING[@]}; do
    echo """
${VAR_NAME}_HOST=
${VAR_NAME}_PORT=
${VAR_NAME}_ENGINE=
${VAR_NAME}_USER=
${VAR_NAME}_PASSWORD=
${VAR_NAME}_SECERET_NAME=
${VAR_NAME}_NAME=
""" >>$FILE_NAME
done

echo "done 🎂"
