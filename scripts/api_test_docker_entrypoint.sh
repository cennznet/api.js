#!/bin/bash
# $0 is a script name,
# $1, $2, $3 etc are passed arguments
# $1 is our command
CMD=$1

# docker-compose run api_test integration
# docker-compose run api_test e2e
# docker-compose run api_test yarn test
case "$CMD" in
"integration")
  echo "Start integration tests"
  export NODE_ENV=development
  exec yarn test:integration
  exec tail -f /dev/null
  ;;

"e2e")
  echo "Start e2e tests"
  exec yarn test:e2e
  ;;

*)
  exec $CMD ${@:2}
  ;;
esac
