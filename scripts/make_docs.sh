#!/bin/bash
lerna run doc
cp -rf ./docs/* ./docs-mounted
