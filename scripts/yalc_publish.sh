#!/bin/bash -l

yarn build

# Ensure coreutils is in place
full_path=$(realpath $0)
scripts_path=$(dirname $full_path)
projectDir=$(dirname $scripts_path)
echo "project dir: $projectDir"

genericAssetDir="$projectDir/packages/crml-generic-asset"
typesDir="$projectDir/packages/types"
utilDir="$projectDir/packages/util"

echo "full dir: $full_path"
echo "ga dir: $genericAssetDir"
echo "types dir: $typesDir"

cd $projectDir/packages/crml-generic-asset
yalc installations clean @cennznet/crml-generic-asset
yalc publish

cd $projectDir/packages/types
yalc installations clean @cennznet/types
yalc publish

cd $projectDir/packages/util
yalc installations clean @cennznet/util
yalc publish
