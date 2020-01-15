#!/bin/bash

yarn build

full_path=$(realpath $0)
scripts_path=$(dirname $full_path)
projectDir=$(dirname $scripts_path)
echo "project dir: $projectDir"

cd $projectDir/packages/api
yalc publish build --changed --push

cd $projectDir/packages/crml-attestation
yalc publish build --changed --push

cd $projectDir/packages/crml-cennzx-spot
yalc publish build --changed --push

cd $projectDir/packages/crml-generic-asset
yalc publish build --changed --push

cd $projectDir/packages/util
yalc publish build --changed --push

cd $projectDir/packages/wallet
yalc publish build --changed --push

cd $projectDir/packages/types
yalc publish build --changed --push
