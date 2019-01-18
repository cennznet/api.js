#!/bin/bash
###
# This deployment script will run docker container  and execute deploy script
# inside. Docker container has awscli installed and deploy script needs it.
###

# Invalidations happen too fast and backend is not deplyed yet. Then CDN
# caches the old data.
sleep 60

docker run -t --rm \
    -v "$(pwd):/opt/code/" \
    -e AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" \
    -e AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" \
    -e AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION}" \
    -e DISTRIBUTION_ID="${DISTRIBUTION_ID}" \
    --entrypoint=bash \
    xueshanf/awscli:latest \
    "/opt/code/centrality.deploy/aws/invalidate.sh"