
#!/bin/bash

set -ex

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

: "${IMAGE_NAME:?IMAGE_NAME is required}"
: "${PUBLISH_IMAGE_NAME:?PUBLISH_IMAGE_NAME is required}"
: "${GEMFURY_TOKEN:?GEMFURY_TOKEN is required}"
: "${GIT_NAME:?GIT_NAME is required}"
: "${GIT_EMAIL:?GIT_EMAIL is required}"
: "${GIT_BRANCH:?GIT_BRANCH is required}"
: "${RELEASE_TYPE:?RELEASE_TYPE is required}"


docker build \
  -t "$PUBLISH_IMAGE_NAME" \
  --build-arg GIT_NAME="$GIT_NAME" \
  --build-arg GIT_EMAIL="$GIT_EMAIL" \
  --build-arg GIT_BRANCH="$GIT_BRANCH" \
  --build-arg IMAGE_NAME="$IMAGE_NAME" \
  --build-arg GEMFURY_TOKEN="$GEMFURY_TOKEN" \
  --build-arg RELEASE_TYPE="$RELEASE_TYPE" \
  -f $DIR/ci/deployment/Dockerfile .
