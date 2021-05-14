// Copyright 2020-2021 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Keyring } from '@polkadot/keyring';
import { blake2AsHex, cryptoWaitReady } from '@polkadot/util-crypto';
import { stringToU8a } from '@polkadot/util'

import initApiPromise from '../../../../jest/initApiPromise';
import { Listing } from '@cennznet/types';

let api;
const keyring = new Keyring({ type: 'sr25519' });
let alice;
let collectionOwner, tokenOwner;

beforeAll(async done => {
  await cryptoWaitReady();
  api = await initApiPromise();
  // alice is sudo
  alice = keyring.addFromUri('//Alice');

  collectionOwner = keyring.addFromUri('//Test//CollectionOwner');
  tokenOwner = keyring.addFromUri('//Test//TokenOwner');
  // Fund accounts
  const spendingId = await api.query.genericAsset.spendingAssetId();
  const initialEndowment = 100_000_000;

  await api.tx.utility.batch([
      api.tx.genericAsset
    .mint(spendingId, collectionOwner.address, initialEndowment),
      api.tx.genericAsset
    .mint(spendingId, tokenOwner.address, initialEndowment),
  ]).signAndSend(alice, ({ status }) => status.isInBlock ? done() : null);
});

afterAll(async () => {
  await api.disconnect();
});

describe('NFTs', () => {
  let collectionId;
  let schema;

  beforeAll(() => {
    // setup test collection
    collectionId = 'example-collection';
    schema = [
      ['name', 'text'],
      ['fingerprint', 'hash'],
      ['created', 'timestamp']
    ];
  });

  it('creates a collection', async done => {
    await api.tx.nft.createCollection(collectionId, schema, "https://example.com/nft/metadata", null).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
        expect((await api.query.nft.collectionOwner(collectionId)).toString()).toBe(collectionOwner.address);
        done();
      }
    });
  });

  it('creates a token', async done => {
    const attributes = [
      {'Text': 'hello world'},
      {'Hash': blake2AsHex(stringToU8a('hello world'))},
      {'Timestamp': 12345}
    ];

    let tokenId;
    await api.tx.nft.createToken(collectionId, tokenOwner.address, attributes, null).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          if (method == 'CreateToken') {
            tokenId = data[1];
            console.log(`got token: ${tokenId}`);
          }
        });
        let tokenAttributes = (await api.query.nft.tokenAttributes(tokenId));
        expect(tokenAttributes.toJSON()).toEqual(attributes);
        expect((await api.query.nft.balanceOf(tokenId, tokenOwner.address)).toNumber()).toEqual(1);
        done();
      }
    });
  });

  it('finds collected tokens', async () => {
    let tokenId = '0xd7be5779426046ec6370d5ffd7cf1d4d379393f6efb1cdd5c9f3da4d03bb59a8';
    let ownedTokens = (await api.rpc.nft.collectedTokens(collectionId, tokenOwner.address));
    expect(ownedTokens.toString()).toEqual(`[${tokenId}]`);
  });

  it('creates a batch of tokens', async done => {
    const attributes = [
      {'Text': 'hello batch world'},
      {'Hash': blake2AsHex(stringToU8a('hello world'))},
      {'Timestamp': 22345}
    ];
    const quantity = 10_000;

    let tokenId;
    await api.tx.nft.batchCreateToken(collectionId, quantity, tokenOwner.address, attributes, null).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          if (method == 'CreateToken') {
            tokenId = data[1];
            console.log(`got token: ${tokenId}`);
          }
        });
        let tokenAttributes = (await api.query.nft.tokenAttributes(tokenId));
        expect(tokenAttributes.toJSON()).toEqual(attributes);
        expect((await api.query.nft.balanceOf(tokenId, tokenOwner.address)).toNumber()).toEqual(quantity);
        done();
      }
    });
  });

  it('lists tokens for fixed price sale', async done => {
    let tokenId = '0xfa905acd4df10440e9721068ef5ddce67761c2d62d2fcd6d84cf495d0fc73e99';
    const quantity = 100;

    let spendingAssetId = await api.query.genericAsset.spendingAssetId();
    let price = 200 * 10_000; // 200 CPAY
    let duration = 10;
    let block = await api.rpc.chain.getBlock();
    await api.tx.nft.sell(tokenId, quantity, null, spendingAssetId, price, duration).signAndSend(tokenOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });

        // 0 = the first listing id
        let listing: Listing = await api.query.nft.listings(0);
        expect(listing.asFixedPrice).toEqual({
          paymentAsset: spendingAssetId,
          fixedPrice: price,
          buyer: null,
          duration: block.block.header.number.toNumber() + duration,
          seller: tokenOwner.address,
          quantity,
          tokenId,
        });

        done();
      }
    });
  });

  it('lists tokens for auction', async done => {
    let tokenId = '0xfa905acd4df10440e9721068ef5ddce67761c2d62d2fcd6d84cf495d0fc73e99';
    const quantity = 20;

    let spendingAssetId = await api.query.genericAsset.spendingAssetId();
    let reservePrice = 200 * 10_000; // 200 CPAY
    let duration = 10;
    let block = await api.rpc.chain.getBlock();
    await api.tx.nft.auction(tokenId, quantity, spendingAssetId, reservePrice, duration).signAndSend(tokenOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });

        // 1 = the second listing id
        let listing: Listing = await api.query.nft.listings(1);
        expect(listing.asAuction).toEqual({
          paymentAsset: spendingAssetId,
          reservePrice,
          duration: block.block.header.number.toNumber() + duration,
          seller: tokenOwner.address,
          quantity,
          tokenId,
        });

        done();
      }
    });
  });

});
