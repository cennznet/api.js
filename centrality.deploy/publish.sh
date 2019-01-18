#!/bin/bash
# This script will publish built docker image to ACR.
# Requires Azure Container Service Username and Password
# Also requires IMAGE_NAME defined

set -e

: "${SERVICE_NAME:?SERVICE_NAME is required}"
: "${ACR_USR?ACR_USR is required}"
: "${ACR_PSW?ACR_PSW is required}"

# Create image name
IMAGE_NAME="centrality/${SERVICE_NAME}:1.0.${BUILD_NUMBER}"

# Azure container registry
ACR_HOSTNAME=centralitycontainerregistry-on.azurecr.io

# GET IMAGE ID TO ADD TAG ON IT
IMAGE_ID=$(docker images --format "{{.ID}}" "${IMAGE_NAME}")

## PUBLISH IMAGE TO Azure Container Repository
docker tag "${IMAGE_ID}" "${ACR_HOSTNAME}/${IMAGE_NAME}"
docker tag "${IMAGE_ID}" "${ACR_HOSTNAME}/centrality/${SERVICE_NAME}:latest"

docker login -u "${ACR_USR}" -p "${ACR_PSW}" "${ACR_HOSTNAME}"

docker push "${ACR_HOSTNAME}/${IMAGE_NAME}"
docker push "${ACR_HOSTNAME}/centrality/${SERVICE_NAME}:latest"

# Remove image after pushing to azure container registry
docker rmi -f "${IMAGE_ID}"
