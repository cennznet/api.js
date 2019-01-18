#!/bin/bash
###
# Script that will login to the azure cli as service principal
###

set -e

: "${AWS_CLUSTER_URL:?AWS_CLUSTER_URL is required}"

function displayError {
    echo "Login failed!"
}

kubectl config set-cluster cluster-"${AWS_CLUSTER_NAME}" \
  --embed-certs=true \
  --server=https://${AWS_CLUSTER_URL} \
  --certificate-authority=/opt/code/centrality.deploy/aws/.cfssl/ca.pem

kubectl config set-context "${AWS_CLUSTER_NAME}"\
  --cluster=cluster-"${AWS_CLUSTER_NAME}" \
  --user=jenkins

kubectl config set-credentials jenkins --client-certificate=/opt/code/centrality.deploy/aws/.cfssl/jenkins.pem --client-key=/opt/code/centrality.deploy/aws/.cfssl/jenkins-key.pem

kubectl config use-context "${AWS_CLUSTER_NAME}"

kubectl get nodes
# Reducing amount of output from login command

echo "Login successful"

# change to correct subscription