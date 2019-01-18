#!/bin/bash
###
# This script will run docker container and will run aws cli. The aws cli 
# will connect and will push the file to AWS S3 bucket
###

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${ENV:?ENV is required}"

docker run -t --rm \
    -v "$(pwd):/opt/code/" \
    -e ENV="${ENV}" \
    -e SUBDOMAIN="${SUBDOMAIN}" \
    -e BUILD_NUMBER="${BUILD_NUMBER}" \
    -e CUSTOM_DOMAIN="${CUSTOM_DOMAIN}" \
    -e AWS_KEY="${AWS_ACCESS_KEY}" \
    -e AWS_SECRET="${AWS_SECRET_KEY}" \
    -e SERVICE_NAME="${SERVICE_NAME}" \
    --entrypoint=bash \
    xueshanf/awscli:latest \
    "/opt/code/centrality.deploy/aws/everest/website-bucket.sh"