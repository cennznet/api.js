#!/bin/bash
#
# This script will run a docker container with `kubectl` to create k8s resources.
# Invoked by Jenkins pipeline.
#
set -e

: "${AWS_CLUSTER_URL:?AWS_CLUSTER_URL is required}"
: "${JENKINS_AWS_K8S_CERTIFICATE:?JENKINS_AWS_K8S_CERTIFICATE is required}"
: "${JENKINS_AWS_K8S_KEY:?JENKINS_AWS_K8S_KEY is required}"
: "${JENKINS_AWS_K8S_CA:?JENKINS_AWS_K8S_CA is required}"

# Dump jenkins keys to local files during Pipeline build
rm -rf centrality.deploy/aws/.cfssl
mkdir centrality.deploy/aws/.cfssl
cat "${JENKINS_AWS_K8S_CERTIFICATE}" > centrality.deploy/aws/.cfssl/jenkins.pem
cat "${JENKINS_AWS_K8S_KEY}" > centrality.deploy/aws/.cfssl/jenkins-key.pem
cat "${JENKINS_AWS_K8S_CA}" > centrality.deploy/aws/.cfssl/ca.pem

# create a volume to share config between containers
CONFIG_VOLUME="$SERVICE_NAME-config"

docker volume rm $CONFIG_VOLUME && docker volume create $CONFIG_VOLUME || docker volume create $CONFIG_VOLUME
docker volume inspect $CONFIG_VOLUME

# Get plug network size from helm chart values
PLUG_NETWORK_SIZE="$(grep Nodes ./helm/values.yaml | cut -d ' ' -f2)"

# override Node value per environment
PLUG_NETWORK_SIZE_ENV="$(grep Nodes ./helm/${AWS_CLUSTER_NAME}-values.yaml | cut -d ' ' -f2)"
if [ -n "$PLUG_NETWORK_SIZE_ENV" ]; then
    echo "PLUG_NETWORK_SIZE_ENV is not empty"
    PLUG_NETWORK_SIZE=$PLUG_NETWORK_SIZE_ENV
fi

echo "PLUG_NETWORK_SIZE is: $PLUG_NETWORK_SIZE"

# Run built plug container to generate config
docker run -t --rm \
       -v "$(pwd):/opt/code" \
       -v $CONFIG_VOLUME:/srv/plug \
       -e PLUG_NETWORK_SIZE="${PLUG_NETWORK_SIZE}" \
       -e NAMESPACE="${NAMESPACE}" \
       -e SERVICE_NAME="${SERVICE_NAME}" \
       --entrypoint="bash" \
       $IMAGE_NAME \
       "/opt/code/centrality.deploy/aws/plug/init-config.sh"

# Upload the generated plug config to K8s
docker run -t --rm \
       -v "$(pwd):/opt/code" \
       -v $CONFIG_VOLUME:/mnt/plug-config \
       -v "${AWS_KUBERNETES_KEY}":/root/.ssh/id_rsa \
       -e BUILD_NUMBER="${BUILD_NUMBER}" \
       -e AWS_CLUSTER_URL="${AWS_CLUSTER_URL}" \
       -e AWS_CLUSTER_NAME="${AWS_CLUSTER_NAME}" \
       -e AWS_ACCESS_KEY="${AWS_ACCESS_KEY}" \
       -e AWS_SECRET_KEY="${AWS_SECRET_KEY}" \
       -e NAMESPACE="${NAMESPACE}" \
       -e SERVICE_NAME="${SERVICE_NAME}" \
       -e PLUG_NETWORK_SIZE="${PLUG_NETWORK_SIZE}" \
       -e SERVICE_NAME="${SERVICE_NAME}" \
       --entrypoint="bash" \
       centralitycontainerregistry-on.azurecr.io/centrality/k8s-aws-terraform:1.0.12 \
       "/opt/code/centrality.deploy/aws/plug/upload-config.sh"

# remove shared volume
docker volume rm $CONFIG_VOLUME
