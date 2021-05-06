#!/usr/bin/env sh
set -e
BUILD_DIR="build"
rm -rf $BUILD_DIR
printf '\n\nChecking TS definitions..\n\n'
# this is just for type checking we don't publish the output files.
# babel will produce the real *.d.ts file within each package/build dir.
tsc --outDir $BUILD_DIR

for d in $(pwd)/packages/* ; do
    printf "\n\nBuilding $d...\n\n"
    npx babel -f babel.config.js --ignore='**/*.d.ts' --extensions='.ts' --out-file-extension='.js' --copy-files -d "$d/build" "$d/src"
    # copy in essential files for publishing to npm
    cp LICENSE $d/build/LICENSE
    ls $d
    cp $d/{README.md} $d/build
    cp $d/{package.json} $d/build
done

printf '\n\ndone ✨\n\n'
