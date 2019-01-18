#!/bin/bash
###
# Script that will login to the azure cli as service principal
###

set -e

: "${SERVICE_PRINCIPAL_USR:?SERVICE_PRINCIPAL_USR is required}"
: "${SERVICE_PRINCIPAL_PSW:?SERVICE_PRINCIPAL_PSW is required}"
: "${TENANT:?TENANT is required}"
: "${SUBSCRIPTION_ID:?SUBSCIPTION_ID is required}"

function displayError {
    echo "Login failed!"
}

trap displayError ERR

# Reducing amount of output from login command
az login --service-principal -u "${SERVICE_PRINCIPAL_USR}" -p "${SERVICE_PRINCIPAL_PSW}" --tenant "${TENANT}" > /dev/null

echo "Login successful"

# change to correct subscription
az account set --subscription "${SUBSCRIPTION_ID}"
