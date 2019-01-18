#!/bin/bash
###
# Script that will execute all necessary steps to log in to azure and prepare
# environments to run kubernetes commands
##

set -e

# install kubectl
az acs kubernetes install-cli

# login to azure as service principal
/opt/code/centrality.deploy/login.sh

# get kubernetes credentials
# this command relies on id_rsa to be private part of ssh key that is uploaded
# to k8s we define ssh key when we create cluster. In this case we reference
# kubernetes_rsa key uploaded to the jenkins and mapped via docker volume to the
# correct place (~/.ssh/id_rsa).
az aks get-credentials --resource-group=AKS_MainSaleOnly --name=aks-mainsale
