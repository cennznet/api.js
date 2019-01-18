#!/bin/bash
###
# This deployment script will run docker container and execute deploy script
# inside. Docker container has awscli, kubectl, helm installed.
###

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${ENV:?ENV is required}"
: "${AWS_CLUSTER_URL:?AWS_CLUSTER_URL is required}"
: "${JENKINS_AWS_K8S_CERTIFICATE:?JENKINS_AWS_K8S_CERTIFICATE is required}"
: "${JENKINS_AWS_K8S_KEY:?JENKINS_AWS_K8S_KEY is required}"
: "${JENKINS_AWS_K8S_CA:?JENKINS_AWS_K8S_CA is required}"
: "${SERVICE_NAME:?SERVICE_NAME is required}"
: "${AWS_SECRET_KEY:?AWS_SECRET_KEY is required}"
: "${AWS_ACCESS_KEY:?AWS_ACCESS_KEY is required}"
: "${NAMESPACE:?NAMESPACE is required}"

declare CONTAINER=${CONTAINER:-"k8s-aws-terraform:1.0.20"}
declare SCRIPT=${SCRIPT:-"helm"}

rm -rf centrality.deploy/aws/.cfssl
mkdir centrality.deploy/aws/.cfssl
cat "${JENKINS_AWS_K8S_CERTIFICATE}" > centrality.deploy/aws/.cfssl/jenkins.pem
cat "${JENKINS_AWS_K8S_KEY}" > centrality.deploy/aws/.cfssl/jenkins-key.pem
cat "${JENKINS_AWS_K8S_CA}" > centrality.deploy/aws/.cfssl/ca.pem

docker run -t --rm \
       -v "$(pwd):/opt/code/" \
       -v "${AWS_KUBERNETES_KEY}":/root/.ssh/id_rsa \
       -e NAMESPACE="${NAMESPACE}" \
       -e AWS_ACCESS_KEY="${AWS_ACCESS_KEY}" \
       -e AWS_SECRET_KEY="${AWS_SECRET_KEY}" \
       -e BUILD_NUMBER="${BUILD_NUMBER}" \
       -e AWS_CLUSTER_URL="${AWS_CLUSTER_URL}" \
       -e AWS_CLUSTER_NAME="${AWS_CLUSTER_NAME}" \
       -e ENV="${ENV}" \
       -e SERVICE_NAME="${SERVICE_NAME}" \
       -e SUBCHART="${SUBCHART}" \
       --entrypoint="bash" \
       centralitycontainerregistry-on.azurecr.io/centrality/${CONTAINER} \
       "/opt/code/centrality.deploy/aws/helm/${SCRIPT}-apply.sh"
