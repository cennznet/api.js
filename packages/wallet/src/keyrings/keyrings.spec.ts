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

import {cryptoWaitReady} from '@cennznet/util';
import {KeyringPair} from '@cennznet/util/types';
import {IKeyring, KeyringType} from '../types';
import {HDKeyring} from './HDKeyring';
import {SimpleKeyring} from './SimpleKeyring';

describe('buildin keyrings', () => {
    const BUILDIN_KEYRINGS: KeyringType<any>[] = [HDKeyring, SimpleKeyring];

    beforeAll(async () => {
        await cryptoWaitReady();
    });

    BUILDIN_KEYRINGS.forEach(KeyringType => {
        describe(KeyringType.name, () => {
            it('default constructor', () => {
                const keyring = new KeyringType();
                expect(keyring).not.toBeUndefined();
            });

            it('generate a empty keyring', async () => {
                const keyring = await KeyringType.generate();
                expect(keyring).not.toBeUndefined();
                const pairs = await keyring.getPairs();
                expect(pairs).toHaveLength(0);
            });

            it('add a random keypair', async () => {
                const times = 10;
                const keyring = await KeyringType.generate();
                const addresses = new Set();
                for (let i = 0; i < times; i++) {
                    const keyPair = await keyring.addPair();
                    addresses.add(keyPair.address);
                }
                expect(Array.from(addresses)).toHaveLength(times);
            });

            describe('', () => {
                const times = 10;
                let keyring: IKeyring<any>;
                let keyPairs: KeyringPair[];
                beforeEach(async () => {
                    keyring = await KeyringType.generate();
                    keyPairs = [];
                    for (let i = 0; i < times; i++) {
                        const keyPair = await keyring.addPair();
                        keyPairs.push(keyPair);
                    }
                    expect(keyPairs).toHaveLength(times);
                });

                it('getAddresses()', async () => {
                    const addresses = await keyring.getAddresses();
                    expect(Array.from(new Set(addresses))).toHaveLength(times);
                    let match = 0;
                    keyPairs.forEach(kp => {
                        if (addresses.includes(kp.address)) {
                            match += 1;
                        }
                    });
                    expect(match).toBe(times);
                });

                it('getPairs()', async () => {
                    const pairs = await keyring.getPairs();
                    pairs.forEach(pair => {
                        expect(pair.isLocked).toBeFalsy();
                    });
                    const addresses = pairs.map(pair => pair.address);
                    expect(Array.from(new Set(addresses))).toHaveLength(times);
                    let match = 0;
                    keyPairs.forEach(kp => {
                        if (addresses.includes(kp.address)) {
                            match += 1;
                        }
                    });
                    expect(match).toBe(times);
                });

                it('getPair(address)', async () => {
                    for (const kp of keyPairs) {
                        const pair = await keyring.getPair(kp.address);
                        expect(pair.address).toBe(kp.address);
                    }
                });

                it('getPair(address) not exist', async () => {
                    await expect(keyring.getPair('0x123')).rejects.toThrow();
                });

                if (KeyringType.name !== 'HDKeyring') {
                    it('removePair(address) success', async () => {
                        for (const kp of keyPairs) {
                            await keyring.removePair(kp.address);
                            await expect(keyring.getPair(kp.address)).rejects.toThrow();
                        }
                        await expect(keyring.getAddresses()).resolves.toHaveLength(0);
                    });

                    it('removePair(address) not exist', async () => {
                        await expect(keyring.removePair('notexistaddress')).resolves;
                    });
                }

                it('serialize()/deserialize()', async () => {
                    const serialized = await keyring.serialize();
                    expect(serialized).not.toBeUndefined();
                    const newKeyring = new KeyringType();
                    await expect(newKeyring.deserialize(serialized)).resolves.toBe(newKeyring);
                    await expect(newKeyring.getAddresses()).resolves.toEqual(keyPairs.map(kp => kp.address));
                });
            });
        });
    });
});
