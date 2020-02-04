// Copyright 2019 Centrality Investments Limited
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

// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {AssetId, AssetOptions, FeeExchangeV1} from '@cennznet/types';
import {SimpleKeyring, Wallet} from '@cennznet/wallet';
import {SubmittableResult} from '@polkadot/api';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import {ChargeTransactionPayment, FeeExchange} from '@cennznet/types/runtime/transaction-payment';
import {Enum, Option, getTypeRegistry as registry} from '@polkadot/types';
// import {getTypeRegistry} from '@polkadot/types';
import {CennzxSpot} from '@cennznet/crml-cennzx-spot/CennzxSpot';
import ExtrinsicV2 from '@cennznet/types/extrinsic/v2/Extrinsic';

// const sender_on_rimu = {
//     address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
//     uri: '//cennznet-js-test',
// };

const sender = {
  address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  uri: '//Alice',
};
const receiver = {
  address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
};
const passphrase = 'passphrase';
const CENNZ = '16000'

async function addLiquidity(cennzxSpot: CennzxSpot) {
  // return addLiquidity;
  const poolAssetBalance = await cennzxSpot.getPoolAssetBalance(CENNZ);
  const poolCoreBalance = await cennzxSpot.getPoolCoreAssetBalance(CENNZ);
  console.log('Asset balance:', poolAssetBalance.toString());
  console.log('Core balance:', poolCoreBalance.toString());
}

describe('e2e transactions', () => {
  let api;

  beforeAll(async () => {
    await cryptoWaitReady();
    api = await initApiPromise();
    const simpleKeyring: SimpleKeyring = new SimpleKeyring();
    simpleKeyring.addFromUri(sender.uri);
    const wallet = new Wallet();
    await wallet.createNewVault(passphrase);
    await wallet.addKeyring(simpleKeyring);
    api.setSigner(wallet);
  });

  afterAll(async () => {
    api.disconnect();
  });

  describe('Send()', () => {
    it('makes a tx using immortal era', async done => {
      // const opt = {era: '0x00', blockHash: api.genesisHash};
      // transfer
      await api.tx.genericAsset
        .transfer(16000, receiver.address, 1)
        .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
    }, 10000000);

    it('makes a tx via send', async done => {
      const simpleKeyring: SimpleKeyring = new SimpleKeyring();
      const senderKeypair = simpleKeyring.addFromUri(sender.uri);
      const nonce = await api.query.system.accountNonce(senderKeypair.address);
      // transfer
      const tx = api.tx.genericAsset.transfer(16000, receiver.address, 1).sign(senderKeypair, {nonce});
      await tx.send(async ({events, status}: SubmittableResult) => {
        if (status.isFinalized) {
          expect(events[0].event.method).toEqual('Transferred');
          expect(events[0].event.section).toEqual('genericAsset');
          done();
        }
      });
    });

    it('makes a tx', async done => {
      const assetBalance = await api.query.genericAsset.freeBalance(16001, sender.address);
      console.log('Balance before:', assetBalance.toString());
      // transfer
      await api.tx.genericAsset
        .transfer(16000, receiver.address, 1)
        .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            console.log('Completed at block hash', status.value.toHex());
            console.log('Events:');

            events.forEach(({phase, event: {data, method, section}}) => {
              console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
            api.query.genericAsset.freeBalance(16001, sender.address).then(bal => console.log('After balance:', bal.toString()));
            done();
          }
        });
    });

    it.skip('makes a tx with statusCb', async done => {
      const totalSupply = 100;
      const assetIdBefore = (await api.query.genericAsset.nextAssetId()) as AssetId;
      const reservedIdStart: number = 17000;
      const assetOptions = new AssetOptions({
        initialIssuance: totalSupply,
        permissions: {
          update: null,
          mint: null,
          burn: null,
        },
      });
      // transfer
      await api.tx.genericAsset
        .create(assetOptions)
        .signAndSend(sender.address, async ({events, status}: SubmittableResult) => {
          if (status.isFinalized) {
            const assetIdAfter = (await api.query.genericAsset.nextAssetId()) as AssetId;
            // expect
            expect(assetIdAfter.gt(assetIdBefore)).toBeTruthy();
            expect(Number(assetIdAfter.toString())).toBeGreaterThan(reservedIdStart);
            expect(Number(assetIdBefore.toString())).toBeGreaterThan(reservedIdStart);
            done();
          }
        });
    });

    describe('feeExchange extrinsic', () => {
      it('use keypair to sign', async done => {
        const simpleKeyring: SimpleKeyring = new SimpleKeyring();
        const senderKeypair = simpleKeyring.addFromUri(sender.uri);

        // Check if there is liquidity in the pool
        addLiquidity(api.cennzxSpot);
        const feeExchangeV1 = {
          assetId: '16002',
          maxPayment: '500000000',
        };
        // const transactionPayment = {
        //   tip: '2', feeExchange:  new Option(FeeExchangeV1, {FeeExchangeV1: feeExchangeV1}),
        // };

        const transactionPayment = {
          tip: '2', feeExchange:  {FeeExchangeV1: feeExchangeV1},
        };

        console.log('Transaction payment:', transactionPayment);
        const assetBalance = await api.query.genericAsset.freeBalance(16002, sender.address);
        console.log('Balance before:', assetBalance.toString());
        return api.tx.genericAsset
          .transfer(16001, receiver.address, 1)
          .signAndSend(senderKeypair, {transactionPayment}, ({events, status}) => {
            console.log('Transaction status:', status.type);
            if (status.isFinalized) {
              console.log('Completed at block hash', status.value.toHex());
              console.log('Events:');

              events.forEach(({phase, event: {data, method, section}}) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
              });
              api.query.genericAsset.freeBalance(16002, sender.address).then(bal => console.log('After balance:', bal.toString()));
              done();
            }
          });
      });

      it('use signer', async done => {
        const feeExchange = {
            assetId: '16002',
            maxPayment: '500000000',
          };
        // const feeExchangeV1 = new Option(
        //   FeeExchangeV1, feeExchange);
        const transactionPayment = {
          tip: 2,
          feeExchange:  {
            FeeExchangeV1: feeExchange
          },
        };

        console.log('Transaction payment:', transactionPayment);
        const tx = api.tx.genericAsset.transfer(16001, receiver.address, 100);
       // console.log('submittable extrinsic:', tx);
       //  console.log('submittable extrinsic encoded:', tx.toU8a());
        // const assetBalance = await api.query.genericAsset.freeBalance(16002, sender.address);
        // console.log('Balance before:', assetBalance.toString());
        // //tx.addFeeExchangeOpt()
        return tx.signAndSend(sender.address, {transactionPayment}, ({events, status}) => {
          console.log('Transaction status:', status.type);
          if (status.isFinalized) {
            console.log('Completed at block hash', status.value.toHex());
            console.log('Events:');

            events.forEach(({phase, event: {data, method, section}}) => {
              console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
        //    api.query.genericAsset.freeBalance(16002, sender.address).then(bal => console.log('After balance:', bal.toString()));
            done();
          }
        });
        console.log('Decode extrinsic:', ExtrinsicV2.decodeExtrinsic(tx.toU8a()))
      });
    });
  });
});
