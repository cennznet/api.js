#!/bin/bash
###
# Script that will automatically apply configuration changes at deploy time
###

declare -r service="${SERVICE_NAME}"
declare -r env="${ENV}"

# setup environment
/opt/code/centrality.deploy/setup.kubectl.sh

cd /opt/code/settings

kubectl apply -f "${env}-${service}"-config.yaml
