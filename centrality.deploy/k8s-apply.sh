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
: "${CLUSTER_URL:?CLUSTER_URL is required}"
: "${ENV:?ENV is required}"
[[ -f "/opt/code/k8s-config.yml" ]]

# setup environment
/opt/code/centrality.deploy/setup.kubectl.sh

# Set correct env prefix
if [[ "${ENV}" == "prod" ]]; then
    ENV_PREFIX=""
else
    ENV_PREFIX="${ENV}-"
fi

#copy k8s to different file per environment
cp /opt/code/k8s-config.yml "/opt/code/k8s-config-${ENV}.yml"

sed -i "s/<number>/${BUILD_NUMBER}/g" "/opt/code/k8s-config-${ENV}.yml"
sed -i "s/<env>/${ENV}/g" "/opt/code/k8s-config-${ENV}.yml"
sed -i "s/<env_prefix>/${ENV_PREFIX}/g" "/opt/code/k8s-config-${ENV}.yml"
sed -i "s/<service_name>/${SERVICE_NAME}/g" "/opt/code/k8s-config-${ENV}.yml"
sed -i "s/<app_name>/${APP_NAME}/g" "/opt/code/k8s-config-${ENV}.yml"
sed -i "s/<sceneName>/${SCENE_NAME}/g" "/opt/code/k8s-config-${ENV}.yml"
sed -i "s%<coininvestor_domain>%${COININVESTOR_DOMAIN}%g" "opt/code/k8s-config-${ENV}.yml"

# apply current confing
kubectl apply -f "/opt/code/k8s-config-${ENV}.yml" --record
