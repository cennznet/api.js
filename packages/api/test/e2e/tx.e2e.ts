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

import { AssetInfo, AssetOptions, LiquidityPriceResponse } from "@cennznet/types";
import { SubmittableResult } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import { SingleAccountSigner } from "./util/SingleAccountSigner";

const keyring = new Keyring({ type: 'sr25519' });

describe('e2e transactions', () => {
  let api;
  let alice, bob;
  let spendingAssetId, stakingAssetId;

  beforeAll(async () => {
    await cryptoWaitReady();
    api = await initApiPromise();
    alice = keyring.addFromUri('//Alice');
    bob = keyring.addFromUri('//Bob');

    spendingAssetId = await api.query.genericAsset.spendingAssetId();
    stakingAssetId = await api.query.genericAsset.stakingAssetId();
  });

  afterAll(async () => {
    await api.disconnect();
  });

  describe('Send', () => {

    it('Makes a tx using immortal era', async done => {
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

    it('Makes a tx via send', async done => {
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

    it('Makes a tx', async done => {
      const nonce = await api.rpc.system.accountNextIndex(bob.address);
      await api.tx.genericAsset
        .transfer(stakingAssetId, alice.address, 1)
        .signAndSend(bob, { nonce }, async ({ events, status }: SubmittableResult) => {
          if (status.isInBlock) {
            expect(events[0].event.method).toEqual('Transferred');
            expect(events[0].event.section).toEqual('genericAsset');
            done();
          }
        });
    });

  });

  describe('Extrinsic payment options', () => {
    // A generic asset to be used for fee payment
    let feeAssetId;
    // This account will own the newly created asset and receive initial issuance
    // It will also mint liquidity on CENNZ-X
    let assetOwner: KeyringPair;

    beforeAll(async done => {
      // Setup:
      // Create a new generic asset and mint a liquidity pool on CENNZX.
      // This fee asset will be used for fee payment in place of the default asset, CPAY.
      assetOwner = keyring.addFromUri('//Test//AssetOwner');

      // Amount of test asset to create
      const initialIssuance = 900_000_000_000_000;
      const owner = api.registry.createType('Owner', assetOwner.address, 1); // Owner type is enum with 0 as none/null
      const permissions = api.registry.createType('PermissionsV1', { update: owner, mint: owner, burn: owner});
      const option = {initialIssuance , permissions};
      const assetOption: AssetOptions = api.registry.createType('AssetOptions', option);
      const assetInfo: AssetInfo = api.registry.createType('AssetInfo', {symbol: 'TEST', decimalPlaces: 4, existentialDeposit: 5});
      let createAssetTx = api.tx.genericAsset.create(assetOwner.address, assetOption, assetInfo);

      // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
      const sudoAddress = await api.query.sudo.key();
      const sudoKeypair = keyring.getPair(sudoAddress.toString());

      // when the new asset is created it will have this ID.
      feeAssetId = await api.query.genericAsset.nextAssetId();

      // 1) Create the new fee asset
      // 2) Mint CPAY to assetOwner to fund subsequent pool liquidity and further transactions.
      const assetCreated = new Promise<void>(async (resolve, reject) => {
        let nonce = await api.rpc.system.accountNextIndex(sudoAddress);
        await api.tx.sudo.sudo(createAssetTx).signAndSend(sudoKeypair, { nonce: nonce++ });
        await api.tx.genericAsset.mint(spendingAssetId, assetOwner.address, initialIssuance).signAndSend(
          sudoKeypair, { nonce: nonce++ }, ({ status }) => status.isInBlock ? resolve() : null
        );
      });

      // 3) Mint liquidity for fee asset <> CPAY.
      assetCreated.then(async () => {
        const desiredLiquidity = 30_000_000;
        const minimumLiquidity = 1;
        const liquidityPrice: LiquidityPriceResponse = await (api.rpc.cennzx.liquidityPrice(feeAssetId, desiredLiquidity));
        await api.tx.cennzx
          .addLiquidity(feeAssetId, minimumLiquidity, liquidityPrice.asset, liquidityPrice.core)
          .signAndSend(assetOwner, ({ events, status }) => status.isInBlock ? done() :null );

      });

    });

    it('Uses keypair to sign', async done => {
      const nonce = await api.rpc.system.accountNextIndex(assetOwner.address);
      await api.tx.genericAsset
        .transfer(spendingAssetId, bob.address, 100)
        .setPaymentOpts(api, {feeAssetId: feeAssetId, slippage: 0, tip: 0})
        .signAndSend(
          assetOwner,
          { nonce },
          ({ status }) => status.isInBlock ? done() : null
        );
    });

    it('Use tip along with fee exchange', async done => {
      const nonce = await api.rpc.system.accountNextIndex(assetOwner.address);
      await api.tx.genericAsset
        .transfer(spendingAssetId, bob.address, 100)
        .setPaymentOpts(api, { feeAssetId: feeAssetId, slippage: 0, tip: 2})
        .signAndSend(
          assetOwner,
          { nonce },
          ({ status }) => (status.isInBlock) ? done() : null
      );
    });

    it('Use slippage for max payment in transaction', async done => {
      const nonce = await api.rpc.system.accountNextIndex(assetOwner.address);
      await api.tx.genericAsset
        .transfer(spendingAssetId, bob.address, 100)
        .setPaymentOpts(api, { feeAssetId: feeAssetId, slippage: 0.03})
        .signAndSend(
          assetOwner,
          { nonce },
          ({ status }) => (status.isInBlock) ? done() : null
        );
    });

    it('Update asset info', async done => {
      const nonce = await api.rpc.system.accountNextIndex(assetOwner.address);
      const assetInfo: AssetInfo = api.registry.createType('AssetInfo', {symbol: 'NEW_ASSET_ID', decimalPlaces: 5, existentialDeposit: 5});
      await api.tx.genericAsset.updateAssetInfo( feeAssetId, assetInfo).signAndSend(assetOwner, { nonce }, async ({ events, status }) => {
        if (status.isInBlock) {
          for (const { event: { method, section, data } } of events) {
            if (section === 'genericAsset' && method == 'AssetInfoUpdated') {
              const [assetId, assetMeta] = data;
              expect(assetId as number).toEqual(feeAssetId);
              expect(assetMeta.toJSON()).toEqual({
                existentialDeposit: 5,
                decimalPlaces: 5,
                symbol: stringToHex('NEW_ASSET_ID')
              });

              done();
            }
          }
        }
      });
    });
  });


  describe('Signed via signer', () => {
    it('should sign with a signer', async done => {
      const dave = keyring.addFromUri('//Dave');
      const signer = new SingleAccountSigner(api.registry, dave);
      const transfer = api.tx.genericAsset.transfer(spendingAssetId, alice.address, 54121);
      await transfer.signAndSend(dave.address, { signer }, async ({events, status}) => {
        if (status.isInBlock) {
          for (const {event: { method, section } } of events) {
            if (section === 'genericAsset' && method == 'Transferred') {
              done();
            }
          }
        }
      });
    });
  });

});
