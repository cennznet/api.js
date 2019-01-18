#!/bin/bash

SECRETS_NAME="${SERVICE_NAME}-secrets"
BLANK_SECRET_FN="blank-secret.json"

# Ensure namespace exists first
if kubectl get namespace "${NAMESPACE}" > /dev/null
then
    echo "Namespace ${NAMESPACE} is already there."
else
    kubectl create namespace "${NAMESPACE}"
fi

# Create secrets if it doens't exist. This satisfies the case where the
# namespace may already exist but a new service doesn't have secrets yet.
if kubectl get secrets "${SECRETS_NAME}" --namespace="${NAMESPACE}" > /dev/null
then
    echo "${SECRETS_NAME} already exists" 
    kubectl get secrets --namespace=${NAMESPACE}
else
    echo '{"remember_to_set_secrets_with": "kubectl create secret generic <NAMESPACE>-<SERVICE>-secrets --from-file=secrets.json=secrets_<NAMESPACE>_<ENV>.json --namespace <NAMESPACE>"}' > ${BLANK_SECRET_FN}
    cat ${BLANK_SECRET_FN}
    kubectl create secret generic "${SECRETS_NAME}" --from-file=secrets.json="${BLANK_SECRET_FN}" --namespace="${NAMESPACE}"
    rm ${BLANK_SECRET_FN}
    kubectl get secrets --namespace="${NAMESPACE}"
fi
