// Copyright 2019-2020 Centrality Investments Limited
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

import { Api } from '@cennznet/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { Keyring } from '@polkadot/keyring';
import initApiPromise from '../../../../../jest/initApiPromise';
import { cryptoWaitReady } from '@polkadot/util-crypto';

const issuerUri = '//Alice';
const issuer2Uri = '//Bob';
const holderUri = '//Charlie';

let api: Api;
let issuer, issuer2, holder: KeyringPair;
let attestationValue, attestationValue2, topic, topic2;

beforeAll(async () => {
  await cryptoWaitReady();
  api = await initApiPromise();
  const keyring = new Keyring({ type: 'sr25519' });
  issuer = keyring.addFromUri(issuerUri);
  issuer2 = keyring.addFromUri(issuer2Uri);
  holder = keyring.addFromUri(holderUri);
  attestationValue = api.registry.createType('AttestationValue', '0x6964656e74697479');
  attestationValue2 = api.registry.createType('AttestationValue', '0x12121212121234a1');
  topic = api.registry.createType('AttestationTopic', '0x70617373706f7274'); // hex for passport
  topic2 = api.registry.createType('AttestationTopic', '0x6f7665723138'); // hex for over18
});

afterAll(async () => {
  await api.disconnect();
});

describe('Attestation APIs', () => {
  describe('Set Claims', () => {
    it('should create a claim', async done => {
      await api.tx.attestation
        .setClaim(holder.address, topic, attestationValue.toHex())
        .signAndSend(issuer, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimCreated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(topic.toHex());
                expect(data[3].toHex()).toBe(attestationValue.toHex());
                done();
              }
            }
          }
        });
    });

    it('should create a claim with a u8a', async done => {
      const otherTopic = api.registry.createType('AttestationTopic', '0x72616e646f6d546f706963'); // hex for randomTopic
      await api.tx.attestation
        .setClaim(holder.address, otherTopic, attestationValue.toU8a())
        .signAndSend(issuer, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimCreated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(otherTopic.toHex());
                expect(data[3].toHex()).toBe(attestationValue.toHex());
                done();
              }
            }
          }
        });
    });
  });

  describe('Get Claim', () => {
    it('should get a claim with a specific issuer and holder', async done => {
      const claim = await api.derive.attestation.getClaim(holder.address, issuer.address, topic);
      expect(claim.value.toHex()).toEqual(attestationValue.toHex());
      expect(claim.value.toU8a()).toEqual(attestationValue.toU8a());
      done();
    });
  });

  describe('Create Multiple Claims', () => {
    it('should create a claim with issuer 1 and topic 1', async done => {
      await api.tx.attestation
        .setClaim(holder.address, topic, attestationValue.toHex())
        .signAndSend(issuer, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimUpdated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(topic.toHex());
                expect(data[3].toHex()).toBe(attestationValue.toHex());
                done();
              }
            }
          }
        });
    });

    it('should create a claim with issuer 1 and topic 2', async done => {
      await api.tx.attestation
        .setClaim(holder.address, topic2, attestationValue2.toHex())
        .signAndSend(issuer, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimCreated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(topic2.toHex());
                expect(data[3].toHex()).toBe(attestationValue2.toHex());
                done();
              }
            }
          }
        });
    });

    it('should create a claim with issuer 2 and topic 1', async done => {
      await api.tx.attestation
        .setClaim(holder.address, topic, attestationValue.toHex())
        .signAndSend(issuer2, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimCreated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer2.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(topic.toHex());
                expect(data[3].toHex()).toBe(attestationValue.toHex());
                done();
              }
            }
          }
        });
    });

    it('should create a claim with issuer 2 and topic 2', async done => {
      await api.tx.attestation
        .setClaim(holder.address, topic2, attestationValue2.toHex())
        .signAndSend(issuer2, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimCreated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer2.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(topic2.toHex());
                expect(data[3].toHex()).toBe(attestationValue2.toHex());
                done();
              }
            }
          }
        });
    });
  });

  describe('Get Mutiple Claims Claim', () => {
    it('should get a claim with a specific issuer and holder', async done => {
      const claims = await api.derive.attestation.getClaims(
        holder.address,
        [issuer.address, issuer2.address],
        [topic, topic2]
      );

      expect(claims[0].value.toHex()).toEqual(attestationValue.toHex());
      expect(claims[0].value.toU8a()).toEqual(attestationValue.toU8a());

      expect(claims[1].value.toHex()).toEqual(attestationValue2.toHex());
      expect(claims[1].value.toU8a()).toEqual(attestationValue2.toU8a());

      expect(claims[2].value.toHex()).toEqual(attestationValue.toHex());
      expect(claims[2].value.toU8a()).toEqual(attestationValue.toU8a());

      expect(claims[3].value.toHex()).toEqual(attestationValue2.toHex());
      expect(claims[3].value.toU8a()).toEqual(attestationValue2.toU8a());

      done();
    });
  });

  describe('Remove Claims', () => {
    it('should create a claim', async done => {
      await api.tx.attestation
        .setClaim(holder.address, topic, attestationValue.toHex())
        .signAndSend(issuer, async ({ events, status }) => {
          if (status.isInBlock && events !== undefined) {
            for (const {
              event: { method, data },
            } of events) {
              if (method === 'ClaimUpdated') {
                expect(data[0].toString()).toBe(holder.address);
                // Expect issuers to match
                expect(data[1].toString()).toBe(issuer.address);
                // expect topic to match
                expect(data[2].toHex()).toEqual(topic.toHex());
                expect(data[3].toHex()).toBe(attestationValue.toHex());
                done();
              }
            }
          }
        });
    });

    it('should remove a claim', async done => {
      // Expect holders to match
      await api.tx.attestation.removeClaim(holder.address, topic).signAndSend(issuer, async ({ events, status }) => {
        if (status.isInBlock && events !== undefined) {
          for (const {
            event: { method, data },
          } of events) {
            if (method === 'ClaimRemoved') {
              expect(data[0].toString()).toBe(holder.address);
              // Expect issuers to match
              expect(data[1].toString()).toBe(issuer.address);
              // expect topic to match
              expect(data[2].toHex()).toEqual(topic.toHex());
              done();
            }
          }
        }
      });
    });
  });
});
