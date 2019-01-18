#!/bin/bash
###
# This script will run docker container and will run aws cli. The aws cli 
# will connect to the respective enviornment and will push the file to AWS S3 bucket
###

set -e

docker run -t --rm \
    -v "$(pwd):/opt/code/" \
    -e ENV="${ENV}" \
    -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
    -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
    -e SERVICE_NAME="${SERVICE_NAME}" \
    --entrypoint=bash \
    xueshanf/awscli:latest \
    "/opt/code/centrality.deploy/aws/k8-config-bucket.sh"