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

import testingPairs from '@plugnet/keyring/testingPairs';
import {waitReady} from '@polkadot/wasm-crypto';
import {Api} from '../../src/Api';
import {Doughnut} from '@cennznet/types/extrinsic/Doughnut';
import {KeyringPair} from '@cennznet/util/types';
import {Keypair} from '@plugnet/util-crypto/types';
import {hexToU8a} from '@plugnet/util'

const doughnut_maker = require('doughnut-maker');
const cennznut = require('cennznut.js');

/**
 * Create a new unsigned Doughnut
 */
function makeDoughnut(holder: KeyringPair, issuer: Keypair): Doughnut {

  // Create a valid CENNZnet domain permissions
  const cennznetDomain = {
    modules: {
      'generic-asset': {
        methods: {
          'transfer': {
            blockCooldown: 100
          }
        }
      }
    }
  };

  // Hack together an encoded domain for now
  const encodedDomainPayload = cennznut.versions['0'].encode(cennznetDomain);
  const encodedDomain = new Uint8Array(encodedDomainPayload.length + 2);
  encodedDomain.set(encodedDomainPayload, 2);

  const expiry = Math.ceil(Date.now() / 1000) + 60;

  return new Doughnut(doughnut_maker.generate(0, 0, {
    "issuer": issuer.publicKey,
    "holder": holder.publicKey(),
    "expiry": expiry,
    "permissions": {
      "cennznet": encodedDomain,
    }
  }, issuer));
}

describe('Doughnut for CennznetExtrinsic', () => {
  let api: Api;
  let keyring;

  beforeAll(async () => {
    await waitReady();
  })

  beforeEach(async () => {
    if (!api) {
      // TODO: Change to Rimu when doughnut goes live...
      // api = await Api.create({provider: 'wss://rimu.unfrastructure.io/public/ws'});
      api = await Api.create({ provider: 'ws://localhost:9944' });
      keyring = testingPairs({ type: 'sr25519' });
    }
  });

  afterEach(() => {
    jest.setTimeout(5000);
  });

  it('It issues a doughnut with GA transfer for CENNZnet domain', async done => {
    const tradeAssetId = 16001;
    const receiver = keyring.bob;
    const holder = keyring.dave;
    const issuer = {
      "secretKey": hexToU8a('0xa8f2d83016052e5d6d77b2f6fd5d59418922a09024cda701b3c34369ec43a7668faf12ff39cd4e5d92bb773972f41a7a5279ebc2ed92264bed8f47d344f8f18c'),
      "publicKey": hexToU8a('0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22')
    };

    const tx = api.tx.genericAsset.transfer(tradeAssetId, receiver.address(), 10000);
    let doughnut = makeDoughnut(holder, issuer);
    tx.addDoughnut(doughnut);

    return tx.signAndSend(holder, ({ events, status }) => {
      console.log('Transaction status:', status.type);
      if (status.isFinalized) {
        console.log('Completed at block hash', status.value.toHex());
        console.log('Events:');

        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });

        done();
      }
    });
  });
});
