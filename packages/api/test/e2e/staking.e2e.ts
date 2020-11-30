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

import { AccountId, Forcing, RewardDestination, StakingLedger, ValidatorPrefs, Option } from '@cennznet/types';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';

let api;
const keyring = new Keyring({ type: 'sr25519' });
let alice, bob;

beforeAll(async () => {
  await cryptoWaitReady();
  api = await initApiPromise();
  alice = keyring.addFromUri('//Alice');
  bob = keyring.addFromUri('//Bob');
});

afterAll(async () => {
  await api.disconnect();
});

describe('Staking Operations', () => {
  // Note: order of test execution matters here
  let stash, controller;

  beforeAll(async done => {
    stash = keyring.addFromUri('//Test//Stash');
    controller = keyring.addFromUri('//Test//Controller');

    // Fund stash and controller
    const stakingId = await api.query.genericAsset.stakingAssetId();
    const spendingId = await api.query.genericAsset.spendingAssetId();
    let nonce = await api.rpc.system.accountNextIndex(alice.address);

    // How much to fund stash and controller with
    const initialEndowment = 100_000_000;

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
      .signAndSend(alice, { nonce }, ({ status }) => status.isInBlock ? done() : null);

  });

  test('Bond locks caller funds and assigns a controller account', async done => {
    const bond = (await api.query.staking.minimumBond()) + 12_345;

    await api.tx.staking.bond(controller.address, bond, 'controller').signAndSend(stash, async ({ status }) => {
      if (status.isInBlock) {
        expect((await api.query.staking.bonded(stash.address)).toString()).toEqual(controller.address);
        const payee = await api.query.staking.payee(stash.address);
        expect(payee.isAccount).toBeTruthy();
        expect(payee.asAccount.toString()).toEqual(controller.address);
        const ledger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();
        expect(ledger.active.toString()).toEqual(bond);
        expect(ledger.total.toString()).toEqual(bond);

        done();
      }
    });

  });

  test('Bond extra locks additional funds', async done => {

    const additionalBond = 333;
    const previousLedger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();

    // Subscribe to ledger value changes
    await api.query.staking.ledger(controller.address, (ledgerOpt: Option<StakingLedger>) => {
      const ledger = ledgerOpt.unwrapOr(null);
      if (ledger?.active.toNumber() === (previousLedger.active.toNumber() + additionalBond)) {
        done();
      }
    });
    const nonce = await api.rpc.system.accountNextIndex(stash.address);
    await api.tx.staking.bondExtra(additionalBond).signAndSend(stash, { nonce });
  });

  test('Unbond schedules some funds to unlock', async done => {
    const unbondAmount = 500;
    const previousLedger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();

    // Subscribe to ledger value changes
    await api.query.staking.ledger(controller.address, (ledgerOpt: Option<StakingLedger>) => {
      const ledger = ledgerOpt.unwrapOr(null);
      if (ledger?.active.toNumber() === (previousLedger.active.toNumber() - unbondAmount)) {
        done();
      }
    });

    await api.tx.staking.unbond(unbondAmount).signAndSend(controller);
  });

  /// Rebond a portion of the stash scheduled to be unlocked.
  test('Rebond locks funds again', async done => {
    const rebondAmount = 300;
    const previousLedger = ((await api.query.staking.ledger(controller.address)) as Option<StakingLedger>).unwrap();

    // Subscribe to ledger value changes
    await api.query.staking.ledger(controller.address, (ledgerOpt: Option<StakingLedger>) => {
      const ledger = ledgerOpt.unwrapOr(null);
      if (ledger?.active.toNumber() === (previousLedger.active.toNumber() + rebondAmount)) {
        done();
      }
    });
    const nonce = await api.rpc.system.accountNextIndex(controller.address);
    await api.tx.staking.rebond(rebondAmount).signAndSend(controller, { nonce });
  });

  test('Withdraw unbonded', async done => {
    const nonce = await api.rpc.system.accountNextIndex(controller.address);
    await api.tx.staking.withdrawUnbonded().signAndSend(controller, { nonce }, ({ status, events }) => {
      if (status.isInBlock) {
        expect(
          events.find(wrapper => wrapper.event.method === 'ExtrinsicSuccess')
        ).toBeDefined();
        done();
      }
    });
  });

  test('Validate adds stash as a validator candidate', async done => {
    // parts per billion
    // 100,000,000 / 1,000,000,000 == 0.1%
    const commission = 1_000_000_000;

    const checkCommission = async ({ status }) => {
      if (status.isInBlock) {
        const prefs = ((await api.query.staking.validators(stash.address)) as ValidatorPrefs);
        expect(prefs.commission.toNumber()).toEqual(commission);
        done();
      };
    };
    const nonce = await api.rpc.system.accountNextIndex(controller.address);
    await api.tx.staking.validate({ commission }).signAndSend(controller, { nonce }, checkCommission);
  });

  test('Chill removes stash from validator candidacy', async done => {

    const checkCommission = async ({ status }) => {
      if (status.isInBlock) {
        const prefs = ((await api.query.staking.validators(stash.address)) as ValidatorPrefs);
        expect(prefs.commission.toNumber()).toEqual(0);
        done();
      };
    };
    const nonce = await api.rpc.system.accountNextIndex(controller.address);
    await api.tx.staking.chill().signAndSend(controller, { nonce }, checkCommission);
  });

  test('setPayee changes reward destination', async done => {
    // Payee account should be set to controller after prior bond() test.
    const payee = await api.query.staking.payee(stash.address);
    expect(payee.isAccount).toBeTruthy();
    expect(payee.asAccount.toString()).toEqual(controller.address);

    // Subscribe to payee changes
    await api.query.staking.payee(stash.address, (payee: RewardDestination) => payee.isStash ? done() : null);
    const nonce = await api.rpc.system.accountNextIndex(controller.address);
    await api.tx.staking.setPayee('stash').signAndSend(controller, { nonce });
  });

  test('Payout to any account', async done => {
    const rewardDestinationAddress = '5FEe8Ht1ZTzNjQcvrxbLxnykA2EXfqN5LMog2gaNPus4tfZR';
    const nonce = await api.rpc.system.accountNextIndex(controller.address);
    // Payee account set to any account
    await api.tx.staking.setPayee({ account: rewardDestinationAddress }).signAndSend(controller, { nonce });
    // Subscribe to payee changes
    await api.query.staking.payee(stash.address, (payee: RewardDestination) => {
      (payee.isAccount && payee.asAccount.toString() === rewardDestinationAddress) ? done() : null
    });
  });

  test('setController changes controller account', async done => {
    // NB: ensure to run this test last as it changes the controller account.
    const newController = keyring.addFromUri('//NewController');
    const nonce = await api.rpc.system.accountNextIndex(stash.address);
    // Subscribe to controller account value changes
    await api.query.staking.bonded(stash.address, (controllerOpt: Option<AccountId>) => {
      const controllerAddress = keyring.encodeAddress(controllerOpt.unwrap());
      if (controllerAddress === newController.address) {
        done();
      }
    });

    await api.tx.staking.setController(newController.address).signAndSend(stash, { nonce });
  });

});

