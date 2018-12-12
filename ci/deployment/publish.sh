
#!/bin/bash

set -ex

: "${IMAGE_NAME:?IMAGE_NAME is required}"
: "${GEMFURY_TOKEN:?GEMFURY_TOKEN is required}"

docker run -t --rm \
       --entrypoint bash \
       $IMAGE_NAME \
       -c "./ci/deployment/scripts/publish-centrality.sh"
       GEMFURY_TOKEN=$GEMFURY_TOKEN
