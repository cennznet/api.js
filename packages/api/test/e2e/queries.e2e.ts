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

import { AssetInfo, AssetOptions, Hash, Vec, BalanceLock, WithdrawReasons } from "@cennznet/types";
import { Keyring } from '@polkadot/keyring';
import { u8aToString } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';

describe('e2e queries', () => {
  let api, alice, aliceStash, bob;

  beforeAll(async () => {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    alice = keyring.addFromUri('//Alice');
    aliceStash = keyring.addFromUri('//Alice//stash')
    bob = keyring.addFromUri('//Bob');
    api = await initApiPromise();
  });

  afterAll(async () => {
    await api.disconnect();
  });

  describe('Query storage', () => {
    it('Makes the runtime, rpc, state & extrinsics available', (): void => {
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
    it('Queries correct balance', async () => {
      const nextAssetId = await api.query.genericAsset.nextAssetId();
      const blockHash: Hash = (await api.rpc.chain.getBlockHash()) as Hash;
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
  });

  describe('Subscribe storage', () => {
    let unsubscribeFn;
    it('Emits events when storage changes', async done => {
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

  describe('GA rpc calls', () => {
    it('Gets generic asset registeredAssets through RPC call', async done => {
      const registeredAsset = await api.rpc.genericAsset.registeredAssets();
      expect(registeredAsset.length).toBeGreaterThan(0);
      const hasCpayAsset = ([assetId, meta]) => assetId.toString() === '16001' && u8aToString(meta.symbol) === 'CPAY' && meta.decimalPlaces.toString() === '4';
      const hasCennzAsset = ([assetId, meta]) => assetId.toString() === '16000' && u8aToString(meta.symbol) === 'CENNZ' && meta.decimalPlaces.toString() === '4';
      expect(registeredAsset.some(hasCpayAsset)).toBe(true);
      expect(registeredAsset.some(hasCennzAsset)).toBe(true);
      done();
    });
  });

  describe('Staking account derived query', () => {
    it('Gets staking account details', async done => {
      const stashId = aliceStash.address;
      const activeEra = await api.query.staking.activeEra();
      const stakingAccount = await api.derive.staking.accountInfo(stashId, activeEra.unwrap().index);
      expect(stakingAccount.accountId.toString()).toBe(stashId);
      expect(stakingAccount.controllerId.toString()).toBe(alice.address);
      expect(stakingAccount.nominators).toHaveLength(0); // Initially no nominators
      expect(stakingAccount.rewardDestination.toString()).toBe(stashId);
      expect(stakingAccount.stakers).toBeDefined();
      expect(stakingAccount.stakingLedger.stash.toString()).toBe(stashId);
      expect(stakingAccount.validatorPrefs[0]).toBe('commission');
      expect(stakingAccount.validatorPrefs[1].toNumber()).toBe(0);
      const stakingSessionDetails = await api.derive.session.keyInfo(stashId);
      const session = '5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu';
      expect(stakingSessionDetails.nextSessionKeys[0].toString()).toBe(session);
      expect(stakingSessionDetails.sessionKeys[0].toString()).toBe(session);
      done();
    });
  });

  describe('Generic Asset Storage', () => {
    it('Gets balance locks ok', async done => {
      const stashId = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY'; // alice_stash
      const balanceLocks: Vec<BalanceLock> = await api.query.genericAsset.locks(stashId);
      expect(balanceLocks.isEmpty).toBeFalsy();
      let reasons: WithdrawReasons = balanceLocks[0].reasons;
      expect(reasons.isTransactionPayment).toBeTruthy();
      expect(reasons.isTransfer).toBeTruthy();
      expect(reasons.isTip).toBeTruthy();
      expect(reasons.isReserve).toBeTruthy();
      expect(reasons.isFee).toBeTruthy();
      done();
    });
  });
});
