#!/usr/bin/env node
// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

require('@babel/register')({
  extensions: ['.js', '.ts'],
  plugins: [
    ['module-resolver', {
      alias: {
        '^@cennznet/api(.*)': './packages/api/src\\1',
        '^@cennznet/types(.*)': './packages/types/src\\1',
        '^@cennznet/crml-cennzx-spot(.*)': './packages/crml-cennzx-spot/src\\1',
        '^@cennznet/util(.*)': './packages/util/src\\1',
      }
    }]
  ]
});

require('./generateSlimMetadata.ts');
