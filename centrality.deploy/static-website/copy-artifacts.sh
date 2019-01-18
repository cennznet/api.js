#!/bin/bash
###
# This script will copy files to S3 bucket to there respective enviornment	
###

set -e

export AWS_PROFILE="${ENV}"

/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

echo "uploading the build to artifacts"
declare BUILD_ARTIFACTS_BUCKET="s3://shared-build-artifacts-centrality/${SERVICE_NAME}"
aws s3 cp "/opt/code/build" "${BUILD_ARTIFACTS_BUCKET}/${BUILD_NUMBER}" --recursive --profile shared