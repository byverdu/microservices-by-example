#!/bin/bash

# Start docker

TEMP=$1
MODE=$(echo "${TEMP:-prod}" | tr '[:lower:]' '[:upper:]')
ERROR_MSG='You need to use debug or dev or blank'

if [[ ${MODE} != 'PROD' ]] && [[ ${MODE} != 'DEV' ]] && [[ ${MODE} != 'DEBUG' ]]; then
    echo "${ERROR_MSG}"
    exit 0
fi

echo -e "\033[0;32m Starting application in ${MODE} mode. \033[0m\n"

case ${MODE} in
DEV)
    docker compose --file docker-compose.dev.yaml --env-file=./.env up --build
    ;;
DEBUG)
    docker compose --file docker-compose.debug.yaml --env-file=./.env up --build
    ;;
PROD)
    docker compose --env-file=./.env up --build
    ;;
*)
    echo "${ERROR_MSG}"
    ;;
esac
