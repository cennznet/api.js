#!/bin/bash
###
# Script that logs into azure and kubernetes and applys migrations configuration.
# After migrations are ran, we remove the job and print if job exites successfully
# or if job failed.
###

set -e

declare exitCode=0

: "${BUILD_NUMBER:?BUILD_NUMBER is required}"
: "${CLUSTER_URL:?CLUSTER_URL is required}"
: "${ENV:?ENV is required}"
[[ -f "/opt/code/k8s-config.yml" ]]

# setup environment
/opt/code/centrality.deploy/setup.kubectl.sh

# Set correct env prefix
if [[ "${ENV}" == "prod" ]]; then
    ENV_PREFIX=""
else
    ENV_PREFIX="${ENV}-c"
fi

sed -i "s/<number>/${BUILD_NUMBER}/g" /opt/code/migrations-config.yml
sed -i "s/<env>/${ENV}/g" /opt/code/migrations-config.yml
sed -i "s/<env_prefix>/${ENV_PREFIX}/g" /opt/code/migrations-config.yml

# Start migrations Job
kubectl apply -f /opt/code/migrations-config.yml
sleep 15

kubectl describe pod "${SERVICE_NAME}-migrations"

sleep 120

kubectl describe pod "${SERVICE_NAME}-migrations"

sleep 30

kubectl describe pod "${SERVICE_NAME}-migrations"

sleep 30

kubectl logs "pod/${SERVICE_NAME}-migrations"

kubectl delete -f /opt/code/migrations-config.yml
# set +e

# # command that runs every second (-n1) end exists when job stops running
# watch -n1 -g 'kubectl describe jobs/pi | grep -m 1 "1 Running"'

# kubectl describe "jobs/${SERVICE_NAME}-migrations" | tee job.summary.log

# cat job.summary.log | grep "0 Running / 1 Succeeded / 0 Failed"

# if [[ $? -ne 0 ]]; then
#    echo "Migrations were not successfull"
#    exitCode=1
# fi

# set -e

# # clean up job
# # kubectl delete -f /opt/code/migrations-config.yml

# exit $exitCode
