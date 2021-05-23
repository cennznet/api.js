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
import { stringToHex, stringToU8a } from '@polkadot/util'

import initApiPromise from '../../../../jest/initApiPromise';
import { Listing } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';
import { TokenInfo } from '@cennznet/api/derives/nft/tokenInfo';

let api;
const keyring = new Keyring({ type: 'sr25519' });
let alice;
let collectionOwner, tokenOwner;
let spendingAssetId, attributes, sftAttributes;

beforeAll(async done => {
  await cryptoWaitReady();
  api = await initApiPromise();
  // alice is sudo
  alice = keyring.addFromUri('//Alice');

  collectionOwner = keyring.addFromUri('//Test//CollectionOwner');
  tokenOwner = keyring.addFromUri('//Test//TokenOwner');
  // Fund accounts
  spendingAssetId = (await api.query.genericAsset.spendingAssetId()).toNumber();
  const initialEndowment = 100_000_000;

  await api.tx.utility.batch([
      api.tx.genericAsset
    .mint(spendingAssetId, collectionOwner.address, initialEndowment),
      api.tx.genericAsset
    .mint(spendingAssetId, tokenOwner.address, initialEndowment),
  ]).signAndSend(alice, ({ status }) => status.isInBlock ? done() : null);


  attributes = [
    {'Text': '💎🙌'},
  ];

  sftAttributes = [
    {'Text': 'hello world'},
    {'Hash': blake2AsHex(stringToU8a('hello world'))},
    {'Timestamp': 12345}
  ];
});

afterAll(async () => {
  await api.disconnect();
});

describe('NFTs', () => {
  let collectionId;

  it('creates a collection', async done => {
    let collectionName = 'example-collection';
    await api.tx.nft.createCollection(
      collectionName,
      {"Https": "example.com/nft/metadata" },
      null,
    ).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          if (method == 'CreateCollection') {
            collectionId = data[0];
            console.log(`got collection: ${collectionId}`);
          }
        });
        expect((await api.query.nft.collectionOwner(collectionId)).toString()).toBe(collectionOwner.address);
        expect((await api.query.nft.collectionName(collectionId)).toString()).toBe(stringToHex(collectionName));
        done();
      }
    });
  });

  it('creates a token', async done => {

    let tokenId;
    await api.tx.nft.mintUnique(collectionId, tokenOwner.address, attributes, null).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({ event: {data, method }}) => {
          if (method == 'CreateToken') {
            tokenId = data[1];
            console.log(`got token: ${tokenId}`);
          }
        });

        let tokenInfo = (await api.derive.nft.tokenInfo(tokenId));
        expect(tokenInfo ==
          {
            owner: tokenOwner.address,
            attributes,
            tokenId,
          }
        );

        done();
      }
    });
  });

  it('creates a series', async done => {
    const attributes = [
      {'Text': 'hello world'},
      {'Hash': blake2AsHex(stringToU8a('hello world'))},
      {'Timestamp': 12345}
    ];

    let seriesId;
    let quantity = 3;
    let metadataPath = "series/metadata";

    await api.tx.nft
    .mintSeries(collectionId, quantity, tokenOwner.address, attributes, metadataPath)
    .signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({ event: {data, method }}) => {
          if (method == 'CreateSeries') {
            seriesId = data[1];
            console.log(`got series: ${seriesId}`);
          }
        });

        // this is a new series, the first token will have serial number 0
        let serialNumber = 0;
        let tokenId = new EnhancedTokenId(api.registry, [collectionId, seriesId, serialNumber]);
        let tokenInfo = (await api.derive.nft.tokenInfo(tokenId));
        expect(tokenInfo ==
          {
            owner: tokenOwner.address,
            attributes,
            tokenId,
          }
        );

        done();
      }
    });
  });

  it('finds collected tokens, their attributes and owners with derived query', async () => {
    collectionId = 0;
    const tokenInfos = await api.derive.nft.tokenInfoForCollection(collectionId);
    const tokenUnique = tokenInfos[0];
    console.log('tokenUnique:::',tokenUnique.tokenId);
    const hasUniqueToken = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === 0
      && token.tokenId.seriesId.toNumber() ===  0
      && token.tokenId.serialNumber.toNumber() === 0
      // && token.tokenDetails.toJSON() === attributes
      && token.owner.toString() === tokenOwner.address);
    console.log('Has unique token::',hasUniqueToken);
    const hastoken1InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === 0
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 0
     /*&& token.tokenDetails.toJSON() === sftAttributes*/
      && token.owner.toString() === tokenOwner.address);
    const hastoken2InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === 0
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 1
      /*&& token.tokenDetails.toJSON() === sftAttributes*/
      && token.owner.toString() === tokenOwner.address);
    const hastoken3InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === 0
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 2
     /*&& token.tokenDetails.toJSON() === sftAttributes*/
      && token.owner.toString() === tokenOwner.address);
    console.log('hastoken1InSeries::',hastoken1InSeries);
    console.log('hastoken2InSeries::',hastoken2InSeries);
    console.log('hastoken3InSeries::',hastoken3InSeries);
  });

  it('finds collected tokens', async () => {
      // TODO: api.derive.nft.tokensForCollection(tokenId);
    let ownedTokens = (await api.rpc.nft.collectedTokens(collectionId, tokenOwner.address));
    expect(ownedTokens.toJSON()).toEqual([
      {
        collectionId: 0,
        seriesId: 0,
        serialNumber: 0,
      },
      {
        collectionId: 0,
        seriesId: 1,
        serialNumber: 0,
      },
      {
        collectionId: 0,
        seriesId: 1,
        serialNumber: 1,
      },
      {
        collectionId: 0,
        seriesId: 1,
        serialNumber: 2,
      },
    ]);
  });

  it('can list a bundle for fixed price sale', async done => {
    let buyer = keyring.addFromUri('//Test//TokenBuyer');
    let price = 200 * 10_000; // 200 CPAY
    let duration = 10;
    let tokens = [[0,0,0], [0,1,0]];
    let listingId = await api.query.nft.nextListingId();

    await api.tx.nft
      .sellBundle(tokens, buyer.address, spendingAssetId, price, duration)
      .signAndSend(tokenOwner, async ({ status }) => {
          if (status.isInBlock) {
            let listing: Listing = (await api.query.nft.listings(listingId)).unwrapOrDefault();
            let blockNumber = (await api.rpc.chain.getBlock()).block.header.number.toNumber();
              expect(listing.asFixedPrice.toJSON()).toEqual({
                paymentAsset: spendingAssetId,
                fixedPrice: price,
                buyer: buyer.address,
                close: blockNumber + duration,
                seller: tokenOwner.address,
                tokens,
              });

            done();
          }
      });
  });

  it('can list a token for auction', async done => {
    let reservePrice = 200 * 10_000; // 200 CPAY
    let duration = 10;
    let token = [0,1,1];
    let listingId = await api.query.nft.nextListingId();

    await api.tx.nft
      .auction(token, spendingAssetId, reservePrice, duration)
      .signAndSend(tokenOwner, async ({ status }) => {
        if (status.isInBlock) {
          let blockNumber = (await api.rpc.chain.getBlock()).block.header.number.toNumber();
          let listing: Listing = (await api.query.nft.listings(listingId)).unwrapOrDefault();
          expect(listing.asAuction.toJSON()).toEqual({
              paymentAsset: spendingAssetId,
              reservePrice,
              close: blockNumber + duration,
              seller: tokenOwner.address,
              tokens: [token],
            });

          done();
        }
      }
    );

  });

});