describe('Staking Governance (Sudo Required)', () => {

  afterAll(async done => {
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    // Ensure era forcing is disabled
    await api.tx.sudo.sudo(api.tx.staking.forceNewEra())
      .signAndSend(alice, { nonce }, ({ status }) => status.isInBlock ? done() : null);
  });

  test('Set target validator count', async done => {
    const validatorCount = 15;
    const setValidatorTx = api.tx.staking.setValidatorCount(validatorCount);
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.sudo.sudo(setValidatorTx).signAndSend(alice, { nonce }, async ({ status }) => {
      if (status.isInBlock) {
        expect((await api.query.staking.validatorCount()).toString()).toEqual(validatorCount.toString());
        done();
      }
    });
  });

  test('Set minimum bond', async done => {
    const minimumBond = 1_234;
    const setMinimumBondTx = api.tx.staking.setMinimumBond(minimumBond);
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.sudo.sudo(setMinimumBondTx).signAndSend(alice, { nonce }, async ({ status }) => {
      if (status.isInBlock) {
        expect((await api.query.staking.minimumBond()).toString()).toEqual(minimumBond.toString());
        done();
      }
    });
  });


  test('Set invulnerable validators', async done => {
    const invulnerables: AccountId[] = keyring.getPairs().map(p => p.publicKey as AccountId);
    const setInvulnerablesTx = api.tx.staking.setInvulnerables(invulnerables);
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.sudo.sudo(setInvulnerablesTx).signAndSend(alice, { nonce }, async ({ status }) => {
      if (status.isInBlock) {
        expect(
          (await api.query.staking.invulnerables()).map(k => keyring.encodeAddress(k))
        ).toEqual(
          invulnerables.map(k => keyring.encodeAddress(k))
        );
        done();
      }
    });
  });

  test('Force no eras', async done => {
    await api.query.staking.forceEra(
      (forcing: Forcing) => {
        if (forcing.isForceNone) done();
      }
    );
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.sudo.sudo(api.tx.staking.forceNoEras()).signAndSend(alice, { nonce });
  });

  test('Force new era', async done => {
    const transactionFeePot = await api.query.rewards.transactionFeePotHistory();
    expect(transactionFeePot).toBeDefined();
    expect(transactionFeePot.length).toEqual(0); // Transaction fee pot is empty [] without call to noteFeePayout/makeRewardPayout
    await api.query.staking.forceEra(
      (forcing: Forcing) => {
        if (forcing.isForceNew) done();
      }
    );
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.sudo.sudo(api.tx.staking.forceNewEra()).signAndSend(alice, { nonce });
  });

  test('Force new era always', async done => {
    await api.query.staking.forceEra(
      (forcing: Forcing) => {
        if (forcing.isForceAlways) done();
      }
    );
    const nonce = await api.rpc.system.accountNextIndex(alice.address);
    await api.tx.sudo.sudo(api.tx.staking.forceNewEraAlways()).signAndSend(alice, { nonce });
  });

  test('Force unstake', async done => {
    const bobStash = keyring.addFromUri('//Bob//stash');
    new Promise(async (resolve) => {
      // bond bob's stash account.
      await api.tx.staking.bond(bob.address, 10_000, 'controller')
          .signAndSend( bobStash, async ({ status }) => {
            if (status.isInBlock) {
                  const controller = (await api.query.staking.bonded(bobStash.address)) as Option<AccountId>;
                  expect(controller.unwrapOr(null)).toBeDefined();
                  resolve();
            }
          });
    }).then(async () => {
      const unstake = api.tx.staking.forceUnstake(bobStash.address);
      const nonce = await api.rpc.system.accountNextIndex(alice.address);
      await api.tx.sudo.sudo(unstake).signAndSend(alice, { nonce });
        // bob stash is removed / unbonded
      await api.query.staking.bonded(bobStash.address, (controller: Option<AccountId>) =>
        (controller.unwrapOr(null) === null) ? done() : null);
    });
  });

});
