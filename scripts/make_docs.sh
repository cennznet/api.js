#!/bin/bash
npm install -g conventional-changelog
conventional-changelog -p angular -i CHANGELOG.md -s -r 0 -l
lerna run doc
cp -rf ./docs/* ./docs-mounted
