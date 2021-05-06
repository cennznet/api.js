#!/usr/bin/env sh
set -e
BUILD_DIR="build"
rm -rf $BUILD_DIR
printf '\n\nChecking TS definitions..\n\n'
# generate typescript definitions
tsc --outDir $BUILD_DIR

for d in $(pwd)/packages/* ; do
    PACKAGE=$(basename $d)
    printf "\n\nBuilding @cennznet/$PACKAGE...\n\n"
    npx babel -f babel.config.js --ignore='**/*.d.ts' --extensions='.ts' --out-file-extension='.js' --copy-files -d "$d/build" "$d/src"
    # copy in *d.ts definitions
    rsync -a "$BUILD_DIR/packages/$PACKAGE/src/" "$d/build/"ls
    # copy in essential files for publishing to npm
    cp LICENSE $d/build/LICENSE
    ls $d
    cp $d/README.md $d/build/README.md
    cp $d/package.json $d/build/package.json
done

printf '\n\ndone ✨\n\n'
