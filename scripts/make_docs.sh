#!/bin/bash

npm install -g conventional-changelog
conventional-changelog -p angular -i CHANGELOG.md -s -r 0 -l
apt-get update  -y
apt-get  install python-dev -y
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
pip install mkdocs
lerna run doc
mkdocs build
