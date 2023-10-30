#!/bin/bash

source ./scripts/setup.sh

# Start docker

TEMP=$1
MODE=$(echo "${TEMP:-prod}" | tr '[:lower:]' '[:upper:]')
ERROR_MSG='You need to use debug or dev or blank'

if [[ ${MODE} != 'PROD' ]] && [[ ${MODE} != 'DEV' ]] && [[ ${MODE} != 'DEBUG' ]]; then
  printColors red "${ERROR_MSG}"
  exit 0
fi

get_microservices_envs

printColors green "Starting application in ${MODE} mode"

case ${MODE} in
DEV)
  docker compose -f docker/common.yaml -f docker/dev.yaml up --build
  ;;
DEBUG)
  docker compose -f docker/common.yaml -f docker/debug.yaml up --build
  ;;
PROD)
  docker compose -f docker/common.yaml -f docker/prod.yaml up --build
  ;;
*)
  echo "${ERROR_MSG}"
  ;;
esac
