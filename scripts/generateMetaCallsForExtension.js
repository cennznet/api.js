#!/usr/bin/env node
// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
process.env.JEST_WORKER_ID = '123';
require('@babel/register')({
  extensions: ['.js', '.ts'],
  plugins: [
    ['module-resolver', {
      alias: {
        '^@cennznet/api(.*)': './packages/api/src\\1',
        '^@cennznet/types(.*)': './packages/types/src\\1',
      }
    }]
  ]
});

require('./generateMetaCallsForExtension.ts');
