#!/bin/bash

# https://stackoverflow.com/questions/16483119/an-example-of-how-to-use-getopts-in-bash

set -ex

# usage sample:
# ./scripts/circleci/run_automation_test.sh -t integration
# ./scripts/circleci/run_automation_test.sh -t e2e
usage() {
  echo "Usage: $0 [-t <integration|e2e>]" 1>&2
  exit 1
}

while getopts ":t:" o; do
  case "${o}" in
  t)
    t=${OPTARG}
    ((t == "integration" || t == "e2e")) || usage
    ;;
  *)
    usage
    ;;
  esac
done
shift $((OPTIND - 1))

if [ -z "${t}" ]; then
  usage
fi

if [ -z "$(docker network ls | grep "standalone" | awk '/ / { print $2 }')" ]; then
  docker network create --driver bridge standalone
fi

docker-compose up -d --build

docker run $(docker ps -a | grep "apijs_e2e" | awk '/ / { print $2 }') yarn test:${t}
