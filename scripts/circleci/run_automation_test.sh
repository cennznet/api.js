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

if [ -z "$(docker network ls | grep "apijs_default" | awk '/ / { print $2 }')" ]; then
  docker network create --driver bridge apijs_default
fi

docker-compose up -d --build

# checkout scripts/api_test_docker_entrypoint.sh for more options, like:
# docker-compose run api_test integration
# docker-compose run api_test e2e
# docker-compose run api_test yarn test
docker-compose run --rm api_test ${t}
