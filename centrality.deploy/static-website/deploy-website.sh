#!/bin/bash
###
# This script will copy files to S3 bucket to there respective enviornment	
###

set -e

declare DEFAULT_DOMAIN
export AWS_PROFILE="${ENV}"

/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

case "${ENV}" in
    dev)
        DEFAULT_DOMAIN="centrality.me"
        ;;
    uat)
        DEFAULT_DOMAIN="centrality.cloud"
        ;;
    prod)
        DEFAULT_DOMAIN="centralityapp.com"
        ;;
    prod-tokyo)
        DEFAULT_DOMAIN="tokyo.centralityapp.com"
        ;;
esac

declare DOMAIN=${CUSTOM_DOMAIN:-${DEFAULT_DOMAIN}}
declare URL="s3://${SUBDOMAIN}.${DOMAIN}"
declare BUILD_ARTIFACTS_BUCKET="s3://shared-build-artifacts-centrality/${SERVICE_NAME}"

PACKAGE_NAMES_ARRAY=$(echo ${PACKAGE_NAMES} | tr " " "\n")

if [[ "${ENV}" == "dev" ]]; then
    aws s3 rm "${URL}/404.html" --profile "${ENV}"
    aws s3 cp "/opt/code/build/404.html" "${URL}/404.html" --profile "${ENV}"

    aws s3 rm "${URL}/index.html" --profile "${ENV}"
    aws s3 cp "/opt/code/build/index.html" "${URL}/index.html" --profile "${ENV}"

    for PACKAGE_NAME in $PACKAGE_NAMES_ARRAY
    do :
        PACKAGE_VERSION=$(grep version ./packages/${PACKAGE_NAME}/package.json |awk '{print($2)}' | sed 's/[",]//g')
        aws s3 rm "${URL}/${PACKAGE_NAME}/${PACKAGE_VERSION}" --recursive --profile "${ENV}"
        aws s3 rm "${URL}/${PACKAGE_NAME}/latest" --recursive --profile "${ENV}"
        aws s3 cp "/opt/code/build/${PACKAGE_NAME}" "${URL}/${PACKAGE_NAME}/${PACKAGE_VERSION}" --recursive --profile "${ENV}"
        aws s3 cp "/opt/code/build/${PACKAGE_NAME}" "${URL}/${PACKAGE_NAME}/latest" --recursive --profile "${ENV}"
    done
fi

if [[ "${ENV}" == "uat" ]]; then 
    #copy from shared s3 bucket to local
    aws s3 cp "${BUILD_ARTIFACTS_BUCKET}/${BUILD_NUMBER}" "/opt/code/shared" --recursive --profile shared
    # Empty the static bucket to upload new files
    aws s3 rm "${URL}" --recursive --profile "${ENV}"
    aws s3 cp "/opt/code/shared" "${URL}" --recursive --profile "${ENV}"
fi

if [[ "${ENV}" == "prod" ]] || [[ "${ENV}" == "prod-tokyo" ]]; then
    aws s3 rm "${URL}/404.html" --profile "${ENV}"
    aws s3 cp "/opt/code/build/404.html" "${URL}/404.html" --profile "${ENV}"
    aws s3 rm "${URL}/index.html" --profile "${ENV}"
    aws s3 cp "/opt/code/build/index.html" "${URL}/index.html" --profile "${ENV}"

    for PACKAGE_NAME in $PACKAGE_NAMES_ARRAY
    do :
        PACKAGE_VERSION=$(grep version ./packages/${PACKAGE_NAME}/package.json |awk '{print($2)}' | sed 's/[",]//g')
            aws s3 cp "${BUILD_ARTIFACTS_BUCKET}/${BUILD_NUMBER}" "/opt/code/shared" --recursive --profile shared
            find "/opt/code/shared" -name '*.map' -delete
            aws s3 rm "${URL}/${PACKAGE_NAME}/${PACKAGE_VERSION}" --recursive --profile "${ENV}"
            aws s3 rm "${URL}/${PACKAGE_NAME}/latest" --recursive --profile "${ENV}"
            aws s3 cp "/opt/code/build/${PACKAGE_NAME}" "${URL}/${PACKAGE_NAME}/${PACKAGE_VERSION}" --recursive --profile "${ENV}"
            aws s3 cp "/opt/code/build/${PACKAGE_NAME}" "${URL}/${PACKAGE_NAME}/latest" --recursive --profile "${ENV}"
    done
fi
