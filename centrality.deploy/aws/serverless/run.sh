#!/bin/bash
###
# This script will deploy lambda from artifacts
###

set -e 

/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

declare BUILD_ARTIFACTS_BUCKET="s3://shared-build-artifacts-centrality/${SERVICE_NAME}-lambda/${ENV}/${BUILD_NUMBER}"

#copy from shared s3 bucket
aws s3 cp "${BUILD_ARTIFACTS_BUCKET}/serverless" /opt/code/serverless --recursive --profile shared

# copy serverless.yml file
aws s3 cp "${BUILD_ARTIFACTS_BUCKET}/serverless.yml" /opt/code/serverless --profile shared

cd /opt/code/serverless

#Found a bug with serverless, it need bucket name during build and deployment
#serverless deploy runs into serverless direcotry i.e where serverless.yml is present 
#https://github.com/serverless/serverless/issues/5150
#https://github.com/serverless/serverless/issues/4715
serverless deploy --aws-profile "${ENV}" --package /opt/code/serverless