#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
set -ex

: "${IMAGE_NAME:?IMAGE_NAME is required}"

docker build -t "${IMAGE_NAME}" \
       --build-arg GEMFURY_TOKEN="$GEMFURY_TOKEN" \
       -f $DIR/Dockerfile .
