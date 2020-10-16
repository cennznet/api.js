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

import { filter, first } from 'rxjs/operators';

import { ApiRx } from '@cennznet/api';
import testKeyring from '@polkadot/keyring/testing';
import { KeyringPair } from '@polkadot/keyring/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import initApiRx from '../../../../../jest/initApiRx';

const issuerUri = '//Alice';
const issuer2Uri = '//Bob';
const holderUri = '//Charlie';

let api: ApiRx;
let issuer, issuer2, holder: KeyringPair;
let attestationValue, attestationValue2, topic, topic2;

beforeAll(async () => {
  await cryptoWaitReady();
  const apiRx = await initApiRx();
  api = await apiRx.toPromise();

  const simpleKeyring = testKeyring({ type: 'sr25519' });
  issuer = simpleKeyring.addFromUri(issuerUri);
  issuer2 = simpleKeyring.addFromUri(issuer2Uri);
  holder = simpleKeyring.addFromUri(holderUri);
  attestationValue = api.registry.createType('AttestationValue', '0x6964656e74697479');
  attestationValue2 = api.registry.createType('AttestationValue', '0x12121212121234a1');
  topic = api.registry.createType('AttestationTopic', '0x70617373706f7274'); // hex for passport
  topic2 = api.registry.createType('AttestationTopic', '0x6f7665723138'); // hex for over18
});

afterAll(async () => {
  await api.disconnect();
});

describe('AttestationRx APIs', () => {
  describe('Set Claims', () => {
    it('should create a claim', done => {
      const claim = api.tx.attestation.setClaim(holder.address, topic, attestationValue.toHex());

      claim
        .signAndSend(issuer)
        .pipe(
          filter(({ events, status }) => {
            return status.isInBlock && events !== undefined;
          }),
          first()
        )
        .subscribe(({ events }) => {
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
        });
    });
  });

  describe('Get Claim', () => {
    it('should get a claim with a specific issuer and holder', done => {
      api.derive.attestation.getClaim(holder.address, issuer.address, topic).subscribe(claim => {
        if (
          claim.value.toHex() === attestationValue.toHex() &&
          claim.value.toU8a().toString() === attestationValue.toU8a().toString()
        ) {
          done();
        }
      });
    });
  });

  describe('Create Multiple Claims', () => {
    it('should create a claim with issuer 1 and topic 1', done => {
      const claim = api.tx.attestation.setClaim(holder.address, topic, attestationValue.toHex());

      claim
        .signAndSend(issuer)
        .pipe(
          filter(({ events, status }) => {
            return status.isInBlock && events !== undefined;
          })
        )
        .subscribe(({ events }) => {
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
        });
    });

    it('should create a claim with issuer 1 and topic 2', done => {
      const claim = api.tx.attestation.setClaim(holder.address, topic2, attestationValue2.toHex());

      claim
        .signAndSend(issuer)
        .pipe(
          filter(({ events, status }) => {
            return status.isInBlock && events !== undefined;
          })
        )
        .subscribe(({ events }) => {
          for (const {
            event: { method, data },
          } of events) {
            if (method === 'ClaimUpdated') {
              expect(data[0].toString()).toBe(holder.address);
              // Expect issuers to match
              expect(data[1].toString()).toBe(issuer.address);
              // expect topic to match
              expect(data[2].toHex()).toEqual(topic2.toHex());
              expect(data[3].toHex()).toBe(attestationValue2.toHex());
              done();
            }
          }
        });
    });

    it('should create a claim with issuer 2 and topic 1', done => {
      const claim = api.tx.attestation.setClaim(holder.address, topic, attestationValue.toHex());

      claim
        .signAndSend(issuer2)
        .pipe(
          filter(({ events, status }) => {
            return status.isInBlock && events !== undefined;
          })
        )
        .subscribe(({ events }) => {
          for (const {
            event: { method, data },
          } of events) {
            if (method === 'ClaimUpdated') {
              expect(data[0].toString()).toBe(holder.address);
              // Expect issuers to match
              expect(data[1].toString()).toBe(issuer2.address);
              // expect topic to match
              expect(data[2].toHex()).toEqual(topic.toHex());
              expect(data[3].toHex()).toBe(attestationValue.toHex());
              done();
            }
          }
        });
    });

    it('should create a claim with issuer 2 and topic 2', done => {
      const claim = api.tx.attestation.setClaim(holder.address, topic2, attestationValue2.toHex());

      claim
        .signAndSend(issuer2)
        .pipe(
          filter(({ events, status }) => {
            return status.isInBlock && events !== undefined;
          })
        )
        .subscribe(({ events, status }) => {
          for (const {
            event: { method, data },
          } of events) {
            if (method === 'ClaimUpdated') {
              expect(data[0].toString()).toBe(holder.address);
              // Expect issuers to match
              expect(data[1].toString()).toBe(issuer2.address);
              // expect topic to match
              expect(data[2].toHex()).toEqual(topic2.toHex());
              expect(data[3].toHex()).toBe(attestationValue2.toHex());
              done();
            }
          }
        });
    });
  });

  describe('Get Mutiple Claims Claim', () => {
    it('should get a claim with a specific issuer and holder', done => {
      api.derive.attestation
        .getClaims(holder.address, [issuer.address, issuer2.address], [topic, topic2])
        .subscribe(claims => {
          let claimsForTopic = false;
          let claimsForTopic2 = false;
          for (const { value } of claims) {
            if (
              value.toHex() === attestationValue.toHex() &&
              value.toU8a().toString() === attestationValue.toU8a().toString()
            ) {
              claimsForTopic = true;
            }
            if (
              value.toHex() === attestationValue2.toHex() &&
              value.toU8a().toString() === attestationValue2.toU8a().toString()
            ) {
              claimsForTopic2 = true;
            }
          }
          if (claimsForTopic && claimsForTopic2) {
            done();
          }
        });
    });
  });

  describe('Remove Claims', () => {
    it('should remove a claim', done => {
      const claim = api.tx.attestation.removeClaim(holder.address, topic);

      // Expect holders to match
      claim
        .signAndSend(issuer)
        .pipe(
          filter(({ events, status }) => {
            return status.isInBlock && events !== undefined;
          })
        )
        .subscribe(({ events }) => {
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
        });
    });
  });
});
