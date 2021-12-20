#!/usr/bin/env node
// Copyright 2017-2021 @polkadot/typegen authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable sort-keys */

// let main;
//
// try {
//   main = require('../fixTypeDef.cjs').main;
// } catch (error) {
//   process.env.JEST_WORKER_ID = '123';
//
//   require('@babel/register')({
//     extensions: ['.js', '.ts'],
//     plugins: [
//       ['module-resolver', {
//         alias: {
//           '^@cennznet/api(.*)': './packages/api/src\\1',
//           '^@cennznet/types(.*)': './packages/types/src\\1',
//           '^@cennznet/util(.*)': './packages/util/src\\1'
//         }
//       }]
//     ]
//   });
//
//   main = require('./fixTypeDef.ts').main;
// }

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

