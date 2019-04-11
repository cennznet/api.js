#!/usr/bin/env bash

# dir holding this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Required Environment variables. Set them by using the commands below
: "${GEMFURY_TOKEN:?GEMFURY_TOKEN environment variable is required}"

NEW_SSH_RSA_FILE_PATH=~/.ssh/id_rsa

# prevent jenkins rebuild
LAST_COMMIT_AUTHOR=$(git log -1 --pretty=format:'%an');

if [ "$LAST_COMMIT_AUTHOR" = "$GIT_NAME" ]; then
  echo "Terminating build started by Jenkins Git push";
  exit 0;
fi

# set shell to verbose, instant exit mode
set -ex

cp $NEW_SSH_RSA_FILE_PATH ./git-ssh-key

docker build \
  -t "$IMAGE_NAME" \
  --build-arg GEMFURY_TOKEN="$GEMFURY_TOKEN" \
  -f $DIR/../pr/Dockerfile .
