#!/bin/bash

set -e

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${AWS_CLUSTER_URL:?AWS_CLUSTER_URL is required}"
: "${ENV:?ENV is required}"

# setup environment
sh /opt/code/centrality.deploy/aws/helm/login.sh

# Create the namespace if it doesn't exit, with a blank secrets file
bash /opt/code/centrality.deploy/aws/helm/namespace-create.sh

# run correct image
sed -i "s/<number>/${BUILD_NUMBER}/g" /opt/code/migrations-config.yml

# Start migrations Job
kubectl apply -f /opt/code/migrations-config.yml --namespace "${NAMESPACE}"
sleep 15

kubectl describe pod "${SERVICE_NAME}-migrations" --namespace "${NAMESPACE}"
sleep 120

kubectl describe pod "${SERVICE_NAME}-migrations" --namespace "${NAMESPACE}"
sleep 30

kubectl describe pod "${SERVICE_NAME}-migrations" --namespace "${NAMESPACE}"
sleep 30

kubectl logs "pod/${SERVICE_NAME}-migrations" --namespace "${NAMESPACE}"

kubectl delete -f /opt/code/migrations-config.yml --namespace "${NAMESPACE}"
