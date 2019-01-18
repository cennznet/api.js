#!/bin/bash
###
# This script will run docker container and will run aws cli. The aws cli 
# will connect and will push the file to AWS S3 bucket
###

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${ENV:?ENV is required}"

declare SCRIPT=${SCRIPT:-"copy-artifacts"}

docker run -t --rm \
    -v "$(pwd):/opt/code/" \
    -e ENV="${ENV}" \
    -e PACKAGE_NAMES="${PACKAGE_NAMES}" \
    -e SUBDOMAIN="${SUBDOMAIN}" \
    -e BUILD_NUMBER="${BUILD_NUMBER}" \
    -e CUSTOM_DOMAIN="${CUSTOM_DOMAIN}" \
    -e AWS_ACCESS_KEY="${AWS_ACCESS_KEY}" \
    -e AWS_SECRET_KEY="${AWS_SECRET_KEY}" \
    -e SERVICE_NAME="${SERVICE_NAME}" \
    --entrypoint=bash \
    centralitycontainerregistry-on.azurecr.io/centrality/k8s-aws-terraform:1.0.12 \
    "/opt/code/centrality.deploy/static-website/${SCRIPT}.sh"
