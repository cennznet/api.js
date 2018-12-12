#!/usr/bin/env bash

NEW_SSH_RSA_FILE_PATH=~/.ssh/id_rsa

# dir holding this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# prevent jenkins rebuild
LAST_COMMIT_AUTHOR=$(git log -1 --pretty=format:'%an');

if [ "$LAST_COMMIT_AUTHOR" = "$GIT_NAME" ]; then
  echo "Terminating build started by Jenkins Git push";
  exit 0;
fi

# set shell to verbose, instant exit mode
set -ex

# Required Environment variables. Set them by using the commands below
: "${IMAGE_NAME:?IMAGE_NAME environment variable is required}"
: "${GIT_NAME:?GIT_NAME environment variable is required}"
: "${GIT_EMAIL:?GIT_EMAIL environment variable is required}"
: "${GIT_BRANCH:?GIT_BRANCH environment variable is required}"

cp $NEW_SSH_RSA_FILE_PATH ./git-ssh-key

docker build \
  -t "$IMAGE_NAME" \
  --build-arg GIT_NAME="$GIT_NAME" \
  --build-arg GIT_EMAIL="$GIT_EMAIL" \
  --build-arg GIT_BRANCH="$GIT_BRANCH" \
  -f $DIR/../pr/Dockerfile .
