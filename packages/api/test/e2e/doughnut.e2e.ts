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

import testingPairs from '@polkadot/keyring/testingPairs';
import { hexToU8a, assert } from '@polkadot/util'
import { CENNZnut as encodeCennznut} from '@cennznet/cennznut-wasm';
import { Doughnut as DoughnutMaker } from '@plugnet/doughnut-wasm';
// import { Doughnut as DoughnutMaker } from '/Users/karishma/WebstormProjects/doughnut-rs/js/libNode/Doughnut';
import { Api } from '../../src/Api';
import { Keypair } from '@plugnet/util-crypto/types';
import {Keyring} from '@polkadot/api';
import { KeyringPair } from '@plugnet/keyring/types';
import initApiPromise from '../../../../jest/initApiPromise';
import {cryptoWaitReady} from '@plugnet/util-crypto';
import Doughnut from '@cennznet/types/Doughnut';

// Helper for creating CENNZnuts
function makeCennznut(module: string, method: string): Uint8Array {
    const moduleVec = [
        [
            module,  {
                        "name":module,
                        "methods":[
                            [
                                method,  {
                                    "name":method,
                                    "constraints":null
                                }
                            ],
                        ]
                    }
        ],
    ];
    const contractVec = [];
    const cennznut = new encodeCennznut(moduleVec, contractVec);
    return cennznut.encode();
}

/// Helper for creating v0 Doughnuts
function makeDoughnut(
   issuer: Keypair,
    holder: KeyringPair,
   permissions: Record<string, Uint8Array>,
) {
    const d = new DoughnutMaker(
            issuer.publicKey,
            holder.publicKey,
            2595374352,// expiry
            1, //notBefore
    );
    for (const key in permissions) {
        d.addDomain(key,permissions[key]);
    }
   d.signSr25519(new Uint8Array(issuer.secretKey));
    return d.encode();
}




const Dave = {
    address: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
    uri: '//Dave'
}

describe('Doughnut for CennznetExtrinsic', () => {
    let aliceKeyPair = {
        secretKey: hexToU8a('0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011'),
        publicKey: hexToU8a('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d')
    };

    let api: Api;
    let alice, bob, charlie;
    let holderKeyPair;
    let keyring: {
        [index: string]: KeyringPair;
    };

    beforeAll(async () => {
        api = await initApiPromise();
        await cryptoWaitReady();
        const keyring = new Keyring({ type: 'sr25519' });
        alice = keyring.addFromUri('//Alice');
        bob = keyring.addFromUri('//Bob');
        charlie = keyring.addFromUri('//Charlie');
        holderKeyPair = bob;
    });

    afterEach(() => {
        jest.setTimeout(5000);
    });

    it('Delegates a GA transfer from alice to charlie when extrinsic is signed by bob', async done => {

        let doughnut = makeDoughnut(
            aliceKeyPair,
            holderKeyPair,
            { "cennznet": makeCennznut("generic-asset", "transfer") }
        );
        const CENNZ = 16000;
        const reciever = Dave.address;
        const amount = 8767535;

        const tx = api.tx.genericAsset.transfer(CENNZ, reciever, amount);
        const doughnutB = new Doughnut(api.registry, doughnut);
        const opt = {doughnut: doughnutB};
        await tx.signAndSend(holderKeyPair, opt as any, async ({events, status}) => {
            if (status.isFinalized) {
                const blockHash = status.value.toHex();
                console.log('Completed at block hash', blockHash);
                const allEvents = await api.query.system.events.at(blockHash)
                const transfer = allEvents.find(
                    event => (
                        event.event.data.method === 'Transferred' &&
                        event.event.data.section === 'genericAsset' &&
                        event.event.data[1].toString() === alice.address && // transferred from alice's account
                        event.event.data[0].toString() === CENNZ.toString() && // CENNZ
                        event.event.data[2].toString() === reciever && // Dave is reciever
                        event.event.data[3].toString() === amount.toString()
                    )
                );
                allEvents.forEach(({phase, event: {data, method, section}}) => {
                    console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                });
                if (transfer != undefined) {
                    done();
                } else {
                    assert(true, "false");
                }
            }
        });
    });

    it('Fails when charlie uses bob\'s doughnut', async () => {
        let doughnut = await makeDoughnut(
            aliceKeyPair,
            bob,
            { "cennznet": makeCennznut("generic-asset", "transfer") }
        );
        const doughnutB = new Doughnut(api.registry, doughnut);
        const opt = {doughnut: doughnutB};
        const tx = api.tx.genericAsset.transfer(16001, charlie.address, 10000);

        await expect(tx.signAndSend(charlie, opt as any,() => { })).
        rejects.toThrow("submitAndWatchExtrinsic(extrinsic: Extrinsic): ExtrinsicStatus:: 1010: Invalid Transaction: {\"Custom\":180}");
    });

    it('fails when cennznut does not authorize the extrinsic method', async (done) => {
        let doughnut = await makeDoughnut(
            aliceKeyPair,
            bob,
           { "cennznet": makeCennznut("generic-asset", "mint") }
        );
        const doughnutB = new Doughnut(api.registry, doughnut);
        const opt = {doughnut: doughnutB};
        const tx = api.tx.genericAsset.transfer(16001, charlie.address, 10000);

        await tx.signAndSend(bob, opt as any, async ({events, status}) => {
            if (status.isFinalized) {
                const blockHash = status.value.toHex();
                console.log('Completed at block hash', blockHash);
                const allEvents = await api.query.system.events.at(blockHash);
                const failed = allEvents.find(event => event.event.data.method === 'ExtrinsicFailed');
                if (failed != undefined) {
                    done();
                } else {
                    assert(false, "expected extrinsic to fail");
                }
            }
        });

    });

    it('fails when cennznut does not authorize the extrinsic module', async (done) => {
        let doughnut = await makeDoughnut(
            aliceKeyPair,
            bob,
           { "cennznet": makeCennznut("balance", "transfer") }
        );

        const tx = api.tx.genericAsset.transfer(16001, charlie.address, 10000);
        const doughnutB = new Doughnut(api.registry, doughnut);
        const opt = {doughnut: doughnutB};

        await tx.signAndSend(bob, opt as any, async ({events, status}) => {
            if (status.isFinalized) {
                const blockHash = status.value.toHex();
                console.log('Completed at block hash', blockHash);
                const allEvents = await api.query.system.events.at(blockHash)
                const failed = allEvents.find(event => event.event.data.method === 'ExtrinsicFailed');
                if (failed != undefined) {
                    done();
                } else {
                    assert(false, "expected extrinsic to fail");
                }
            }
        });
    });
});
