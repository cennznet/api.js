#!/bin/bash
#
# Create k8s deployment artefacts.
# All operations are peformed in the target namespace set by $NAMESPACE/$APP_ID
#
# Invoked by kubectl container via Jenkins
#
set -ex

bash /opt/code/centrality.deploy/aws/login.sh

CONFIG_DIR="/mnt/plug-config"
ls -al "$CONFIG_DIR/nodes"

# Ensure we're deploying to configured, non-default namespace
echo "Try create k8s namespace: $NAMESPACE"
kubectl create namespace $NAMESPACE || true
echo "Using k8s namespace: $NAMESPACE"
echo "Service name is: $SERVICE_NAME"

PLUG_STORAGE="$SERVICE_NAME-storage"
PLUG_CONFIG="$SERVICE_NAME"
PLUG_NODE_CONFIG="$SERVICE_NAME-node"


# if storage doesn't exist, upload the generated storage and keys
if ! kubectl get secret -n $NAMESPACE $PLUG_STORAGE; then
  kubectl create secret generic -n $NAMESPACE $PLUG_STORAGE --from-file="$CONFIG_DIR/nodes/node_0/storage"
  for dir in $CONFIG_DIR/nodes/*
    do
      base=$(basename "$dir")
      echo "Uploading the private and public keys for ($base) in directory $dir"
      kubectl create secret generic -n $NAMESPACE ${base/node_/$SERVICE_NAME-} --from-file="$dir/id_ed25519" --from-file="$dir/id_ed25519.pub"
    done
fi

# Create docker registry secret for ACR in the target namespace if it doesn't exist
# This allows k8s to pull built images from the ACR.
(kubectl get secret registry-secret -o yaml | sed -e 's/namespace: .*/namespace: "'$NAMESPACE'"/g' | kubectl create -f -) || true

# (Re)create the plug config map from config.yaml
kubectl -n $NAMESPACE create configmap $PLUG_CONFIG --from-file="$CONFIG_DIR/config.yaml" -o yaml --dry-run | kubectl -n $NAMESPACE replace -f - ||\
kubectl -n $NAMESPACE create configmap $PLUG_CONFIG --from-file="$CONFIG_DIR/config.yaml"

# (Re)create the plug node config map from the "generic" config.yaml
kubectl -n $NAMESPACE create configmap $PLUG_NODE_CONFIG --from-file="$CONFIG_DIR/nodes/node_0/config.yaml" -o yaml --dry-run | kubectl -n $NAMESPACE replace -f - ||\
kubectl -n $NAMESPACE create configmap $PLUG_NODE_CONFIG --from-file="$CONFIG_DIR/nodes/node_0/config.yaml"
