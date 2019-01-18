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
    -e AWS_ACCESS_KEY="${AWS_ACCESS_KEY}" \
    -e AWS_SECRET_KEY="${AWS_SECRET_KEY}" \
    -e SERVICE_NAME="${SERVICE_NAME}" \
    -e BUILD_NUMBER="${BUILD_NUMBER}" \
    -e INTERNAL_DEPLOY_PATH="${INTERNAL_DEPLOY_PATH}" \
    --entrypoint=bash \
    centralitycontainerregistry-on.azurecr.io/centrality/k8s-aws-terraform:1.0.12 \
    "/opt/code/centrality.deploy/aws/serverless/lambda-bucket.sh"