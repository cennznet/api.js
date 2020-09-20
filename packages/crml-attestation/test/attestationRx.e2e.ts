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

/**
 * Get more fund from https://cennznet-faucet-ui.centrality.me/ if the sender account does not have enough fund
 */
import {ApiRx} from '@cennznet/api';
import {AttestationValue} from '@cennznet/types';
import {KeyringPair} from '@polkadot/keyring/types'
import testKeyring from '@polkadot/keyring/testing';
import {filter, first} from 'rxjs/operators';
import {AttestationRx} from '../src/AttestationRx';
import { TypeRegistry } from '@polkadot/types';

const issuerUri = '//Alice';
const issuer2Uri = '//Bob';
const holderUri = '//Charlie';

const topic = 'passport';
// hex of string 'identity'
const registry = new TypeRegistry();
const attestationValue = new AttestationValue(registry, '0x6964656e74697479');

const topic2 = 'over18';
const attestationValue2 = new AttestationValue(registry, '0x12121212121234a1');

const passphrase = 'passphrase';

describe('AttestationRx APIs', () => {
    let api: ApiRx;
    let attestation: AttestationRx;
    let issuer, issuer2, holder: KeyringPair;
    beforeAll(async () => {
        api = await ApiRx.create({provider: 'wss://rimu.unfrastructure.io/public/ws'}).toPromise();
        const simpleKeyring = testKeyring({ type: 'sr25519' });
        issuer = simpleKeyring.addFromUri(issuerUri);
        issuer2 = simpleKeyring.addFromUri(issuer2Uri);
        holder = simpleKeyring.addFromUri(holderUri);
        attestation = api.attestation;
    });

    afterAll(() => {
        api.disconnect();
    });

    describe('Set Claims', () => {
        it('should create a claim', done => {
            const claim = attestation.setClaim(holder.address, topic, attestationValue.toHex());

            claim
                .signAndSend(issuer)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    }),
                    first()
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimSet') {
                            expect(data[0].toString()).toBe(holder.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic);
                            expect(data[3].toString()).toBe(attestationValue.toHex());
                            done();
                        }
                    }
                });
        });

        it('should create a self claim', done => {
            const claim = attestation.setSelfClaim(topic, attestationValue.toHex());

            claim
                .signAndSend(issuer)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    }),
                    first()
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimSet') {
                            expect(data[0].toString()).toBe(issuer.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic);
                            expect(data[3].toString()).toBe(attestationValue.toHex());
                            done();
                        }
                    }
                });
        });
    });

    describe('Get Claim', () => {
        it('should get a claim with a specific issuer and holder', done => {
            attestation.getClaim(holder.address, issuer.address, topic).subscribe(claim => {
                expect(claim.toHex()).toBe(attestationValue.toHex());
                expect(claim.toU8a()).toEqual(attestationValue.toU8a());

                done();
            });
        });
    });

    describe('Create Multiple Claims', () => {
        it('should create a claim with issuer 1 and topic 1', done => {
            const claim = attestation.setClaim(holder.address, topic, attestationValue.toHex());

            claim
                .signAndSend(issuer)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    })
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimSet') {
                            expect(data[0].toString()).toBe(holder.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic);
                            expect(data[3].toString()).toBe(attestationValue.toHex());
                            done();
                        }
                    }
                });
        });

        it('should create a claim with issuer 1 and topic 2', done => {
            const claim = attestation.setClaim(holder.address, topic2, attestationValue2.toHex());

            claim
                .signAndSend(issuer)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    })
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimSet') {
                            expect(data[0].toString()).toBe(holder.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic2);
                            expect(data[3].toString()).toBe(attestationValue2.toHex());
                            done();
                        }
                    }
                });
        });

        it('should create a claim with issuer 2 and topic 1', done => {
            const claim = attestation.setClaim(holder.address, topic, attestationValue.toHex());

            claim
                .signAndSend(issuer2)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    })
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimSet') {
                            expect(data[0].toString()).toBe(holder.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer2.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic);
                            expect(data[3].toString()).toBe(attestationValue.toHex());
                            done();
                        }
                    }
                });
        });

        it('should create a claim with issuer 2 and topic 2', done => {
            const claim = attestation.setClaim(holder.address, topic2, attestationValue2.toHex());

            claim
                .signAndSend(issuer2)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    })
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimSet') {
                            expect(data[0].toString()).toBe(holder.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer2.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic2);
                            expect(data[3].toString()).toBe(attestationValue2.toHex());
                            done();
                        }
                    }
                });
        });
    });

    describe('Get Mutiple Claims Claim', () => {
        it('should get a claim with a specific issuer and holder', done => {
            attestation
                .getClaims(holder.address, [issuer.address, issuer2.address], [topic, topic2])
                .subscribe(({claims}) => {
                    expect(claims[topic][issuer.address].toHex()).toEqual(attestationValue.toHex());
                    expect(claims[topic][issuer.address].toU8a()).toEqual(attestationValue.toU8a());

                    expect(claims[topic][issuer2.address].toHex()).toEqual(attestationValue.toHex());
                    expect(claims[topic][issuer2.address].toU8a()).toEqual(attestationValue.toU8a());

                    expect(claims[topic2][issuer.address].toHex()).toEqual(attestationValue2.toHex());
                    expect(claims[topic2][issuer.address].toU8a()).toEqual(attestationValue2.toU8a());

                    expect(claims[topic2][issuer2.address].toHex()).toEqual(attestationValue2.toHex());
                    expect(claims[topic2][issuer2.address].toU8a()).toEqual(attestationValue2.toU8a());
                });
            done();
        });
    });

    describe('Remove Claims', () => {
        it('should remove a claim', done => {
            const claim = attestation.removeClaim(holder.address, topic);

            // Expect holders to match
            claim
                .signAndSend(issuer)
                .pipe(
                    filter(({events, status}) => {
                        return status.isFinalized && events !== undefined;
                    })
                )
                .subscribe(({events, status}) => {
                    for (const {event: {method, data}} of events) {
                        if (method === 'ClaimRemoved') {
                            expect(data[0].toString()).toBe(holder.address);
                            // Expect issuers to match
                            expect(data[1].toString()).toBe(issuer.address);
                            // expect topic to match
                            expect(data[2].toString()).toEqual(topic);
                            done();
                        }
                    }
                });
        });
    });
});
