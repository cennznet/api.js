#!/bin/bash

set -ex

curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` > ~/docker-compose
  chmod +x ~/docker-compose
  sudo mv ~/docker-compose /usr/local/bin/docker-compose
