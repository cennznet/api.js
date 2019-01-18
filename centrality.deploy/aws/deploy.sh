#!/bin/bash
###
# This deployment script will run docker container and execute deploy script
# inside. Docker container has kubectl installed and deploy script needs it.
###

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${ENV:?ENV is required}"
: "${AWS_CLUSTER_URL:?AWS_CLUSTER_URL is required}"
: "${JENKINS_AWS_K8S_CERTIFICATE:?JENKINS_AWS_K8S_CERTIFICATE is required}"
: "${JENKINS_AWS_K8S_KEY:?JENKINS_AWS_K8S_KEY is required}"
: "${JENKINS_AWS_K8S_CA:?JENKINS_AWS_K8S_CA is required}"
[[ -f "./k8s-aws-config.yml" ]]

rm -rf centrality.deploy/aws/.cfssl
mkdir centrality.deploy/aws/.cfssl
cat "${JENKINS_AWS_K8S_CERTIFICATE}" > centrality.deploy/aws/.cfssl/jenkins.pem
cat "${JENKINS_AWS_K8S_KEY}" > centrality.deploy/aws/.cfssl/jenkins-key.pem
cat "${JENKINS_AWS_K8S_CA}" > centrality.deploy/aws/.cfssl/ca.pem

declare SCRIPT=${SCRIPT:-"k8s"}

docker run -t --rm \
       -v "$(pwd):/opt/code/" \
       -v "${AWS_KUBERNETES_KEY}":/root/.ssh/id_rsa \
       -e BUILD_NUMBER="${BUILD_NUMBER}" \
       -e AWS_CLUSTER_URL="${AWS_CLUSTER_URL}" \
       -e AWS_CLUSTER_NAME="${AWS_CLUSTER_NAME}" \
       -e ENV="${ENV}" \
       -e SERVICE_NAME="${SERVICE_NAME}" \
       --entrypoint="sh" \
       lachlanevenson/k8s-kubectl:v1.9.6 \
       "/opt/code/centrality.deploy/aws/${SCRIPT}-apply.sh"