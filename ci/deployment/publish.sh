
#!/bin/bash

set -ex

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

: "${IMAGE_NAME:?IMAGE_NAME is required}"
: "${PUBLISH_IMAGE_NAME:?PUBLISH_IMAGE_NAME is required}"
: "${GEMFURY_TOKEN:?GEMFURY_TOKEN is required}"
: "${GEMFURY_EXTERNAL_TOKEN:?GEMFURY_EXTERNAL_TOKEN is required}"
: "${GIT_NAME:?GIT_NAME is required}"
: "${GIT_EMAIL:?GIT_EMAIL is required}"


docker build \
  -t "$PUBLISH_IMAGE_NAME" \
  --build-arg GIT_NAME="$GIT_NAME" \
  --build-arg GIT_EMAIL="$GIT_EMAIL" \
  --build-arg IMAGE_NAME="$IMAGE_NAME" \
  --build-arg GEMFURY_TOKEN="$GEMFURY_TOKEN" \
  --build-arg GEMFURY_EXTERNAL_TOKEN="$GEMFURY_EXTERNAL_TOKEN" \
  -f $DIR/ci/deployment/Dockerfile .
