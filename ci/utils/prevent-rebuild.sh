: "${GIT_NAME:?GIT_NAME environment variable is required}"

# prevent jenkins rebuild

LAST_COMMIT_AUTHOR=$(git log -1 --pretty=format:'%an');

if [ "$LAST_COMMIT_AUTHOR" = "$GIT_NAME" ]; then
  echo "Terminating build started by Jenkins Git push";
  exit 0;
fi