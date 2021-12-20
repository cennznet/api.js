#!/usr/bin/env node
// Copyright 2017-2021 @polkadot/typegen authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// TODO - once https://github.com/cennznet/cennznet/issues/542 is fixed, we can delete this file
const fs = require('fs')

function main () {
  fs.readFile('src/interfaces/augment-api-query.ts', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace(/collectionMetadataUri/g, 'collectionMetadataURI');
    result = result.replace(/seriesMetadataUri/g, 'seriesMetadataURI');
    result = result.replace(/cennzDepositsActive/g, 'cENNZDepositsActive');

    fs.writeFile('src/interfaces/augment-api-query.ts', result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

main();

