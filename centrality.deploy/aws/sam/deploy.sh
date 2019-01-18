#!/bin/bash

set -e
export AWS_PROFILE="${ENV}"

/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

declare BUILD_ARTIFACTS_BUCKET="shared-build-artifacts-centrality"

sam package \
    --template-file /opt/code/template.yaml \
    --output-template-file "${ENV}"-template-output.yaml \
    --s3-bucket "${BUILD_ARTIFACTS_BUCKET}" \
    --s3-prefix "${ENV}/${SERVICE_NAME}" \
    --profile shared 

sam deploy \
    --template-file "${ENV}"-template-output.yaml \
    --stack-name "${SERVICE_NAME}"-lambda \
    --capabilities CAPABILITY_IAM \
    --profile "${ENV}" \
    --region "${DEPLOY_REGION}"