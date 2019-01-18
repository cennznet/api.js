#!/bin/bash
###
# Script that will automatically apply configuration changes at deploy time
###

declare -r service="${SERVICE_NAME}"
declare -r env="${ENV}"
declare -r config_filename="${CONFIG_FILENAME:-appsettings.json}"

# login to cluster
bash /opt/code/centrality.deploy/aws/everest/login.sh

 
cd /opt/code/settings


kubectl delete configmap "${service}-settings"  --namespace=${NAMESPACE}

kubectl get configmaps --namespace=${NAMESPACE}


kubectl create configmap "${service}-settings" --from-file="${config_filename}"="${env}-${service}-settings.json" --namespace=${NAMESPACE}