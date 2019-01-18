#!/bin/bash
###
# Script logs into kubectl and applys k8s config
# Replaces <number> field in config with current build number.
# Replaces <env> filed in config with current environment
# Replaces <env_prefix> in config with current env prefix
# Replaces <service_name> in config with current service name
# Replaces <app_name> in config with current app_name parameter
###

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${AWS_CLUSTER_URL:?AWS_CLUSTER_URL is required}"
: "${ENV:?ENV is required}"

# setup environment
sh /opt/code/centrality.deploy/aws/login.sh

# Set correct env prefix
if [[ "${ENV}" == "prod" ]]; then
    ENV_PREFIX=""
else
    ENV_PREFIX="${ENV}-"
fi

ls -al /opt/code/

# apply current confing
kubectl apply -f "/opt/code/deploy" --record