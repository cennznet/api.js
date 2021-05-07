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
    npx babel -f babel.config.js --ignore='**/*.d.ts,**/*.e2e.ts,**/*.spec.ts' --extensions='.ts' --out-file-extension='.cjs' -d "$d/build" "$d/src"
    # copy in *d.ts definitions. ignore tests
    rsync \
    --exclude '**/*.e2e.d.ts' \
    --exclude '**/*.spec.d.ts' \
    -av "$BUILD_DIR/packages/$PACKAGE/src/" "$d/build/"
    # copy in essential files for publishing to npm
    cp LICENSE $d/build/LICENSE
    ls $d
    cp $d/README.md $d/build/README.md
    cp $d/package.json $d/build/package.json
done

printf '\n\ndone ✨\n\n'
