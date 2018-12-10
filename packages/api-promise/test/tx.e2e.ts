// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import testingPairs from '@polkadot/keyring/testingPairs';
import {Wallet} from 'cennznet-wallet';

import {Api} from '../src/';

const keyring = testingPairs();

describe('e2e transactions', () => {
  let api;
  let nonce;

  beforeEach(async () => {
    api = await Api.create();
    const wallet = new Wallet();
    wallet.addPair(keyring.alice);
    api.setWallet(wallet);
    jest.setTimeout(60000);
  });

  afterEach(() => {
    jest.setTimeout(5000);
  });

  it.only('makes a transfer', async (done) => {
    await api.tx.balances
      .transfer(keyring.bob.address(), 12345)
      .send({from: keyring.alice.address()},(status) => {
        expect(
          status.type.toString()
        ).toEqual('Finalised');

        done();
      });
  });

  it('makes a proposal', async () => {

    // don't wait for status, just get hash
    const hash = await api.tx.democracy
      .propose(api.tx.consensus.setCode('0xdeadbeef'), 10000)
      .send({from: keyring.alice.address()});

    expect(
      hash.toString()
    ).not.toEqual('0x');
  });
});
