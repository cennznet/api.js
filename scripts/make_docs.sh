#!/bin/bash

apt-get update  -y
apt-get  install python-dev -y
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
pip install mkdocs
lerna run doc
mkdocs build
