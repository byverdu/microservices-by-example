#!/bin/bash

# reboot docker

TEMP=$1
MODE=$(echo "${TEMP:-prod}" | tr '[:lower:]' '[:upper:]')

if [[ ${MODE} != 'PROD' ]] && [[ ${MODE} != 'DEV' ]] && [[ ${MODE} != 'DEBUG' ]]; then
    echo 'You need to use debug or dev or blank'
    exit 1
fi

echo -e "\033[0;32m Rebooting application in ${MODE} mode \033[0m\n"

case ${MODE} in
DEV)
    docker compose down && docker compose --file docker-compose.dev.yaml --env-file=./.env up --build
    ;;
DEBUG)
    docker compose down && docker compose --file docker-compose.debug.yaml --env-file=./.env up --build
    ;;
PROD)
    docker compose down && docker compose --env-file=./.env up --build
    ;;
*)
    echo 'You need to use debug or dev or blank'
    ;;
esac
