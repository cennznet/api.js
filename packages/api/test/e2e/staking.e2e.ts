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

import BN from 'bn.js';
import { Keyring } from '@polkadot/keyring';
import { Option } from '@polkadot/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import initApiPromise from '../../../../jest/initApiPromise';
import { StakingLedger, Balance, ValidatorPrefs } from '@polkadot/types/interfaces';
import Address from '@polkadot/types/primitive/Generic/Address';
import AccountId from '@polkadot/types/primitive/Generic/AccountId';

let api;
const keyring = new Keyring({ type: 'sr25519' });
let alice, bob;

beforeAll(async () => {
  await cryptoWaitReady();
  api = await initApiPromise();
  api.setSigner(keyring);
  alice = keyring.addFromUri('//Alice');
  bob = keyring.addFromUri('//Bob');
});

afterAll(async () => {
  await api.disconnect();
});

describe.skip('Staking Governance (Sudo Required)', () => {
  /// The ideal number of validators.
  it.skip('Set validators', async () => {

  });

  /// Force there to be no new eras indefinitely.
  it.skip('Force no eras', async () => {

  });

  /// Force there to be a new era at the end of the next session.
  /// After this, it will reset to normal (non-forced) behaviour.
  it.skip('Force new era', async () => {

  });

  /// Set the minimum bond balance required to validate OR nominate
  it.skip('Set minimum bond', async () => {

  });

  /// Set the validators who cannot be slashed (if any).
  it.skip('Set invulnerables', async () => {

  });

  /// Force a current staker to become completely unstaked, immediately.
  it.skip('Force unstake', async () => {

  });

  /// Force there to be a new era at the end of sessions indefinitely.
  it.skip('Force new era always', async () => {

  });

  /// Cancel enactment of a deferred slash. Can be called by root origin
  /// passing the era and indices of the slashes for that era to kill.
  it.skip('Cancel deferred slash', async () => {

  });

});

