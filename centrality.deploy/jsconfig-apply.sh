#!/bin/bash
###
# Script that will automatically apply configuration changes at deploy time
###

declare -r service="${SERVICE_NAME}"
declare -r env="${ENV}"
declare -r config_filename="${CONFIG_FILENAME:-config.js}"

# setup environment
/opt/code/centrality.deploy/setup.kubectl.sh

cd /opt/code/settings

kubectl delete configmap "${service}-config"
kubectl create configmap "${service}-config" --from-file="${config_filename}"="${env}-${service}-config.js"
