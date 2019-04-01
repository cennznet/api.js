#!/usr/bin/env bash

# dir holding this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Required Environment variables. Set them by using the commands below
: "${PUBLISH_IMAGE_NAME:?PUBLISH_IMAGE_NAME is required}"
: "${GEMFURY_TOKEN:?GEMFURY_TOKEN is required}"
: "${GEMFURY_EXTERNAL_TOKEN:?GEMFURY_EXTERNAL_TOKEN is required}"
: "${IMAGE_NAME:?IMAGE_NAME environment variable is required}"
: "${GIT_NAME:?GIT_NAME environment variable is required}"
: "${GIT_EMAIL:?GIT_EMAIL environment variable is required}"

# set shell to verbose, instant exit mode
set -ex

docker build \
  -t "$PUBLISH_IMAGE_NAME" \
  --build-arg GIT_NAME="$GIT_NAME" \
  --build-arg GIT_EMAIL="$GIT_EMAIL" \
  --build-arg IMAGE_NAME="$IMAGE_NAME" \
  --build-arg GEMFURY_TOKEN="$GEMFURY_TOKEN" \
  --build-arg GEMFURY_EXTERNAL_TOKEN="$GEMFURY_EXTERNAL_TOKEN" \
  -f $DIR/DockerfileToPublish .