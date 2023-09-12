#!/bin/bash

# Stop docker

printf "\033[0;32m Starting application\033[0m"

docker compose up --build
