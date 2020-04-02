# Get started

## Test in local

```bash
# Start automation tests with private testnet in local (which is also triggered in circleci build pipeline)
# You can run this command, whenever you made changes in source code (only api.js container is rebuilt, where testnet remains without rebuilding)
./scripts/circleci/run_automation_test.sh -t integration

# Show logs
docker-compose logs -f

# Tear down and clean up testnet dockers (needed to restart automation testnet)
./clearup_testnet.sh

# Clear up docker cache (docker container occupied spaces may increase a lot, this is needed regularly)
docker system prune
```

## Debug inside docker container

```bash
# list all docker containers, and ensure container with name of api_test is running
docker ps -a

# enter inside api_test container
docker exec -it api_test bash
```
