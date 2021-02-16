// Copyright 2019-2020 Centrality Investments Limited
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

import { Api as ApiPromise } from "@cennznet/api";
import { AssetInfo, AssetOptions, Hash } from "@cennznet/types";
import { SubmittableResult } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import config from '../../../../config';

const keyring = new Keyring({ type: 'sr25519' });

describe('runtime v36 compatibility', () => {
  let api;
  let alice, bob;
  let stakingAssetId;

  beforeAll(async () => {
    await cryptoWaitReady();
    const provider = process.env.TEST_TYPE?.toLowerCase() === 'integration' ? config.wsProvider.integrationV36 : 'ws://localhost:9945';
    api = await ApiPromise.create({ provider });
    console.log(`Ensure a node running v36 runtime is available at ${provider}`)
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');

    stakingAssetId = await api.query.genericAsset.stakingAssetId();
  });

  afterAll(async () => {
    await api.disconnect();
  });

  describe('Make transactions', () => {

    it('sign then send', async done => {
      const nonce = await api.rpc.system.accountNextIndex(bob.address);
      const tx = api.tx.genericAsset
        .transfer(stakingAssetId, alice.address, 1)
        .sign(bob, { nonce });
      await tx.send(async ({ events, status }: SubmittableResult) => {
        if (status.isInBlock) {
          expect(events[0].event.method).toEqual('Transferred');
          expect(events[0].event.section).toEqual('genericAsset');
          done();
        }
      });
    });

    it('signAndSend', async done => {
      await api.tx.genericAsset
        .transfer(stakingAssetId, alice.address, 1)
        .signAndSend(bob, async ({ events, status }: SubmittableResult) => {
          if (status.isInBlock) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
    });

    it('with immortal era and nonce', async done => {
        const nonce = await api.rpc.system.accountNextIndex(bob.address);
        await api.tx.genericAsset
          .transfer(stakingAssetId, alice.address, 100)
          .signAndSend(bob, { nonce },
            async ({ events, status }: SubmittableResult) => {
              if (status.isInBlock) {
                expect(events[0].event.method).toEqual('Transferred');
                expect(events[0].event.section).toEqual('genericAsset');
                done();
              }
            });
      });

    });

    describe('Make queries', () => {
        it('Queries runtime, rpc, state & extrinsics', (): void => {
            expect(api.genesisHash).toBeDefined();
            expect(api.runtimeMetadata).toBeDefined();
            expect(api.runtimeVersion).toBeDefined();
            expect(api.rpc).toBeDefined();
            expect(api.query).toBeDefined();
            expect(api.tx).toBeDefined();
            expect(api.derive).toBeDefined();
        });

        it('Queries correct balance', async () => {
            const nextAssetId = await api.query.genericAsset.nextAssetId();
            const blockHash = (await api.rpc.chain.getBlockHash()) as Hash;
            const nextAssetIdAt = await api.query.genericAsset.nextAssetId.at(blockHash);
            expect(nextAssetId.toString()).toEqual(nextAssetIdAt.toString());
        });

        it('Checks transaction payment', async done => {
            const assetBalance = await api.query.genericAsset.freeBalance(16001, bob.address);
            console.log('Balance before ', assetBalance.toString());
            const ex = await api.tx.genericAsset
            .transfer(16000, bob.address, 100);
            const payment = await api.rpc.payment.queryInfo(ex.toHex());
            console.log('Payment:', payment.partialFee.toString());
            done();
        });

        it('Emits events when storage changes', async done => {
            let unsubscribeFn;
            let count = 0;
            const reservedIdStart: number = 17000;
            unsubscribeFn = await api.query.genericAsset.nextAssetId((result: any) => {
            if (count === 0) {
                expect(result.toNumber()).toBeGreaterThanOrEqual(reservedIdStart);
                count += 1;
            } else {
                expect(result.toNumber()).toBeGreaterThanOrEqual(reservedIdStart);
                unsubscribeFn();
                done();
            }
            });
            const sudoKey = await api.query.sudo.key();
            const keyring = new Keyring({ type: 'sr25519' });
            keyring.addFromUri('//Alice');
            // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
            const sudoPair = keyring.getPair(sudoKey.toString());
            const owner = api.registry.createType('Owner', 0); // Owner type is enum with 0 as none/null
            const permissions = api.registry.createType('PermissionsV1', { update: owner, mint: owner, burn: owner});
            const option = {initialIssuance : 0, permissions};
            const assetOption: AssetOptions = api.registry.createType('AssetOptions', option);
            const assetInfo: AssetInfo = api.registry.createType('AssetInfo', {symbol: 'SYLO', decimalPlaces: 3});
            await api.tx.sudo
            .sudo(api.tx.genericAsset
                .create(alice.address,
                assetOption,
                assetInfo
                ))
            .signAndSend(sudoPair);
        }, 12000);
    });

});
