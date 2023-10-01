#!/bin/bash

# reboot docker

printf "\033[0;32m Rebooting application\033[0m"

docker compose down && docker compose --env-file=./.env up --build
