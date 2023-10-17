#!/bin/bash

source ./scripts/setup.sh

# reboot docker

TEMP=$1
MODE=$(echo "${TEMP:-prod}" | tr '[:lower:]' '[:upper:]')
ERROR_MSG='You need to use debug or dev or blank'

if [[ ${MODE} != 'PROD' ]] && [[ ${MODE} != 'DEV' ]] && [[ ${MODE} != 'DEBUG' ]]; then
  printColors red "${ERROR_MSG}"

  exit 0
fi

get_microservices_envs

printColors green "Rebooting application in ${MODE} mode"

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
