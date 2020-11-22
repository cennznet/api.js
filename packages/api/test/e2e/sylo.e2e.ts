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

import {SubmittableResult} from '@polkadot/api';
import {Keyring} from '@polkadot/keyring';
import {cryptoWaitReady} from '@polkadot/util-crypto';

import initApiPromise from '../../../../jest/initApiPromise';
import {H256} from "@polkadot/types/interfaces/runtime";
import {MemberRoles, Meta} from "@cennznet/types";
import {Bytes} from "@polkadot/types";

const keyring = new Keyring({type: 'sr25519'});

describe('e2e SYLO operations', () => {
    let api;
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

    describe('Groups', () => {

        it('Create Sylo group with empty invite', async done => {
            const nonce = await api.rpc.system.accountNextIndex(bob.address);
            const meta: Meta = api.registry.createType('Meta', ['GroupRole1', 'GroupRole2']);
            const groupId: H256 = api.registry.createType('H256', 'G12');
            const vaultKey = api.registry.createType('VaultKey', 'VaultKey');
            const vaultValue = api.registry.createType('VaultValue', 'VaultValue');
            await api.tx.syloGroups
                .createGroup(groupId, meta, [], [vaultKey, vaultValue])
                .signAndSend(bob, {nonce},
                    async ({events, status}: SubmittableResult) => {
                        if (status.isInBlock) {
                            for (const {event: {method, section}} of events) {
                                if (section === 'system' && method === 'ExtrinsicSuccess') {
                                    done();
                                }
                            }
                        }
                    });
        });


        it('Create Sylo group with invite', async done => {
            const nonce = await api.rpc.system.accountNextIndex(bob.address);
            const memberRoles: MemberRoles = api.registry.createType('MemberRoles', 0);
            const meta: Meta = api.registry.createType('Meta', ['GroupRole1', 'GroupRole2']);
            const inviteKey: H256 = api.registry.createType('H256', 'inviteKey');
            const groupId: H256 = api.registry.createType('H256', 'G76');
            const vaultKey = api.registry.createType('VaultKey', 'VaultKey');
            const vaultValue = api.registry.createType('VaultValue', 'VaultValue');
            const invite = api.registry.createType('Invite', {
                peerId: alice.address,
                inviteData: new Bytes(api.registry, 'aaa'),
                inviteKey,
                meta,
                roles: [memberRoles]
            });
            await api.tx.syloGroups
                .createGroup(groupId, meta, [invite], [vaultKey, vaultValue])
                .signAndSend(bob, {nonce},
                    async ({events, status}: SubmittableResult) => {
                        if (status.isInBlock) {
                            for (const {event: {method, section}} of events) {
                                if (section === 'system' && method === 'ExtrinsicSuccess') {
                                    done();
                                }
                            }
                        }
                    });
        });
    });
});