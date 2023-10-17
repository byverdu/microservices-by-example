#!/bin/bash

function printColors() {
  red='\033[0;31m'
  green='\033[0;32m'
  orange='\033[1;33m'
  end="\033[0m"

  case $1 in
  "red")
    color=${red}
    ;;

  "green")
    color=${green}
    ;;

  "orange")
    color=${orange}
    ;;

  *)
    color=${orange}
    ;;
  esac

  echo -e "${color}$2${end}"
}

function get_microservices_envs {
  SERVICES=(streaming storage history)

  printColors orange "Removing values from .env"
  echo "" >.env

  for path in "${SERVICES[@]}"; do
    SERVICE_PATH="video-${path}/.env"

    printColors green "copying ${SERVICE_PATH} to .env"
    cat "${SERVICE_PATH}" >>.env
  done

  # remove duplicated envs
  sort .env | uniq | tee .env || true
}
