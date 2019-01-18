#!/bin/bash
###
# Script that will automatically apply configuration changes at deploy time
###

declare -r service="${SERVICE_NAME}"
declare -r env="${ENV}"
declare -r config_filename="${CONFIG_FILENAME:-config.js}"

# login to cluster
sh /opt/code/centrality.deploy/aws/everest/login.sh

cd /opt/code/settings

kubectl delete configmap "${service}-settings" --namespace=${NAMESPACE}
kubectl create configmap "${service}-settings" --from-file="${config_filename}"="${env}-${service}-config.js"  --namespace=${NAMESPACE}
