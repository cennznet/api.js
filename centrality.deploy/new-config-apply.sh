#!/bin/bash
###
# Script that will automatically apply configuration changes at deploy time
###

declare -r service="${SERVICE_NAME}"
declare -r env="${ENV}"
declare -r config_filename="${CONFIG_FILENAME:-appsettings.json}"

# setup environment
/opt/code/centrality.deploy/custom/mainsale.kubectl.sh

cd /opt/code/settings

if [ "${TYPE}" == "migrations" ]; then
    kubectl delete configmap "${service}-migrations-settings"
    kubectl create configmap "${service}-migrations-settings" --from-file="${config_filename}"="${env}-${service}-migrations-settings.json"
fi;

kubectl delete configmap "${service}-settings"
kubectl create configmap "${service}-settings" --from-file="${config_filename}"="${env}-${service}-settings.json"

