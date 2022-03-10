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

import { Api } from "@cennznet/api";
import { Keyring } from '@polkadot/keyring';
import { blake2AsHex, cryptoWaitReady } from '@polkadot/util-crypto';
import { stringToHex, stringToU8a} from '@polkadot/util'

import initApiPromise from '../../../../jest/initApiPromise';
import {Listing, NFTAttributeValue, TokenId} from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';

let api: Api;
const keyring = new Keyring({ type: 'sr25519' });
let alice;
let collectionOwner, tokenOwner;
let spendingAssetId, attributes, series1Attributes;
let globalCollectionId;
let globalTokenIds;

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

  series1Attributes = [
    {'Text': 'hello world'},
    {'Hash': blake2AsHex(stringToU8a('hello world'))},
    {'Timestamp': 12345}
  ];
});

afterAll(async () => {
  await api.disconnect();
});

describe('NFTs', () => {
  let collectionId: number, collectionId2: number;

  beforeEach(async done => {
    // Create collection and series for each test to use
    let collectionName = 'global-example-collection';
    let quantity = 3;
    globalTokenIds = [...Array(quantity)]
    let metadataPath = "series/metadata";
    await api.tx.nft.createCollection(
      collectionName,
      {"Https": "example.com/nft/metadata" },
      null,
    ).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({ event: {data, method}}) => {
          if (method == 'CreateCollection') {
            globalCollectionId = data[0].toNumber();
          }
        });

        await api.tx.nft.mintSeries(globalCollectionId, quantity, tokenOwner.address, series1Attributes, metadataPath, null)
          .signAndSend(collectionOwner, async ({ status, events }) => {
            if (status.isInBlock) {
              events.forEach(({ event: { data, method }}) => {
                if (method == 'CreateSeries') {
                  const collectionId = data[0].toNumber()
                  let seriesId = data[1].toNumber();
                  globalTokenIds = globalTokenIds.map((_, serialNumber) => [collectionId, seriesId, serialNumber])
                  done();
                }
              });
            }
          });
      }
    });
  })

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
            collectionId = data[0].toNumber();
            console.log(`got collection: ${collectionId}`);
          }
        });
        expect((await api.query.nft.collectionOwner(collectionId)).toString()).toBe(collectionOwner.address);
        expect((await api.query.nft.collectionName(collectionId)).toString()).toBe(stringToHex(collectionName));
        done();
      }
    });
  });

  it('creates another collection', async done => {
    let collectionName = 'Digital Art';
    await api.tx.nft.createCollection(
      collectionName,
      {"Https": "new.com/nft/metadata" },
      null,
    ).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          if (method == 'CreateCollection') {
            collectionId2 = data[0].toNumber();
            console.log(`got second collection: ${collectionId2}`);
          }
        });
        expect((await api.query.nft.collectionOwner(collectionId2)).toString()).toBe(collectionOwner.address);
        expect((await api.query.nft.collectionName(collectionId2)).toString()).toBe(stringToHex(collectionName));
        done();
      }
    });
  });

  it('collection Map ', async done => {
    const collectionMap = await api.derive.nft.collectionInfo();
    //Ensure collectionMap contains at least the following
    expect(collectionMap.slice(0,2)).toEqual([
      {
        id: 0,
        name: 'global-example-collection'
      },
      {
        id: 1,
        name: 'example-collection',
      },
    ]);
   done();
  });

  it('creates a token', async done => {
    let tokenId;
    await api.tx.nft.mintUnique(collectionId, tokenOwner.address, attributes, null, null).signAndSend(collectionOwner, async ({ status, events }) => {
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

  it('creates a series in first collection', async done => {
    let seriesId;
    let quantity = 3;
    let metadataPath = "series/metadata";

    await api.tx.nft
    .mintSeries(collectionId, quantity, tokenOwner.address, series1Attributes, metadataPath, null)
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

  it('creates a series of 5 in second collection', async done => {
    let seriesId;
    let quantity = 5;
    let metadataPath = "series/metadata";

    await api.tx.nft
      .mintSeries(collectionId2, quantity, tokenOwner.address, series1Attributes, metadataPath, null)
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
          let tokenId = new EnhancedTokenId(api.registry, [collectionId2, seriesId, serialNumber]);
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

  it('burn second token from series', async done => {
    const seriesId = 1;
    const serialNumber = 1;
    const tokenId = [collectionId, seriesId, serialNumber];

    await api.tx.nft.burn(api.registry.createType('TokenId', tokenId))
      .signAndSend(tokenOwner, async ({ status, events }) => {
        if (status.isInBlock) {
          events.forEach(({event: {data, method}}) => {
            if (method == 'Burn') {
              const [collId, sId, [serialNo] ] = data;
              expect(collId.toNumber()).toEqual(collectionId);
              expect(sId.toNumber()).toEqual(seriesId);
              expect(serialNo.toNumber()).toEqual(serialNumber);
              done();
            }
          });
        }
      });
  });

  it('Find tokens with owner ', async done => {
    const tokens: EnhancedTokenId[] = await api.derive.nft.tokensOf(tokenOwner.address) as EnhancedTokenId[];
    console.log('tokens:::',tokens);
    const hasToken0 = (token) => token.collectionId.toNumber() === 0 && token.seriesId.toNumber() === 0 && token.serialNumber.toNumber() === 0;
    const hasToken1 = (token) => token.collectionId.toNumber() === 1 && token.seriesId.toNumber() === 0 && token.serialNumber.toNumber() === 0;
    expect(tokens.some(hasToken0)).toBe(true);
    expect(tokens.some(hasToken1)).toBe(true);
    done();
  });

  it('Find tokens in second collection for owner ', async done => {
    const collectionIds = api.registry.createType('Vec<CollectionId>',[1]);
    const tokens = await api.derive.nft.tokensOf(tokenOwner.address, collectionIds);
    const tokensInCollection = tokens[0];
    expect(tokensInCollection.toJSON()).toEqual([
      {
        collectionId: 1,
        serialNumber: 0,
        seriesId: 0
      },
      {
        collectionId: 1,
        serialNumber: 0,
        seriesId: 1
      },
      {
        collectionId: 1,
        serialNumber: 2,
        seriesId: 1
      }
    ]);
    done();
  });

  it('finds collected tokens, their attributes and owners with derived query', async () => {
    const tokenInfos = await api.derive.nft.tokenInfoForCollection(collectionId.toString());
    const uniqueToken = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() ===  0
      && token.tokenId.serialNumber.toNumber() === 0
    );
    expect(uniqueToken.attributes.toJSON()).toEqual(attributes);
    expect(uniqueToken.owner).toEqual(tokenOwner.address);

    const token1InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() === 1
      && token.tokenId.serialNumber.toNumber() === 0
    );
    expect(token1InSeries.attributes.toJSON()).toEqual(series1Attributes);
    expect(token1InSeries.owner).toEqual(tokenOwner.address);

    const token2InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 1
    );
    expect(token2InSeries.attributes.toJSON()).toEqual(series1Attributes);
    expect(token2InSeries.owner).toEqual(null);

    const token3InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 2
    );
    expect(token3InSeries.attributes.toJSON()).toEqual(series1Attributes);
    expect(token3InSeries.owner).toEqual(tokenOwner.address);

  });

  it('finds collected tokens', async () => {
    let ownedTokens = (await api.rpc.nft.collectedTokens(collectionId, tokenOwner.address));
    expect(ownedTokens.toJSON()).toEqual([
      {
        collectionId,
        seriesId: 0,
        serialNumber: 0,
      },
      {
        collectionId: collectionId,
        seriesId: 1,
        serialNumber: 0,
      },
      {
        collectionId: collectionId,
        seriesId: 1,
        serialNumber: 2,
      },
    ]);
  });

  it('can list a bundle for fixed price sale', async done => {
    let buyer = keyring.addFromUri('//Test//TokenBuyer');
    let price = 200 * 10_000; // 200 CPAY
    let duration = '1000';
    let tokens = [[collectionId,0,0], [collectionId,1,0]];
    let tokenIds = api.registry.createType('Vec<TokenId>',tokens);
    let listingId = await api.query.nft.nextListingId();

    await api.tx.nft
      .sellBundle(tokenIds, buyer.address, spendingAssetId, price, duration)
      .signAndSend(tokenOwner, async ({ status }) => {
          if (status.isInBlock) {
            let listing: Listing = (await api.query.nft.listings(listingId)).unwrapOrDefault();
            let blockNumber = (await api.rpc.chain.getBlock()).block.header.number.toNumber();
              expect(listing.asFixedPrice.toJSON()).toEqual({
                paymentAsset: spendingAssetId,
                fixedPrice: price,
                buyer: buyer.address,
                close: blockNumber + parseInt(duration),
                seller: tokenOwner.address,
                tokens,
                royaltiesSchedule: { entitlements: [] },
              });

            done();
          }
      });
  });

  it('can list a token for auction', async done => {
    let reservePrice = 200 * 10_000; // 200 CPAY
    let duration = '1000';
    let token = api.registry.createType('TokenId',[collectionId,1,2]);
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
              close: blockNumber + parseInt(duration),
              seller: tokenOwner.address,
              tokens: [token.toJSON()],
              royaltiesSchedule: { entitlements: [] }
            });

          done();
        }
      }
    );

  });

  it('Get Open listings for Collection', async done => {
    let reservePrice = 200 * 10_000;
    let duration = '1000';
    let token = globalTokenIds[0]
    let token2 = globalTokenIds[1]
    // list two out of the three tokens, one auction & one fixed in collection
    await api.tx.nft.auction(token, spendingAssetId, reservePrice, duration)
      .signAndSend(tokenOwner, async ({ status }) => {
        if (status.isInBlock) {
          await api.tx.nft.sell(token2, null, spendingAssetId, reservePrice, duration)
            .signAndSend(tokenOwner, async ({ status }) => {
              if (status.isInBlock) {
                const allTokens = await api.derive.nft.openCollectionListings(globalCollectionId);
                // confirm only received 2 out of 3 listings returned and token IDs are correct
                expect(allTokens.length).toBe(2);
                const receivedTokenIds = [
                  {
                    collectionId: allTokens[0].tokenId.collectionId.toNumber(),
                    seriesId: allTokens[0].tokenId.seriesId.toNumber(),
                    serialNumber: allTokens[0].tokenId.serialNumber.toNumber(),
                  },
                  {
                    collectionId: allTokens[1].tokenId.collectionId.toNumber(),
                    seriesId: allTokens[1].tokenId.seriesId.toNumber(),
                    serialNumber: allTokens[1].tokenId.serialNumber.toNumber(),
                  },
                ]
                //sort based on series number
                receivedTokenIds.sort((a, b) => (a.serialNumber > b.serialNumber) ? 1 : -1)
                expect(receivedTokenIds).toEqual([
                  {
                    collectionId: globalCollectionId,
                    seriesId: 0,
                    serialNumber: 0,
                  },
                  {
                    collectionId: globalCollectionId,
                    seriesId: 0,
                    serialNumber: 1,
                  }
                ]);
                // Ensure Listing Id correctly matches token Id
                const firstReceivedListing: Listing = (await api.query.nft.listings(allTokens[0].listingId)).unwrapOrDefault();
                const expectedTokenID: TokenId = firstReceivedListing.isAuction
                  ? firstReceivedListing.asAuction.toJSON().tokens[0]
                  : firstReceivedListing.asFixedPrice.toJSON().tokens[0];
                expect(expectedTokenID).toEqual( [
                    allTokens[0].tokenId.collectionId.toNumber(),
                    allTokens[0].tokenId.seriesId.toNumber(),
                    allTokens[0].tokenId.serialNumber.toNumber()
                  ]
                )
                done();
              }
            })
        }
      })
  });


  it('Find tokens listing on local with V2', async done => {
    const allTokens = await api.derive.nft.openCollectionListingsV2('15');
    expect(allTokens.length).toBe(2);
    expect(allTokens[0].listingId).toBe('3');
    expect(allTokens[0].tokens[0].owner).toBe(tokenOwner.address);
    expect(allTokens[0].tokens[0].tokenId.toString()).toBe(new EnhancedTokenId(api.registry, [15,0,1]).toString());
    expect(allTokens[1].listingId).toBe('2');
    expect(allTokens[1].tokens[0].owner).toBe(tokenOwner.address);
    expect(allTokens[1].tokens[0].tokenId.toString()).toBe(new EnhancedTokenId(api.registry, [15,0,0]).toString());
    done();
  });

  it( 'Return empty listing when it is not available ', async done => {
      const listing = await api.derive.nft.openCollectionListings('1442');
      expect(listing).toEqual([]);
      done();
  });

  it('Find all tokens with owner on Azalea', async done => {
    jest.setTimeout(40000); // sometimes takes more time
    const address = '5EYxYJVZFwa4T1nVGFadeMNWRhHPYboMdToEbiER2AzWVsLK';
    const api = await Api.create({network: 'azalea'});
    const tokens = await api.derive.nft.tokensOf(address);
    expect((tokens as EnhancedTokenId[]).length).toBeGreaterThan(0);
    await api.disconnect();
    done();
  });


  // Might need to change this test as owner can change while trading nfts
  it('Find tokens info with owner on Azalea', async done => {
    const api = await Api.create({network: 'azalea'});

    const tokenInfo = await api.derive.nft.tokenInfo(api.createType('TokenId',[46, 24, 214]));

    expect(tokenInfo.owner).toEqual("5G1oXM53W1zMB6YZQvgZ6BUvAk1iXQcZdpNAZAJjyLyJX8NL");

    const tokenInfo1 = await api.derive.nft.tokenInfo(api.createType('TokenId',[46, 24, 441]));
    expect(tokenInfo1.owner).toEqual("5CoQbre9E6oaSq9RzcqQJCd6qcNEy5d1YyBnpLC2mqoubWQV");

    await api.disconnect();
    done();

  });

});