describe('Staking Operations', () => {
  let stash, controller;

  beforeAll(async done => {
    stash = keyring.addFromUri("//Test//Stash");
    controller = keyring.addFromUri("//Test//Controller");

    // Fund stash and controller
    const stakingId = await api.query.genericAsset.stakingAssetId();
    const spendingId = await api.query.genericAsset.spendingAssetId();
    let nonce = await api.query.system.accountNonce(alice.address);

    // How much to fund stash and controller with
    let initialEndowment = 100_000_000_000_000;

    // controller needs CPAY
    await api.tx.genericAsset
      .mint(spendingId, controller.address, initialEndowment)
      .signAndSend(alice, { nonce: nonce++ });
    // stash needs CENNZ and CPAY
    await api.tx.genericAsset
      .mint(spendingId, stash.address, initialEndowment)
      .signAndSend(alice, { nonce: nonce++ });
    await api.tx.genericAsset
      .mint(stakingId, stash.address, initialEndowment)
      .signAndSend(alice, { nonce }, async ({ status }) => {
        if (status.isInBlock) {
          done();
        }
      });

  });

  /// Take the origin account as a stash and lock up `value` of its balance. `controller` will
  /// be the account that controls it.
  ///
  /// `value` must be more than the `minimum_bond` specified in genesis config.
  ///
  /// The dispatch origin for this call must be _Signed_ by the stash account.
  test('bond locks caller funds and assigns a controller account', async done => {
    let bond = (await api.query.staking.minimumBond()) + 12_345;

    await api.tx.staking.bond(controller.address, bond, "controller").signAndSend(stash, async ({ status }) => {
      if (status.isInBlock) {
        expect((await api.query.staking.bonded(stash.address)).toString()).toEqual(controller.address);
        expect((await api.query.staking.payee(stash.address)).isController).toBeTruthy();
        let ledger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();
        expect(ledger.active.toString()).toEqual(bond);
        expect(ledger.total.toString()).toEqual(bond);

        done();
      }
    });

  });

  /// Add some extra amount that have appeared in the stash `free_balance` into the balance up
  /// for staking.
  ///
  /// Use this if there are additional funds in your stash account that you wish to bond.
  /// Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
  /// that can be added.
  ///
  /// The dispatch origin for this call must be _Signed_ by the stash, not the controller.
  test('bond extra locks additional funds', async done => {

    let additionalBond = 333;
    let previousLedger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();

    // Subscribe to ledger value changes
    let unsub = await api.query.staking.ledger(controller.address, (ledger: Option<StakingLedger>) => {
      if (ledger.unwrap().active.toNumber() === (previousLedger.active.toNumber() + additionalBond)) {
        unsub();
        done();
      }
    });

    await api.tx.staking.bondExtra(additionalBond).signAndSend(stash);
  });

  /// Schedule a portion of the stash to be unlocked ready for transfer out after the bond
  /// period ends. If this leaves an amount actively bonded less than
  /// T::Currency::minimum_balance(), then it is increased to the full amount.
  ///
  /// Once the unlock period is done, you can call `withdraw_unbonded` to actually move
  /// the funds out of management ready for transfer.
  ///
  /// No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
  /// can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
  /// to be called first to remove some of the chunks (if possible).
  ///
  /// The dispatch origin for this call must be _Signed_ by the controller, not the stash.
  ///
  test('unbond schedules some funds to unlock', async done => {
    let unbondAmount = 500;
    let previousLedger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();

    // Subscribe to ledger value changes
    let unsub = await api.query.staking.ledger(controller.address, (ledger: Option<StakingLedger>) => {
      if (ledger.unwrap().active.toNumber() === (previousLedger.active.toNumber() - unbondAmount)) {
        unsub();
        done();
      }
    });

    await api.tx.staking.unbond(unbondAmount).signAndSend(controller);

  });

  /// Remove any unlocked chunks from the `unlocking` queue from our management.
  ///
  /// This essentially frees up that balance to be used by the stash account to do
  /// whatever it wants.
  ///
  /// The dispatch origin for this call must be _Signed_ by the controller, not the stash.
  ///
  it.skip('withdraw unbonded', async done => {
    // TODO: force era change
    // Withdraw
  });

  /// Rebond a portion of the stash scheduled to be unlocked.
  test('rebond locks funds again', async done => {
    let rebondAmount = 300;
    let previousLedger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();

    // Subscribe to ledger value changes
    let unsub = await api.query.staking.ledger(controller.address, (ledger: Option<StakingLedger>) => {
      if (ledger.unwrap().active.toNumber() === (previousLedger.active.toNumber() + rebondAmount)) {
        unsub();
        done();
      }
    });

    await api.tx.staking.rebond(rebondAmount).signAndSend(controller);
  });


  /// Declare the desire to validate for the origin controller.
  ///
  /// Effects will be felt at the beginning of the next era.
  ///
  /// The dispatch origin for this call must be _Signed_ by the controller, not the stash.
  ///
  /// # <weight>
  /// - Independent of the arguments. Insignificant complexity.
  /// - Contains a limited number of reads.
  /// - Writes are limited to the `origin` account key.
  /// # </weight>
  it.skip('validates', async done => {

  });


  /// Declare no desire to either validate or nominate.
  ///
  /// Effects will be felt at the beginning of the next era.
  ///
  /// The dispatch origin for this call must be _Signed_ by the controller, not the stash.
  ///
  test('chill removes stash from nominator and validator sets', async done => {
    await api.tx.staking.chill().signAndSend(controller, async ({ status }) => {
      if (status.isInBlock) {
        expect(
          ((await api.query.staking.validators(stash.address)) as ValidatorPrefs)
        ).toEqual({commission: 0});
        expect(
          ((await api.query.staking.nominators(stash.address)) as ValidatorPrefs)
        ).toEqual({commission: 0});

        done();
      }
    })
  });

  /// (Re-)set the payment target for a controller.
  ///
  /// Effects will be felt at the beginning of the next era.
  ///
  /// The dispatch origin for this call must be _Signed_ by the controller, not the stash.
  test('setPayee changes reward destination', async done => {
    // Subscribe to payee value changes
    let unsub = await api.query.staking.payee(stash.address, (rewardDestination: AccountId) => {
      if (rewardDestination.toString() === stash.toString()) {
        unsub();
        done();
      }
    });

    await api.tx.staking.setPayee("stash").signAndSend(controller);
    // force new era for changes to take affect
    await api.tx.sudo.sudo(api.tx.staking.forceNewEra());

  });

  /// (Re-)set the controller of a stash.
  ///
  /// Effects will be felt at the beginning of the next era.
  ///
  /// The dispatch origin for this call must be _Signed_ by the stash, not the controller.
  ///
  test('setController changes controller account', async done => {
    // NB: enusre to run this test last as it changes the controller account.
    let newController = keyring.addFromUri("//NewController");

    // Subscribe to controller account value changes
    let unsub = await api.query.staking.bonded(stash.address, (controllerValue: AccountId) => {
      if (controllerValue.toString() === newController.toString()) {
        unsub();
        done();
      }
    });

    await api.tx.staking.setController(newController.address).signAndSend(stash);
    // force new era for changes to take affect
    await api.tx.sudo.sudo(api.tx.staking.forceNewEra());
  });


});
