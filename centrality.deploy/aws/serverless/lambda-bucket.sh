#!/bin/bash
###
# This script will copy files to S3 bucket fir lambda
###

set -e

export AWS_PROFILE="${ENV}"

/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

declare BUILD_ARTIFACTS_BUCKET="s3://shared-build-artifacts-centrality/${SERVICE_NAME}-lambda/${ENV}"

aws s3 cp "/opt/code/.serverless" "${BUILD_ARTIFACTS_BUCKET}/${BUILD_NUMBER}/serverless" --recursive --profile shared

# reason we have two serverless file: serverless.yml containes plugin dependency and another is serverless-deploy.yaml
# which does not contain any plugin dependency. 
# If we use serverless.yml we need to reinstall everything again.
# We have variable - INTERNAL_DEPLOY_PATH because some of our project deploy lambda within a project such paycheck 
if [[ "${INTERNAL_DEPLOY_PATH}" ]]; then
    aws s3 cp "/opt/code/${INTERNAL_DEPLOY_PATH}/serverless-deploy.yml" "${BUILD_ARTIFACTS_BUCKET}/${BUILD_NUMBER}/serverless.yml" --profile shared
else
    aws s3 cp "/opt/code/serverless-deploy.yml" "${BUILD_ARTIFACTS_BUCKET}/${BUILD_NUMBER}/serverless.yml" --profile shared
fi
