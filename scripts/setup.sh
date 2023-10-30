#!/bin/bash

printColors() {
  case "$1" in
  "red") echo -e "\033[1;31m$2\033[0m" ;;
  "green") echo -e "\033[1;32m$2\033[0m" ;;
  "orange") echo -e "\033[1;33m$2\033[0m" ;;
  *) echo "$2" ;;
  esac
}

function get_microservices_envs() {
  SERVICES=("streaming")
  DEST_PATH="./docker/.env"

  printColors orange "Removing values from ${DEST_PATH}"
  true >"${DEST_PATH}"

  pids=() # Initialize an array to store child process IDs

  for path in "${SERVICES[@]}"; do
    SERVICE_PATH="video-${path}/.env"

    if [[ -f "${SERVICE_PATH}" ]]; then
      printColors green "Copying ${SERVICE_PATH} to ${DEST_PATH}"
      cat "${SERVICE_PATH}" >>"${DEST_PATH}" &
      pids+=($!) # Store the child process ID in the array
      cp Dockerfile "video-${path}/"
    else
      printColors orange "File ${SERVICE_PATH} does not exist, skipping."
    fi
  done

  # Wait for all child processes to complete
  for pid in "${pids[@]}"; do
    wait "${pid}" || {
      printColors orange "Process ${pid} failed"
      exit 1
    }
  done

  # Remove duplicated envs
  sort .env | uniq >.env_temp || true
  mv .env_temp .env

  printColors green "Script completed successfully."
}
