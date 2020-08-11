// Copyright 2020 Centrality Investments Limited
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

import { RewardDestination } from '@cennznet/types';
import { Keyring } from '@polkadot/keyring';
import { Option, GenericEvent } from '@polkadot/types';
import { StakingLedger, ValidatorPrefs } from '@polkadot/types/interfaces';
import AccountId from '@polkadot/types/primitive/Generic/AccountId';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';

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

  test('withdraw unbonded', async done => {
    await api.tx.staking.withdrawUnbonded().signAndSend(controller, ({ status, events }) => {
      if (status.isInBlock) {
        expect(
          events.find(wrapper => wrapper.event.method === 'ExtrinsicSuccess')
        ).toBeDefined();
        done();
      }
    });
  });

  test('validate adds stash as a validator candidate', async done => {
    // parts per billion
    // 100,000,000 / 1,000,000,000 == 0.1%
    let commission = 1_000_000_000;

    let checkCommission = async ({ status }) => {
      if (status.isInBlock) {
        let prefs = ((await api.query.staking.validators(stash.address)) as ValidatorPrefs);
        expect(prefs.commission.toNumber()).toEqual(commission);
        done();
      };
    };

    await api.tx.staking.validate({ commission }).signAndSend(controller, checkCommission);
  });

  test('chill removes stash from validator candidacy', async done => {

    let checkCommission = async ({ status }) => {
      if (status.isInBlock) {
        let prefs = ((await api.query.staking.validators(stash.address)) as ValidatorPrefs);
        expect(prefs.commission.toNumber()).toEqual(0);
        done();
      };
    };

    await api.tx.staking.chill().signAndSend(controller, checkCommission);
  });

  test('setPayee changes reward destination', async done => {
    // Subscribe to reward destination changes
    await api.query.staking.payee(stash.address, (rewardDestination: RewardDestination) => {
      if (rewardDestination.toString().toLowerCase() === "stash") {
        done();
      }
    });

    await api.tx.staking.setPayee("stash").signAndSend(controller);

  });

  test('setController changes controller account', async done => {
    // NB: ensure to run this test last as it changes the controller account.
    let newController = keyring.addFromUri("//NewController");

    // Subscribe to controller account value changes
    await api.query.staking.bonded(stash.address, (controllerOpt: Option<AccountId>) => {
      let controllerAddress = keyring.encodeAddress(controllerOpt.unwrap());
      if (controllerAddress === newController.address) {
        done();
      }
    });

    await api.tx.staking.setController(newController.address).signAndSend(stash);
  });

});
