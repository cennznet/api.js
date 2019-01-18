#!/bin/bash
###
# This script will copy files to S3 bucket to there respective enviornment	
###

set -e

declare S3_URL_SERVICES="s3://shared-k8s-state-centrality/${ENV}/${SERVICE_NAME}/services"

aws s3 cp "/opt/code/k8s-config-${ENV}.yml" "${S3_URL_SERVICES}/app.yml"

aws s3 cp "/opt/code/settings/${ENV}-config.yml}" "${S3_URL_SERVICES}/config-map.yml"