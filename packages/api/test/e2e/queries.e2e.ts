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
import {Wallet, SimpleKeyring} from '@cennznet/wallet';
import {Hash} from '@polkadot/types/interfaces';
import {AssetOptions} from '@cennznet/types';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import testingPairs from '@polkadot/keyring/testingPairs';

// const sender_for_rimu = {
//     address: '5DXUeE5N5LtkW97F2PzqYPyqNkxqSWESdGSPTX6AvkUAhwKP',
//     uri: '//cennznet-js-test',
// };

const sender = {
  address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  uri: '//Alice',
};
const receiver = {
  address: '5ESNjjzmZnnCdrrpUo9TBKhDV1sakTjkspw2ZGg84LAK1e1Y',
};
const passphrase = '';
let keyring;
describe('e2e queries', () => {
  let api;

  beforeAll(async () => {
    api = await initApiPromise();

    await cryptoWaitReady();
    keyring = testingPairs({ type: 'sr25519' });
    const simpleKeyring: SimpleKeyring = new SimpleKeyring();
  //  simpleKeyring.addFromUri(sender.uri);
    // const wallet = new Wallet();
    // await wallet.createNewVault(passphrase);
    // await wallet.addKeyring(simpleKeyring);
  //  api.setSigner(wallet);
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
      await api.tx.genericAsset
        .create(
          new AssetOptions(
            api.registry,
            {
            initialIssuance: 0,
            permissions: {
              update: null,
              mint: null,
              burn: null,
            },
          })
        )
        .signAndSend(keyring.alice.address);
    }, 15000);
  });
});
