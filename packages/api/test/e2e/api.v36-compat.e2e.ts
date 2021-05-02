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
import { AssetInfo, AssetOptions, Hash, Vec } from "@cennznet/types";
import { SubmittableResult } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { Extrinsic, SignedBlock } from "@polkadot/types/interfaces";
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

    it('Decodes historical block', async () => {
      // Historic Azalea block at runtime version 36
      // const blockNumber = 3_759_962;
      // const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
      // const blockData = await api.rpc.chain.getBlock(blockHash);
      const blockData = '0xfa2e4adafba31c4c6896dbdde89eebd1f7bdadb538b2e298b79e1f6a650bb3f06a7de5006d7bc76ce4eea7fc305a184e0a9c2958f99be433efd3297f888d9c5bba6525ea78dee7e2e6843dbefd2ccf39d7f20eb36885a6cb8a470991118dc91dcbdf9f0408064241424534020200000027d0231300000000054241424501017e64c7338882cd6234c9a02977ab4b69225ddfae505a2bc1bb6448bc1d482933410055a25bc06b2f5078f62ceae15fd0fa11c0de6810efebfa63e92b7bb3948f10280403000bb87979d375011c040d00567de5007d1084279c189eea1903bef20270c8e4a4665c32491c5aa2688db4a399b974abfece0400ca3acf0ca075e1464426527555f931faeb9a988927eee0012dafade655d2782e5e3e86c870483134171fef4fa269fef97c09ae9776b2cd9568fdb87d1edcc60400000c0000170143db2b0c14ed0208c3b6af61122808b59dc9960a122087b8a78b70b45c6788478cafd0f8bb1df89e8a9d0b955039b011cc345effff7918add3dcbd0922208aa16a5637bdd13ec0f70eca8bee2ec72311805468b6826c1346d5d268b7c2312a4035e9a36ce8ea11e9197bc82bd7a80d80a7fff20d39de887f65b673b6c51c087a8237a92dcee91119b9aff7b3ecb1cc318c3138dbe2e91c23fe2b31357501b10a3220472a92bf334d38036a6a2c47d484c468afed993158d8a1d68fb3f5342bcac935ed0208c3b6af61122808aeecfbf9021220810c953a389c4903d731803a92c1da7cfcb5991591d19935087621406f12ad4018b083e39a0e222084104e1a0495bf3d36e7f599b9a82f3767255e02fb3f2b7a59db5e04650aa2572a40f9f21ab97699ec761386f8e4931093ef6ccd6434e6e8af91c9dbe77bf7884f408d2d2b59dd829df551ee9160a740f966e6cec02fcf78a170551495bae9447e023220472a92bf334d38036a6a2c47d484c468afed993158d8a1d68fb3f5342bcac935ed0208c3b6af61122808968cf6da011220624c692e370df7f4e1c4f7c98b478667e33ad379e12fc99129c7b9b2c4689e7c18ba9dfefe062220d669fad71c48137c2f81fa97431439c193c85793288c76649f54f66e68603c322a405b3083df6f94c2c5c5bd9a4bae9e9776aeea4db98849ea14d26bdf8f284bbe447c8b2779b228b5902dd5a2b2df12b0163885b5a74b365d732b47c4f0ac8cb0093220472a92bf334d38036a6a2c47d484c468afed993158d8a1d68fb3f5342bcac935ed0208c3b6af61122808a0d38bdc0c1220ad99c3c4b59a9ff086cd2edb88cf2afa51083ce14d16fc3bd521eac5c9d1f11518b4eaeac8022220e67fe38661477df7d6f2665ba3a175981fc5e4cb1b01906b210552960ce2ba232a408b2e3fac2aa11d55ee06e1ed4a2b087a6a06fcc9708ccfd8d1fc76911c179a282cf18532577dec3d2559649e0141975f2650a88ec55f97880e667e92754e450a3220472a92bf334d38036a6a2c47d484c468afed993158d8a1d68fb3f5342bcac935ed0208c3b6af6112280886e682f40e12206b53762dc162769378d4ea4df6c34a29712c3260345dd50686c7254cf5c016b218dbe9d9f1092220164e845e59bca4662b5181121abb0768ca195aaf6470e8a6834032f79a1eddd82a408211393a834a5a58bd8d6cf63f700c494cdfef1f2f5c82d6464bc3792ce0e6ed61e4408847686928bf49922491a15e7766c92255fee7b914dfcf4947a39aef063220472a92bf334d38036a6a2c47d484c468afed993158d8a1d68fb3f5342bcac935290284279c189eea1903bef20270c8e4a4665c32491c5aa2688db4a399b974abfece0400d473e5f2a0f6f5e854cd57087736c891c31c5ca71183592b85bc83f2916acdb3caaf30798d3dd80ce39b76abd4130c2c391353a8603d9ebc217bd7da630ca40300001000001702bd3881b15d54d31071e9932b600710be48ffaa9e1f402ea2169216e735e532640000';
      const block: SignedBlock = api.createType('SignedBlock', blockData);
      expect(block.block.header.toHex()).toBe('0xc7f53f0070d9d9b593106fcd766ed6f2c85be44ca5e0511b9944e91d08f2164f');

      const extrinsicList: Vec<Extrinsic> = block.block.extrinsics;
      expect(extrinsicList[0].method.section).toEqual('timestamp');
      expect(extrinsicList[0].method.method).toEqual('set');
      expect(extrinsicList[1].method.section).toEqual('finalityTracker');
      expect(extrinsicList[1].method.method).toEqual('finalHint');
      expect(extrinsicList[2].method.section).toEqual('syloE2Ee');
      expect(extrinsicList[2].method.method).toEqual('replenishPkbs');
      expect(extrinsicList[3].method.section).toEqual('syloE2Ee');
      expect(extrinsicList[3].method.method).toEqual('withdrawPkbs');
    });
  
    it('Queries historical block events', async done => {
      // This will make a tx to generate some events, then request the block events after the fact.

      const checkBlockEvents = async function test(blockHash: string) {
        const events = await api.query.system.events.at(blockHash);
        const totalEvents = events.length;
        expect(totalEvents).toEqual(4);
        // Timestamp intrinsic success
        expect(events[0].event.section).toEqual('system');
        expect(events[0].event.method).toEqual('ExtrinsicSuccess');
        expect(events[1].event.section).toEqual('genericAsset');
        expect(events[1].event.method).toEqual('Transferred');
        // GA transfer extrinsic success
        expect(events[2].event.section).toEqual('system');
        expect(events[2].event.method).toEqual('ExtrinsicSuccess');
        // Finality tracker intrinsic success
        expect(events[3].event.section).toEqual('system');
        expect(events[3].event.method).toEqual('ExtrinsicSuccess');
        done();
      };

      await api.tx.genericAsset.transfer(16000, bob.address, 5).signAndSend(alice, async (result) => {
        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
          const blockHash = result.status.asInBlock;
          await checkBlockEvents(blockHash);
        }
      });
    });
});
