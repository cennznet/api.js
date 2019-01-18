#!/bin/bash
###############################################################################
# This script will:
# - configure AWS cli
# - initialize helm on the client side
# - will do helm package and update
###############################################################################

set -ex

: "${SERVICE_NAME:?SERVICE_NAME is required}"

terraform -v
aws --version

rm -rf env
rm -rf ~/.helm/
rm -rf ${SERVICE_NAME}

rm -rf ~/.aws
mkdir ~/.aws

#Create AWSCLI Profiles
/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

mkdir /opt/env

aws s3 cp s3://centrality-k8s-aws-secrets/env/${ENV} /opt/env/${ENV} --recursive --profile shared --region ap-southeast-1

sh /opt/code/centrality.deploy/aws/helm/login.sh

echo "Initialising helm.";
helm init --client-only

mkdir /opt/helm

# Ensure the helm folder name is the same as the chart name.
# Every project needs folder called helm.
if [ "${SERVICE_NAME}" == "arda" ]; then
    cp -R /opt/code/centrality.arda.deploy/helm /opt/helm/${SERVICE_NAME}
else
    cp -R helm /opt/helm/${SERVICE_NAME}
fi

# Lint the Helm template first, so it can fail fast
echo "Checking Helm template for errors ..."
helm --debug lint /opt/helm/${SERVICE_NAME}

helm package /opt/helm/${SERVICE_NAME} \
--version=1.0."${BUILD_NUMBER}" \
--debug

# Create the namespace if it doesn't exit, with a blank secrets file
bash /opt/code/centrality.deploy/aws/helm/namespace-create.sh

# Make sure docker registry secrets are in place
kubectl get secrets registry-secret -o json --namespace default | jq ".metadata = {}" | jq ".metadata.name = \"registry-secret\"" | jq ".metadata.namespace = \"${NAMESPACE}\"" | kubectl apply -f -

# Check release status
releaseStatus=$(helm status ${SERVICE_NAME} --tls \
--tls-ca-cert=/opt/env/${ENV}/.cfssl/ca.pem \
--tls-cert=/opt/env/${ENV}/.cfssl/tiller.pem \
--tls-key=/opt/env/${ENV}/.cfssl/tiller-key.pem -o json | jq ".info.status.code")   

# Delete if Status is not DEPLOYED
if [ $releaseStatus -ne 1 ]; then
    echo "Deleting broken release.."
    helm delete ${SERVICE_NAME} --purge --tls \
        --tls-ca-cert=/opt/env/${ENV}/.cfssl/ca.pem \
        --tls-cert=/opt/env/${ENV}/.cfssl/tiller.pem \
        --tls-key=/opt/env/${ENV}/.cfssl/tiller-key.pem
fi

# Upgrade the package or Install it if not exists
# The order "Values Files" are evaluated:
# - values.yaml is the default
# - Then by a parent chart’s values.yaml
# - Which is overridden by a user-supplied values file, in this case "${ENV}-values.yaml"
# - Which can in turn be overridden by --set parameters.
# - an extra hack to allow for setting a subchart image (for cennznet)
helm upgrade -f /opt/helm/${SERVICE_NAME}/${ENV}-values.yaml ${SERVICE_NAME} ${SERVICE_NAME}-1.0.${BUILD_NUMBER}.tgz \
--install \
--force \
--set namespace=${NAMESPACE} \
--set ${SUBCHART}.image.tag=1.0.${BUILD_NUMBER} \
--wait \
--debug \
--recreate-pods \
--tls \
--tls-ca-cert=/opt/env/${ENV}/.cfssl/ca.pem \
--tls-cert=/opt/env/${ENV}/.cfssl/tiller.pem \
--tls-key=/opt/env/${ENV}/.cfssl/tiller-key.pem

# Delete the previous version
aws s3 rm "s3://shared-centrality-k8s-artifacts/${ENV}/${SERVICE_NAME}/packages/" --recursive --profile shared

# Copy the build package to s3
aws s3 cp ${SERVICE_NAME}-1.0.${BUILD_NUMBER}.tgz "s3://shared-centrality-k8s-artifacts/${ENV}/${SERVICE_NAME}/packages/" --profile shared --region ap-southeast-1
