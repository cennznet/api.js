#!/bin/bash
###
# Script that will automatically apply configuration changes at deploy time
###

declare -r service="${SERVICE_NAME}"
declare -r env="${ENV}"
declare -r config_filename="${CONFIG_FILENAME:-appsettings.json}"
declare SERVICE_SETTINGS_NAME="${service}-settings"
declare BUCKET_NAME="s3://shared-centrality-k8s-artifacts/${ENV}/${SERVICE_NAME}"

# login to cluster
bash /opt/code/centrality.deploy/aws/helm/login.sh

# Create the namespace if it doesn't exit, with a blank secrets file
bash /opt/code/centrality.deploy/aws/helm/namespace-create.sh

#Create AWSCLI Profiles
/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

cd /opt/code/settings

kubectl delete configmap "${SERVICE_SETTINGS_NAME}"  --namespace="${NAMESPACE}"
kubectl get configmaps --namespace="${NAMESPACE}"

SOURCE_APPSETTINGS="${env}-${SERVICE_SETTINGS_NAME}.json"
if [ ! -f ${SOURCE_APPSETTINGS} ]; then
  echo "Creating and empty appsettings.json"
  echo "{}" > ${SOURCE_APPSETTINGS}
fi
kubectl create configmap "${SERVICE_SETTINGS_NAME}" --from-file="${config_filename}"="${SOURCE_APPSETTINGS}" --namespace="${NAMESPACE}"


# copy to s3 bucket
kubectl get configmaps "${SERVICE_SETTINGS_NAME}" -o json --namespace=${NAMESPACE} | jq ".metadata = {}" | jq ".metadata.name = \"${SERVICE_SETTINGS_NAME}\"" | jq ".metadata.namespace = \"${NAMESPACE}\"" > "${SERVICE_SETTINGS_NAME}".json

#Empty bucket
aws s3 rm "${BUCKET_NAME}/configmap" --recursive --profile shared
 
#upload newer version
aws s3 cp ${SERVICE_SETTINGS_NAME}.json "${BUCKET_NAME}/configmaps/" --profile shared --region ap-southeast-1
