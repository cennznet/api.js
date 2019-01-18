#!/bin/bash
###
# This deployment script will run docker container  and execute deploy script
# inside. Docker container has awscli installed and deploy script needs it.
###

set -e

 
: "${ENV:?ENV is required}"
: "${SCRIPT:?SCRIPT is required}"

declare CONTAINER=${CONTAINER:-"k8s-aws-terraform:1.0.20"}

docker run -t --rm \
    -v "$(pwd):/opt/code/" \
    -e ENV="${ENV}" \
    -e DISTRIBUTION_ID="${DISTRIBUTION_ID}" \
    -e AWS_ACCESS_KEY="${AWS_ACCESS_KEY}" \
    -e AWS_SECRET_KEY="${AWS_SECRET_KEY}" \
    -e AWS_REGION="${AWS_REGION}" \
    --entrypoint=bash \
    centralitycontainerregistry-on.azurecr.io/centrality/${CONTAINER} \
    "/opt/code/centrality.deploy/aws/${SCRIPT}.sh"
