#!/bin/bash
###
# This script will configure aws cli, initialize helm on the client side, will do helm package and update
###

#!/bin/bash
set -ex
 
: "${SERVICE_NAME:?SERVICE_NAME is required}"

terraform -v
aws --version

rm -rf ~/.aws
rm -rf env
rm -rf ~/.helm/
rm -rf ${SERVICE_NAME}
mkdir ~/.aws

cat > ~/.aws/credentials <<- EOF
[default]
aws_access_key_id = $AWS_ACCESS_KEY
aws_secret_access_key = $AWS_SECRET_KEY
EOF

cat > ~/.aws/config <<- EOF
[default]
region = ap-southeast-1
output = json

[profile dev]
output = json
source_profile = default
role_arn = arn:aws:iam::710426149098:role/OrganizationAccountAccessRoleTerraform

[profile uat]
output = json
source_profile = default
role_arn = arn:aws:iam::532485325768:role/OrganizationAccountAccessRoleTerraform

[profile prod]
output = json
source_profile = default
role_arn = arn:aws:iam::901020165465:role/OrganizationAccountAccessRoleTerraform

[profile shared]
region = ap-southeast-1
output = json
source_profile = default
role_arn = arn:aws:iam::264739579343:role/OrganizationAccountAccessRoleTerraform
EOF

mkdir /opt/env

aws s3 cp s3://everest-k8s-aws-secrets/env/${ENV} /opt/env/${ENV} --recursive --profile shared --region ap-southeast-1

sh /opt/code/centrality.deploy/aws/everest/login.sh

echo "Initialising helm.";

helm init --client-only

# every project needs folder called helm
mkdir /opt/helm
cp -R helm /opt/helm/"${SERVICE_NAME}"

helm package /opt/helm/${SERVICE_NAME} \
--version=1.0.${BUILD_NUMBER} \
--debug

# Making sure namespace exists before
kubectl get namespace "${NAMESPACE}" && echo "Namespace is OK" || kubectl create namespace "${NAMESPACE}"

# make sure default ssl certs and docker registry secrets are in place
kubectl get secrets default-tls-certificate -o json --namespace default | jq ".metadata = {}" | jq ".metadata.name = \"default-tls-certificate\"" | jq ".metadata.namespace = \"${NAMESPACE}\"" | kubectl apply -f -
kubectl get secrets registry-secret -o json --namespace default | jq ".metadata = {}" | jq ".metadata.name = \"registry-secret\"" | jq ".metadata.namespace = \"${NAMESPACE}\"" | kubectl apply -f -

helm upgrade -f /opt/helm/${SERVICE_NAME}/${ENV}-values.yaml ${SERVICE_NAME} ${SERVICE_NAME}-1.0.${BUILD_NUMBER}.tgz \
--install \
--force \
--set namespace=${NAMESPACE} \
--wait \
--debug \
--tls \
--tls-ca-cert=/opt/env/${ENV}/.cfssl/ca.pem \
--tls-cert=/opt/env/${ENV}/.cfssl/tiller.pem \
--tls-key=/opt/env/${ENV}/.cfssl/tiller-key.pem
