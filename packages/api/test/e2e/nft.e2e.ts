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
import { cryptoWaitReady } from '@polkadot/util-crypto';
import {stringToHex, u8aToString} from '@polkadot/util'

import initApiPromise from '../../../../jest/initApiPromise';
import {CollectionInfo, Listing, TokenId} from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';

let api: Api;
const keyring = new Keyring({ type: 'sr25519' });
let alice;
let collectionOwner, tokenOwner;
let spendingAssetId;
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
    const metadataPath = {"Https": "example.com/nft/metadata" }
    await api.tx.nft.createCollection(
      collectionName,
      null,
    ).signAndSend(collectionOwner, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({ event: {data, method}}) => {
          if (method == 'CreateCollection') {
            globalCollectionId = data[0].toNumber();
          }
        });

        await api.tx.nft.mintSeries(globalCollectionId, quantity, tokenOwner.address, metadataPath, null)
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
    const royaltiesSchedule = null;
    await api.tx.nft.createCollection(
      collectionName,
      royaltiesSchedule,
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
    const royaltiesSchedule = null;
    await api.tx.nft.createCollection(
      collectionName,
      royaltiesSchedule
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
    const quantity = 1;
    const metadataPath = {"Https": "example.com/nft/metadata" }
    await api.tx.nft.mintSeries(collectionId, quantity, tokenOwner.
        address, metadataPath, null).signAndSend(collectionOwner, async ({ status, events }) => {
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
            tokenId,
            attributes: api.registry.createType('Vec<NFTAttributeValue>',[])
          }
        );

        done();
      }
    });
  });

  it('creates a series in first collection', async done => {
    let seriesId;
    let quantity = 3;
    const metadataPath = {"Https": "example.com/nft/metadata" }

    await api.tx.nft
    .mintSeries(collectionId, quantity, tokenOwner.address, metadataPath, null)
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
            tokenId,
            attributes: api.registry.createType('Vec<NFTAttributeValue>',[])
          }
        );

        done();
      }
    });
  });

  it('creates a series of 5 in second collection', async done => {
    let seriesId;
    let quantity = 5;
    const metadataPath = {"Https": "example.com/nft/metadata" };

    await api.tx.nft
      .mintSeries(collectionId2, quantity, tokenOwner.address, metadataPath, null)
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
              tokenId,
              attributes: api.registry.createType('Vec<NFTAttributeValue>',[])
            }
          );

          done();
        }
      });
  });

  it('mint additional in second collection', async done => {
    let seriesId = 1;
    let quantity = 3;
    // const metadataPath = {"Https": "example.com/nft/metadata" };

    await api.tx.nft
      .mintAdditional(collectionId2, seriesId, quantity, collectionOwner.address)
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
              tokenId,
              attributes: api.registry.createType('Vec<NFTAttributeValue>',[])
            }
          );
          //console.log('tokenInfo:',tokenInfo);
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
    expect(tokensInCollection.toJSON()).toEqual({"0": [1, 0, 0], "1": [1, 1, 0], "2": [1, 1, 2]});
    done();
  });

  it('finds collected tokens, their attributes and owners with derived query', async () => {
    const tokenInfos = await api.derive.nft.tokenInfoForCollection(collectionId.toString());
    const uniqueToken = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() ===  0
      && token.tokenId.serialNumber.toNumber() === 0
    );
    expect(uniqueToken.owner).toEqual(tokenOwner.address);

    const token1InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() === 1
      && token.tokenId.serialNumber.toNumber() === 0
    );
    expect(token1InSeries.owner).toEqual(tokenOwner.address);

    const token2InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 1
    );
    expect(token2InSeries.owner).toEqual(null);

    const token3InSeries = tokenInfos.find((token) =>
      token.tokenId.collectionId.toNumber() === collectionId
      && token.tokenId.seriesId.toNumber() ===  1
      && token.tokenId.serialNumber.toNumber() === 2
    );
    expect(token3InSeries.owner).toEqual(tokenOwner.address);

  });

  it('finds collected tokens', async () => {
    let ownedTokens = (await api.rpc.nft.collectedTokens(collectionId, tokenOwner.address));
    expect(ownedTokens[0]).toEqual([1, 0, 0]);
    expect(ownedTokens[1]).toEqual([1, 1, 0]);
    expect(ownedTokens[2]).toEqual([1, 1, 2]);
  });

  it('can list a bundle for fixed price sale', async done => {
    let buyer = keyring.addFromUri('//Test//TokenBuyer');
    let price = 200 * 10_000; // 200 CPAY
    let duration = 1000;
    let tokens = [[collectionId,0,0], [collectionId,1,0]];
    let tokenIds = api.registry.createType('Vec<TokenId>',tokens);
    let listingId = await api.query.nft.nextListingId();
    const marketplaceId = null;
    await api.tx.nft
      .sellBundle(tokenIds, buyer.address, spendingAssetId, price, duration.toString(), marketplaceId)
      .signAndSend(tokenOwner, async ({ status }) => {
          if (status.isInBlock) {
            let listing: Listing = (await api.query.nft.listings(listingId)).unwrapOrDefault();
            let blockNumber = (await api.rpc.chain.getBlock()).block.header.number.toNumber();

              expect(listing.asFixedPrice.toJSON()).toEqual({
                paymentAsset: spendingAssetId,
                fixedPrice: price,
                marketplaceId: null,
                buyer: buyer.address,
                close: blockNumber + duration,
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
    let duration = 1000;
    let token = api.registry.createType('TokenId',[collectionId,1,2]);
    let listingId = await api.query.nft.nextListingId();
    const marketplaceId = null;

    await api.tx.nft
      .auction(token, spendingAssetId, reservePrice, duration.toString(), marketplaceId)
      .signAndSend(tokenOwner, async ({ status }) => {
        if (status.isInBlock) {
          let blockNumber = (await api.rpc.chain.getBlock()).block.header.number.toNumber();
          let listing: Listing = (await api.query.nft.listings(listingId)).unwrapOrDefault();
          expect(listing.asAuction.close.toNumber()).toEqual(blockNumber + duration);
          expect(listing.asAuction.paymentAsset.toNumber()).toEqual(spendingAssetId);
          expect(listing.asAuction.reservePrice.toNumber()).toEqual(reservePrice);
          expect(listing.asAuction.seller.toString()).toEqual(tokenOwner.address);
          expect(listing.asAuction.tokens.toJSON()).toEqual([token.toJSON()]);
          expect(listing.asAuction.royaltiesSchedule.toJSON()).toEqual({ entitlements: [] });

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
    const marketplaceId = null;
    // list two out of the three tokens, one auction & one fixed in collection
    await api.tx.nft.auction(token, spendingAssetId, reservePrice, duration, marketplaceId)
      .signAndSend(tokenOwner, async ({ status }) => {
        if (status.isInBlock) {
          await api.tx.nft.sell(token2, null, spendingAssetId, reservePrice, duration, marketplaceId)
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
    const allTokens = await api.derive.nft.openCollectionListingsV2('16');
    expect(allTokens.length).toBe(2);
    expect(allTokens[0].listingId).toBe('3');
    expect(allTokens[0].tokens[0].owner).toBe(tokenOwner.address);
    expect(allTokens[0].tokens[0].tokenId.toString()).toBe(new EnhancedTokenId(api.registry, [16,0,1]).toString());
    expect(allTokens[1].listingId).toBe('2');
    expect(allTokens[1].tokens[0].owner).toBe(tokenOwner.address);
    expect(allTokens[1].tokens[0].tokenId.toString()).toBe(new EnhancedTokenId(api.registry, [16,0,0]).toString());
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

  it('Find series metadata uri from nikau', async done => {
    const api = await Api.create({network: "nikau"});
    const uri = await api.derive.nft.seriesMetadataUri(192, 0);
    expect(uri.toHuman()).toEqual("ipfs://QmdHBkLr9L3UarwPZVGjqKFZs6XQ36Z4jJULt4zh3KwkY1");
    await api.disconnect();
    done();
  });

  it('test derive nft queries', async done => {
    const api = await Api.create({network: "nikau"});
    const tokenInfo = await api.rpc.nft.getTokenInfo(206,0,1);
    expect(tokenInfo.owner).toEqual("5H14vxnz18N4raNRGZDNnRtF1vXC5uUru4LxTxz2ZUSxuxfF");
    expect(tokenInfo.royalties[0]).toEqual(["5H14vxnz18N4raNRGZDNnRtF1vXC5uUru4LxTxz2ZUSxuxfF","0.070000"]);
    const listingInfo = await api.rpc.nft.getCollectionListings(206,0,10);
    expect((listingInfo as any).listings.length).toBeGreaterThanOrEqual(0);
    const firstListing = (listingInfo as any).listings[0];
    // Listing can expire
    // expect(firstListing).toEqual({"buyer":null,"end_block":2813952,"id":"2023","listing_type":"fixedPrice","payment_asset":17002,"price":"333000000000000000000","royalties":[["5H14vxnz18N4raNRGZDNnRtF1vXC5uUru4LxTxz2ZUSxuxfF","0.070000"]],"seller":"5E5gfwi3m5YhWfpwycwYv3RKhKMvQssE1G7gnfp4khEVF7K2","token_ids":[[206,0,8]]});
    const collectionInfo: CollectionInfo = await api.rpc.nft.getCollectionInfo(206) as unknown as CollectionInfo;
    expect(collectionInfo.name).toEqual('GLORIOUS GORDON WALTERS MAHO');
    expect(collectionInfo.owner).toEqual('5H14vxnz18N4raNRGZDNnRtF1vXC5uUru4LxTxz2ZUSxuxfF');
    expect(collectionInfo.royalties).toEqual([]);

    const collectedTokens = await api.rpc.nft.collectedTokens(206, "5E5gfwi3m5YhWfpwycwYv3RKhKMvQssE1G7gnfp4khEVF7K2") as unknown as CollectionInfo;
    expect(collectedTokens[0]).toEqual([206,0,8]);

    const tokenUri = await api.rpc.nft.tokenUri(api.registry.createType('TokenId',[206,0,1]));
    expect(u8aToString(tokenUri)).toEqual('ipfs://QmaPjtvkpLbwWvGAFjp9GgvXCFFJPVN9VGWD36zoRpd8Sq.json');
    api.disconnect();
    done();
  });
});
