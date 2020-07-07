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

/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {Hash} from '@polkadot/types/interfaces';
import {AssetOptions, AssetInfo} from '@cennznet/types';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import {Keyring} from '@polkadot/api';
import testKeyring from '@polkadot/keyring/testing';
import initApiPromise from '../../../../jest/initApiPromise';
import {u8aToString} from '@polkadot/util';

describe('e2e queries', () => {
  let api, alice, bob;

  beforeAll(async () => {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');
    api = await initApiPromise();
  });

  afterAll(async done => {
    if (api) {
      return await api.disconnect();
    }
    api = null;
    done();
  });

  describe('Query storage', () => {
    it('makes the runtime, rpc, state & extrinsics available', (): void => {
      expect(api.genesisHash).toBeDefined();
      expect(api.runtimeMetadata).toBeDefined();
      expect(api.runtimeVersion).toBeDefined();
      expect(api.rpc).toBeDefined();
      expect(api.query).toBeDefined();
      expect(api.tx).toBeDefined();
      expect(api.derive).toBeDefined();
    });
  });

  describe('Query storage using at', () => {
    it('queries correct balance', async () => {
      const nextAssetId = await api.query.genericAsset.nextAssetId();
      const blockHash: Hash = (await api.rpc.chain.getBlockHash()) as Hash;
      const nextAssetIdAt = await api.query.genericAsset.nextAssetId.at(blockHash);
      expect(nextAssetId.toString()).toEqual(nextAssetIdAt.toString());
    });

    it('check transaction payment', async done => {

      const assetBalance = await api.query.genericAsset.freeBalance(16001, bob.address);
      console.log('Balance before ',assetBalance.toString());
      const nonce = await api.query.system.accountNonce(alice.address);
      const ex = await api.tx.genericAsset
        .transfer(16000, bob.address, 100);
      const payment =  await api.rpc.payment.queryInfo(ex.toHex());
      console.log('Payment:', payment.partialFee.toString());
      done();
    }, 10000000);
  });

  describe('Subscribe storage', () => {
    let unsubscribeFn;
    it('emits events when storage changes', async done => {
      const totalSupply = 100;
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
      const keyring = testKeyring();
      // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
      const sudoPair = keyring.getPair(sudoKey.toString());

      await api.tx.sudo
        .sudo(api.tx.genericAsset
          .create(alice.address,
            new AssetOptions(
              api.registry,
              {
                initialIssuance: 0,
                permissions: {
                  update: null,
                  mint: null,
                  burn: null,
                },
              }),
              new AssetInfo(
                  api.registry,
                  {
                      symbol: 'SYLO',
                      decimalPlaces: 3
                  }
              )
          ))
        .signAndSend(sudoPair);
    }, 12000);
  });

  describe('GA rpc calls', () => {
    it("Get generic asset registeredAssets through RPC call", async done => {
       const registeredAsset = await api.rpc.genericAsset.registeredAssets();
       expect(registeredAsset.length).toBeGreaterThan(0);
       const [cpayAssetId, cpayAssetInfo] = registeredAsset[0];
       const [cennzAssetId, cennzAssetInfo] = registeredAsset[1];
       expect(cpayAssetId.toString()).toBe('16001');
       expect(u8aToString(cpayAssetInfo.symbol)).toBe('CPAY');
       expect(cpayAssetInfo.decimalPlaces.toString()).toBe('0');
       expect(cennzAssetId.toString()).toBe('16000');
       expect(u8aToString(cennzAssetInfo.symbol)).toBe('CENNZ');
       expect(cennzAssetInfo.decimalPlaces.toString()).toBe('0');
       done();
    });
  });
});
