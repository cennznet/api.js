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

import {KeyringPair} from '@plugnet/keyring/types';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import {IKeyring} from '@plugnet/wallet/types';

import {HDKeyring} from './HDKeyring';

describe.skip('HDKeyring', () => {
  beforeAll(async () => {
    await cryptoWaitReady();
  });

  describe('happy path', () => {
    const times = 10;
    let keyring: IKeyring<any>;
    let keyPairs: KeyringPair[];
    beforeEach(async () => {
      keyring = await HDKeyring.generate();
      keyPairs = [];
      for (let i = 0; i < times; i++) {
        const keyPair = await keyring.addPair();
        keyPairs.push(keyPair);
      }
      expect(keyPairs).toHaveLength(times);
    });

    it('removePair(address) not support', async () => {
      const kp = keyPairs[0];
      await expect(keyring.removePair(kp.address)).rejects.toThrow("doesn't support removePair");
    });
  });

  it('throw error if not initialized', async () => {
    const keyring = new HDKeyring(undefined);
    await expect(keyring.addPair()).rejects.toThrow('hd wallet not initialized');
  });

  it('recover from mnemonic', async () => {
    const keyring = new HDKeyring({
      mnemonic: 'urban tuna work fiber excuse gown adult grab winner rigid lamp appear',
    });
    await expect(keyring.getAddresses()).resolves.toHaveLength(0);
    const kp = await keyring.addPair();
    expect(kp.address).toBe('5HTkvBrPpfrSZCoHE9qBMyNmV2JVJcKLNswwXvWdZjizCMHj');
  });
});
