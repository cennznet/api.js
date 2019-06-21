#!/usr/bin/env bash
perl -0777 -i -pe 's/([\t ]*readonly tx.*)/\/\/\@ts-ignore\n$1/g' packages/api/build/Api.d.ts
perl -0777 -i -pe 's/([\t ]*readonly tx.*)/\/\/\@ts-ignore\n$1/g' packages/api/build/ApiRx.d.ts
