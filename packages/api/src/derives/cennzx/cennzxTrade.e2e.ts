// // Copyright 2019-2020 Centrality Investments Limited
// //
// // Licensed under the Apache License, Version 2.0 (the "License");
// // you may not use this file except in compliance with the License.
// // You may obtain a copy of the License at
// //
// //     http://www.apache.org/licenses/LICENSE-2.0
// //
// // Unless required by applicable law or agreed to in writing, software
// // distributed under the License is distributed on an "AS IS" BASIS,
// // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// // See the License for the specific language governing permissions and
// // limitations under the License.
//
// import BN from 'bn.js';
// import { AssetInfo, AssetOptions } from '@cennznet/types';
// import testKeyring from '@polkadot/keyring/testing';
// import { cryptoWaitReady } from '@polkadot/util-crypto';
//
// import initApiPromise from '../../../../../jest/initApiPromise';
//
// const keyring = testKeyring({ type: 'sr25519' });
//
// describe('Cennzx Operations', () => {
//   let api;
//   let alice, bob, charlie, sudoKeypair, nonce;
//   let coreAssetId, assetA, assetB;
//
//   beforeAll(async done => {
//     await cryptoWaitReady();
//     alice = keyring.addFromUri('//Alice');
//     bob = keyring.addFromUri('//Bob');
//     charlie = keyring.addFromUri('//Charlie');
//
//     api = await initApiPromise();
//
//     coreAssetId = await api.query.cennzx.coreAssetId();
//     // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
//     const sudoAddress = await api.query.sudo.key();
//     sudoKeypair = keyring.getPair(sudoAddress.toString());
//     done();
//   });
//
//   afterAll(async () => {
//     await api.disconnect();
//   });
//
//   describe('Liquidity Operations', () => {
//     it("Add liquidity for tradeAsset 'A' to the pool", async done => {
//       // Create a new Asset 'A' and add liquidity to it
//       // Amount of test asset - 'A' to create
//       const initialIssuance = 900_000_000_000;
//
//       const createAssetTx1 = api.tx.genericAsset.create(
//         alice.address,
//         new AssetOptions(api.registry, {
//           initialIssuance,
//           permissions: {
//             update: alice.address,
//           },
//         }),
//         new AssetInfo(api.registry, { symbol: 'A', decimalPlaces: 18 })
//       );
//
//       nonce = await api.query.system.accountNonce(sudoKeypair.address);
//       // when the new asset is created it will have this ID.
//       assetA = await api.query.genericAsset.nextAssetId();
//       // Create new asset
//       const assetCreated = new Promise(async resolve => {
//         await api.tx.sudo
//           .sudo(createAssetTx1)
//           .signAndSend(sudoKeypair, { nonce: nonce++ }, async ({ status }) => (status.isInBlock ? resolve() : null));
//       });
//       // AddLiquidity for the 'A' asset
//       assetCreated.then(async () => {
//         const assetBalance = await api.query.genericAsset.freeBalance(assetA, alice.address);
//         const investmentAmount = new BN(assetBalance.toString()).divn(2);
//         const coreAmount = investmentAmount; // Initial investment - core amount same as invested amount
//         const minLiquidity = 1;
//         await api.tx.cennzx
//           .addLiquidity(assetA, minLiquidity, investmentAmount, coreAmount)
//           .signAndSend(alice, { nonce: nonce++ }, async ({ events, status }) => {
//             if (status.isFinalized) {
//               for (const { event } of events) {
//                 if (event.method === 'AddLiquidity') {
//                   const [account, coreInvestAmount, assetIdFromChain, targetInvestAmount] = event.data;
//                   expect(account.toString()).toEqual(alice.address);
//                   expect(assetIdFromChain.toString()).toEqual(assetA.toString());
//                   expect(coreInvestAmount.toString()).toEqual(coreAmount.toString());
//                   expect(new BN(targetInvestAmount).lte(new BN(investmentAmount))).toBeTruthy();
//                   const liquidity = await api.derive.cennzx.liquidityBalance(assetA, alice.address);
//                   expect(liquidity.gtn(0)).toBeTruthy();
//                   done();
//                 }
//               }
//             }
//           });
//       });
//     });
//
//     it("Add liquidity for tradeAsset 'B' to the pool", async done => {
//       // Amount of test asset - 'B' to create
//       const initialIssuance = 900_000_000_00;
//       const createAssetTx2 = api.tx.genericAsset.create(
//         bob.address,
//         new AssetOptions(api.registry, { initialIssuance, permissions: { update: bob.address } }),
//         new AssetInfo(api.registry, { symbol: 'B', decimalPlaces: 18 })
//       );
//       // when the new asset is created it will have this ID.
//       assetB = await api.query.genericAsset.nextAssetId();
//       // Create new asset
//       const assetCreated = new Promise(async (resolve, reject) => {
//         await api.tx.sudo
//           .sudo(createAssetTx2)
//           .signAndSend(sudoKeypair, { nonce: nonce++ }, async ({ status }) => (status.isInBlock ? resolve() : null));
//       });
//       // AddLiquidity for the 'B' asset
//       assetCreated.then(async () => {
//         const assetBalance = await api.query.genericAsset.freeBalance(assetB, bob.address);
//         const investmentAmount = new BN(assetBalance.toString()).divn(2);
//         const coreAmount = investmentAmount;
//         const minLiquidity = 1;
//         await api.tx.cennzx
//           .addLiquidity(assetB, minLiquidity, investmentAmount, coreAmount)
//           .signAndSend(bob, async ({ events, status }) => {
//             if (status.isFinalized) {
//               for (const { event } of events) {
//                 if (event.method === 'AddLiquidity') {
//                   const [account, coreInvestAmount, assetIdFromChain, targetInvestAmount] = event.data;
//                   expect(account.toString()).toEqual(bob.address);
//                   expect(assetIdFromChain.toString()).toEqual(assetB.toString());
//                   expect(coreInvestAmount.toString()).toEqual(coreAmount.toString());
//                   expect(new BN(targetInvestAmount).lte(new BN(investmentAmount))).toBeTruthy();
//                   const liquidity = await api.derive.cennzx.liquidityBalance(assetB, bob.address);
//                   expect(liquidity.gtn(0)).toBeTruthy();
//                   done();
//                 }
//               }
//             }
//           });
//       });
//     });
//   });
//
//   describe('Trading Operations', () => {
//     it('Can trade from asset to core for exact core asset amount', async done => {
//       const recipient = null; // in which case the caller receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = coreAssetId;
//       const amountBought = 50;
//       const expectedPrice = await api.rpc.cennzx.buyPrice(assetToBuy, amountBought, assetToSell);
//       const buffer = 100;
//       const maxAmountSold = expectedPrice.addn(buffer); // Maximum of assetA willing to pay for the exchange
//       // sell assetA to buy coreAsset
//       await api.tx.cennzx
//         .buyAsset(recipient, assetToSell, assetToBuy, amountBought, maxAmountSold)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const price = event.data[3];
//                 expect(price.eq(expectedPrice)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//     it('Can trade from core to asset for exact trade asset amount', async done => {
//       const recipient = null; // in which case the caller receives the exchanged amount
//       const assetToSell = coreAssetId;
//       const assetToBuy = assetA;
//       const amountBought = 50;
//       const expectedPrice = await api.rpc.cennzx.buyPrice(assetToBuy, amountBought, assetToSell);
//       const buffer = 100;
//       const maxAmountSold = expectedPrice.addn(buffer); // Maximum of coreAsset willing to pay for the exchange
//       // sell assetA to buy coreAsset
//       await api.tx.cennzx
//         .buyAsset(recipient, assetToSell, assetToBuy, amountBought, maxAmountSold)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const price = event.data[3];
//                 expect(price.eq(expectedPrice)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Can trade from core to asset for exact core asset amount', async done => {
//       const recipient = null; // in which case the caller receives the exchanged amount
//       const assetToSell = coreAssetId;
//       const assetToBuy = assetA;
//       const sellAmount = 50;
//       const expectedAssetPrice = await api.rpc.cennzx.sellPrice(assetToSell, sellAmount, assetToBuy);
//       const minSale = 1;
//       await api.tx.cennzx
//         .sellAsset(recipient, assetToSell, assetToBuy, sellAmount, minSale)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const sellValue = event.data[4];
//                 expect(sellValue.eq(expectedAssetPrice)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Get core asset from seller and transfer trade asset to charlie for exact trade asset amount', async done => {
//       const recipient = charlie.address; // in which case the bob receives the exchanged amount
//       const assetToSell = coreAssetId;
//       const assetToBuy = assetA;
//       const sellAmount = 50;
//       const expectedPrice = await api.rpc.cennzx.sellPrice(assetToSell, sellAmount, assetToBuy);
//       const minSale = 1;
//       const recipientBalaneBefore = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//       await api.tx.cennzx
//         .sellAsset(recipient, assetToSell, assetToBuy, sellAmount, minSale)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const sellValue = event.data[4];
//                 expect(sellValue.eq(expectedPrice)).toBeTruthy();
//                 const recipientBalaneAfter = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//                 expect(
//                   new BN(recipientBalaneBefore).add(new BN(sellValue)).eq(new BN(recipientBalaneAfter))
//                 ).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Can trade from asset to core for exact trade asset amount', async done => {
//       const recipient = null; // in which case the caller receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = coreAssetId;
//       const sellAmount = 50;
//       const expectedCorePrice = await api.rpc.cennzx.sellPrice(assetToSell, sellAmount, assetToBuy);
//       const minSale = 1;
//       await api.tx.cennzx
//         .sellAsset(recipient, assetToSell, assetToBuy, sellAmount, minSale)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const sellValue = event.data[4];
//                 expect(sellValue.eq(expectedCorePrice)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Get trade asset from seller and transfer core asset to charlie for exact trade asset amount', async done => {
//       const recipient = charlie.address; // in which case the charlie receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = coreAssetId;
//       const sellAmount = 50;
//       const expectedPrice = await api.rpc.cennzx.sellPrice(assetToSell, sellAmount, assetToBuy);
//       const recipientBalaneBefore = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//       const minSale = 1;
//       await api.tx.cennzx
//         .sellAsset(recipient, assetToSell, assetToBuy, sellAmount, minSale)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const sellValue = event.data[4];
//                 expect(sellValue.eq(expectedPrice)).toBeTruthy();
//                 const recipientBalaneAfter = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//                 expect(
//                   new BN(recipientBalaneBefore).add(new BN(sellValue)).eq(new BN(recipientBalaneAfter))
//                 ).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Get trade asset from buyer and transfer core asset to charlie for exact core asset amount', async done => {
//       const recipient = charlie.address; // in which case bob receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = coreAssetId;
//       const amountBought = 50;
//       const expectedAssetPrice = await api.rpc.cennzx.buyPrice(assetToBuy, amountBought, assetToSell);
//       const recipientBalaneBefore = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//       const buffer = 100;
//       const maxAmountSold = expectedAssetPrice.addn(buffer); // Maximum of coreAsset willing to pay for the exchange
//       await api.tx.cennzx
//         .buyAsset(recipient, assetToSell, assetToBuy, amountBought, maxAmountSold)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const price = event.data[3];
//                 expect(price.eq(expectedAssetPrice)).toBeTruthy();
//                 const recipientBalaneAfter = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//                 expect(
//                   new BN(recipientBalaneBefore).add(new BN(amountBought)).eq(new BN(recipientBalaneAfter))
//                 ).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Get core asset from buyer and transfer trade asset to charlie for exact trade asset amount', async done => {
//       const recipient = charlie.address; // in which case charlie receives the exchanged amount
//       const assetToSell = coreAssetId;
//       const assetToBuy = assetA;
//       const amountBought = 50;
//       const expectedPrice = await api.rpc.cennzx.buyPrice(assetToBuy, amountBought, assetToSell);
//       const recipientBalaneBefore = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//       const buffer = 100;
//       const maxAmountSold = expectedPrice.addn(buffer); // Maximum willing to pay for the exchange
//       await api.tx.cennzx
//         .buyAsset(recipient, assetToSell, assetToBuy, amountBought, maxAmountSold)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const price = event.data[3];
//                 expect(price.eq(expectedPrice)).toBeTruthy();
//                 const recipientBalaneAfter = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//                 expect(
//                   new BN(recipientBalaneBefore).add(new BN(amountBought)).eq(new BN(recipientBalaneAfter))
//                 ).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Can trade from asset "A" to asset "B" with exact asset B amount and max A amount', async done => {
//       const recipient = null; // in which case the caller receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = assetB;
//       const amountBought = 50;
//       const expectedPrice = await api.rpc.cennzx.buyPrice(assetToBuy, amountBought, assetToSell);
//       const buffer = 100;
//       const maxAmountSold = expectedPrice.addn(buffer); // Maximum willing to pay for the exchange
//       await api.tx.cennzx
//         .buyAsset(recipient, assetToSell, assetToBuy, amountBought, maxAmountSold)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const price = event.data[3];
//                 expect(price.eq(expectedPrice)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Can trade from asset "A" to asset "B" with exact asset B amount and max A amount and transfer asset "B" to charlie', async done => {
//       const recipient = charlie.address; // in which case the charlie receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = assetB;
//       const amountBought = 50;
//       const expectedPrice = await api.rpc.cennzx.buyPrice(assetToBuy, amountBought, assetToSell);
//       const buffer = 100;
//       const maxAmountSold = expectedPrice.addn(buffer); // Maximum willing to pay for the exchange
//       const recipientBalaneBefore = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//       await api.tx.cennzx
//         .buyAsset(recipient, assetToSell, assetToBuy, amountBought, maxAmountSold)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 // check if ExtrinsicFailed or successful
//                 const price = event.data[3];
//                 expect(price.eq(expectedPrice)).toBeTruthy();
//                 const recipientBalaneAfter = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//                 expect(
//                   new BN(recipientBalaneBefore).add(new BN(amountBought)).eq(new BN(recipientBalaneAfter))
//                 ).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Can trade from asset "A" to asset "B" with exact asset A amount and min B amount', async done => {
//       const recipient = null; // in which case the caller receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = assetB;
//       const sellAmount = 50;
//       const expectedPrice = await api.rpc.cennzx.sellPrice(assetToSell, sellAmount, assetToBuy);
//       const minSale = 1;
//       await api.tx.cennzx
//         .sellAsset(recipient, assetToSell, assetToBuy, sellAmount, minSale)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 //check if ExtrinsicFailed or successful
//                 const sellValue = event.data[4];
//                 expect(sellValue.eq(expectedPrice)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//
//     it('Can trade from asset "A" to asset "B" with exact asset A amount and min B amount and transfer asset "B" to charlie', async done => {
//       const recipient = charlie.address; // in which case the charlie receives the exchanged amount
//       const assetToSell = assetA;
//       const assetToBuy = assetB;
//       const sellAmount = 50;
//       const expectedPrice = await api.rpc.cennzx.sellPrice(assetToSell, sellAmount, assetToBuy);
//       const minSale = 1;
//       const recipientBalaneBefore = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//       await api.tx.cennzx
//         .sellAsset(recipient, assetToSell, assetToBuy, sellAmount, minSale)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'AssetPurchase') {
//                 //check if ExtrinsicFailed or successful
//                 const sellValue = event.data[4];
//                 expect(sellValue.eq(expectedPrice)).toBeTruthy();
//                 const recipientBalaneAfter = await api.query.genericAsset.freeBalance(assetToBuy, recipient);
//                 expect(
//                   new BN(recipientBalaneBefore).add(new BN(sellValue)).eq(new BN(recipientBalaneAfter))
//                 ).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//   });
//
//   describe('Queries', () => {
//     it('Get Pool trade asset balance', async () => {
//       const poolAssetBalance = await api.derive.cennzx.poolAssetBalance(assetA);
//       const poolCoreBalance = await api.derive.cennzx.poolCoreAssetBalance(assetA);
//       expect(poolAssetBalance.gtn(0)).toBeTruthy();
//       expect(poolCoreBalance.gtn(0)).toBeTruthy();
//     });
//   });
//
//   describe('Remove liquidity', () => {
//     it("Remove liquidity and receive 'RemoveLiquidity' event", async done => {
//       const totalLiquidityBefore = await api.derive.cennzx.totalLiquidity(assetA);
//       const removeLiquidity = 10;
//       expect(totalLiquidityBefore.gtn(removeLiquidity)).toBeTruthy();
//       const { coreAmount, assetAmount } = await api.derive.cennzx.assetToWithdraw(assetA, removeLiquidity);
//       const minAssetWithdraw = 1;
//       const minCoreWithdraw = 1;
//       await api.tx.cennzx
//         .removeLiquidity(assetA, removeLiquidity, minAssetWithdraw, minCoreWithdraw)
//         .signAndSend(alice, async ({ events, status }) => {
//           if (status.isFinalized && events !== undefined) {
//             for (const { event } of events) {
//               if (event.method === 'RemoveLiquidity') {
//                 const totalLiquidity = await api.derive.cennzx.totalLiquidity(assetA);
//                 expect(totalLiquidityBefore.subn(removeLiquidity).eq(totalLiquidity)).toBeTruthy();
//                 const coreFromEvent = event.data[1];
//                 const assetFromEvent = event.data[3];
//                 expect(assetFromEvent.eq(assetAmount)).toBeTruthy();
//                 expect(coreFromEvent.eq(coreAmount)).toBeTruthy();
//                 done();
//               }
//             }
//           }
//         });
//     });
//   });
// });
