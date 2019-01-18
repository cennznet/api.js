#!/bin/bash
###
# This deployment script will run docker container and execute deploy script
# inside. Docker container has kubectl installed and deploy script needs it.
###

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${ENV:?ENV is required}"
: "${CLUSTER_URL:?CLUSTER_URL is required}"
[[ -f "./k8s-config.yml" ]]

declare SCRIPT=${SCRIPT:-"k8s"}

docker run -t --rm \
       -v "$(pwd):/opt/code/" \
       -v "${KUBERNETES_KEY}":/root/.ssh/id_rsa \
       -e BUILD_NUMBER="${BUILD_NUMBER}" \
       -e CLUSTER_URL="${CLUSTER_URL}" \
       -e SERVICE_PRINCIPAL_USR="${SERVICE_PRINCIPAL_USR}" \
       -e SERVICE_PRINCIPAL_PSW="${SERVICE_PRINCIPAL_PSW}" \
       -e TENANT="${TENANT}" \
       -e SUBSCRIPTION_ID="${SUBSCRIPTION_ID}" \
       -e ENV="${ENV}" \
       -e SERVICE_NAME="${SERVICE_NAME}" \
       -e SCENE_NAME="${SCENE_NAME}" \
       -e APP_NAME="${APP_NAME}" \
       -e TYPE="${TYPE}" \
       -e CONFIG_FILENAME="${CONFIG_FILENAME}" \
       --entrypoint="bash" \
       azuresdk/azure-cli-python:2.0.23 \
       "/opt/code/centrality.deploy/${SCRIPT}-apply.sh"
