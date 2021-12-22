// Copyright 2020-2021 Centrality Investments Limited
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

import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { u8aToString } from '@polkadot/util'

import initApiPromise from '../../../../jest/initApiPromise';
import { AccountId, Vec } from '@cennznet/types';
import {DeriveProposalInfo} from "@cennznet/api/derives/governance/types";

let api;
const keyring = new Keyring({ type: 'sr25519' });
let councilMemberAlice, councilMemberBob, councilMemberCharlie, councilMemberDave;

beforeAll(async done => {
  await cryptoWaitReady();
  api = await initApiPromise();
  const sudoKey = await api.query.sudo.key();
  // alice is sudo
  councilMemberAlice = keyring.addFromUri('//Alice');
  councilMemberDave = keyring.addFromUri('//Dave');
  councilMemberBob = keyring.addFromUri('//Bob');
  councilMemberCharlie = keyring.addFromUri('//Charlie');
  // Lookup from keyring (assuming we have added all, on --dev this would be `//Alice`)
  const sudoPair = keyring.getPair(sudoKey.toString());
  let nonce = await api.rpc.system.accountNextIndex(sudoPair.address);
  // Add registrar account with sudo
  await new Promise<void>((resolve) => {
    const tx0 = api.tx.identity.addRegistrar(councilMemberAlice.address);
    const tx1 = api.tx.identity.addRegistrar(councilMemberBob.address);
    const tx2 = api.tx.identity.addRegistrar(councilMemberCharlie.address);
    const tx3 = api.tx.identity.addRegistrar(councilMemberDave.address);
    const batchRegistrarEx = api.tx.utility.batch([tx0, tx1, tx2, tx3]);
    api.tx.sudo
        .sudo(batchRegistrarEx)
        .signAndSend(sudoPair, { nonce: nonce++ }, async ({events, status}) => {
          if (status.isInBlock) {
            resolve();
          }
        });
  });


  const bond = (await api.query.staking.minimumBond()) + 12_345;

  const promise0 = new Promise<void>((resolve) => {
    const data = api.registry.createType('Data','0x00000000000000000000000000000000000000000000000000000000005a4159', 2);
    const info = api.registry.createType('IdentityInfo', {'web': data});
    const tx1 = api.tx.identity.setIdentity(info);
    const regIndex = 0; // reg index for Alice
    const target = councilMemberAlice.address;
    const judgement = {"KnownGood": true};
    const tx2 = api.tx.identity.provideJudgement(regIndex, target, judgement);
    const target2 = councilMemberBob.address;
    // const regIndex2 = 1; // reg index for Bob
    const tx3 = api.tx.identity.provideJudgement(regIndex, target2, judgement);
    api.tx.utility.batch([tx1, tx2, tx3]).signAndSend(councilMemberAlice, {nonce: nonce++}, async ({ status }) => {
      if (status.isInBlock) {
        resolve();
      }
    });
  });

  const promise1 = new Promise<void>((resolve) => {
    const tx1 = api.tx.staking.bond(councilMemberBob.address, bond, 'controller');
    const data = api.registry.createType('Data','0x00000000000000000000000000000000000000000000000000000000005a4159', 2);
    const info = api.registry.createType('IdentityInfo', {'web': data});
    const tx2 = api.tx.identity.setIdentity(info);
    const regIndex = 1; // reg index for Bob
    const target = councilMemberBob.address;
    const judgement = {"KnownGood": true};
    const tx3 = api.tx.identity.provideJudgement(regIndex, target, judgement);
    const regIndex2 = 0; // reg index for Alice
    const target2 = councilMemberAlice.address;
    const tx4 = api.tx.identity.provideJudgement(regIndex, target2, judgement);
    api.tx.utility.batch([tx1, tx2, tx3, tx4]).signAndSend(councilMemberBob, async ({ status }) => {
      if (status.isInBlock) {
        resolve();
      }
    });
  });
  const promise2 = new Promise<void>((resolve) => {
    const tx1 = api.tx.staking.bond(councilMemberCharlie.address, bond, 'controller');
    const data = api.registry.createType('Data','0x00000000000000000000000000000000000000000000000000000000005a4159', 2);
    const info = api.registry.createType('IdentityInfo', {'web': data});
    // const info = api.registry.createType('IdentityInfo', {'web': '0x00000000000000000000000000000000000000000000000000000000005a4159'})
    const tx2 = api.tx.identity.setIdentity(info);
    const regIndex = 2; // reg index for charlie
    const target = councilMemberCharlie.address;
    const judgement = {"KnownGood": true};
    const tx3 = api.tx.identity.provideJudgement(regIndex, target, judgement);
    const regIndex2 = 3; // reg index for Dave
    const target2 = councilMemberDave.address;
    const tx4 = api.tx.identity.provideJudgement(regIndex, target2, judgement);
    api.tx.utility.batch([tx1, tx2, tx3, tx4]).signAndSend(councilMemberCharlie, async ({ status }) => {
      if (status.isInBlock) {
        resolve();
      }
    });
    // api.tx.staking.bond(councilMemberCharlie.address, bond, 'controller').signAndSend(councilMemberCharlie, async ({ status }) => {
    //   if (status.isInBlock) {
    //     resolve();
    //   }
    // });
  });
  const promise3 = new Promise<void>((resolve) => {
    const tx1 = api.tx.staking.bond(councilMemberDave.address, bond, 'controller');
    const data = api.registry.createType('Data','0x00000000000000000000000000000000000000000000000000000000005a4159', 2);
    const info = api.registry.createType('IdentityInfo', {'web': data});
    // const info = api.registry.createType('IdentityInfo', {'web': '0x00000000000000000000000000000000000000000000000000000000005a4159'})
    const tx2 = api.tx.identity.setIdentity(info);
    const regIndex = 3; // reg index for Dave
    const target = councilMemberDave.address;
    const judgement = {"KnownGood": true};
    const tx3 = api.tx.identity.provideJudgement(regIndex, target, judgement);
    const regIndex2 = 2; // reg index for charlie
    const target2 = councilMemberCharlie.address;
    const tx4 = api.tx.identity.provideJudgement(regIndex, target2, judgement);
    api.tx.utility.batch([tx1, tx2, tx3, tx4]).signAndSend(councilMemberDave, async ({ status }) => {
      if (status.isInBlock) {
        resolve();
      }
    });
    // api.tx.staking.bond(councilMemberDave.address, bond, 'controller').signAndSend(councilMemberDave, async ({ status }) => {
    //   if (status.isInBlock) {
    //     resolve();
    //   }
    // });
  });

  // const promise4 = new Promise<void>((resolve) => {
  //
  // });

  //nonce = await api.rpc.system.accountNextIndex(sudoPair.address);
  const promise4 = new Promise<void>((resolve) => {
    api.tx.sudo.sudo(api.tx.governance.setMinimumCouncilStake(bond)).signAndSend(sudoPair, {nonce: nonce++}, async ({ status }) => {
      if (status.isInBlock) {
        resolve();
      }
    });
  });

  await Promise.all([promise0, promise1, promise2, promise3, promise4]);

  // await new Promise<void>(async (resolve, reject) => {
  //   await api.tx.sudo
  //     .sudo(batchStake)
  //     .signAndSend(sudoPair, async ({events, status}) => {
  //       if (status.isInBlock) {
  //         for (const {event: {method, section, data}} of events) {
  //           console.log('Method:', method.toString());
  //           console.log('section:', section.toString());
  //         }
  //         console.log(`Transaction included at blockHash ${status.asInBlock}`);
  //         resolve();
  //       }
  //     });
  // });

  // const transaction1 = api.tx.governance.addCouncilMember(councilMemberAlice.address);
  const transaction2 = api.tx.governance.addCouncilMember(councilMemberBob.address);
  const transaction3 = api.tx.governance.addCouncilMember(councilMemberCharlie.address);
  // const transaction4 = api.tx.governance.addCouncilMember(councilMemberDave.address);

  const batchCouncilEx = api.tx.utility.batch([
    // transaction1,
    transaction2,
    transaction3,
    // transaction4
  ]);

  //nonce = await api.rpc.system.accountNextIndex(sudoPair.address);
  await api.tx.sudo
    .sudo(batchCouncilEx)
    .signAndSend(sudoPair, {nonce: nonce++}, async ({ events, status }) => {
      if (status.isInBlock) {
        for (const {event: {method, section, data}} of events) {
          console.log('Method:', method.toString());
          console.log('section:', section.toString());
        }
        console.log(`Transaction included at blockHash ${status.asInBlock}`);
        done();
      }
    });

});

afterAll(async () => {
  await api.disconnect();
});

describe('Governance', () => {

  it('List all council members', async done => {
    const councilMembers: Vec<AccountId> = await api.query.governance.council();
    console.log('Councilmemmbers::....', councilMembers.toJSON());
    const members: string[] = councilMembers.toJSON() as unknown as string[];
    expect(members.includes(councilMemberBob.address)).toBeTruthy();
    // expect(members.includes(councilMemberAlice.address)).toBeTruthy();
    expect(members.includes(councilMemberCharlie.address)).toBeTruthy();
    // expect(members.includes(councilMemberDave.address)).toBeTruthy();
    done();
  });

  it('creates a proposal to add new council member', async done => {
    const newCouncilMember = '5FWEHQqYMN8YCg8yJxKHnon7Dtx4Psp2xnjvKfQqGC6kUwgv';
    const call = api.tx.governance.addCouncilMember(newCouncilMember);
    const proposalCall = api.registry.createType('Call', call).toHex();
    const justificationUri = 'https://example.com/nft/metadata'
    const enactmentDelay = 26; // execute after 26 blocks once sufficient votes criteria is met
    await api.tx.governance.submitProposal(
      proposalCall,
      justificationUri,
      enactmentDelay, // execute after 2
    ).signAndSend(councilMemberBob, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
        expect((await api.query.governance.proposalCalls(0)).toString()).toBe(proposalCall);
        const proposalOpt = await api.query.governance.proposals(0);
        const proposal = proposalOpt.unwrap();
        expect(proposal.sponsor.toString()).toEqual(councilMemberBob.address);
        expect(u8aToString(proposal.justificationUri)).toEqual(justificationUri);
        expect(proposal.enactmentDelay.toString()).toEqual(enactmentDelay.toString());
        done();
      }
    });
  });

  it('vote for proposal 0 to add new council member by a valid council member', async done => {
    const proposalId = 0;
    const vote = true;
    await api.tx.governance.voteOnProposal(
      proposalId,
      vote
    ).signAndSend(councilMemberCharlie, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
        const votesFetched = await api.rpc.governance.getProposalVotes();
        console.log('votes fetched::')
        const votes = votesFetched.toJSON().find((vote: { proposalId: number; }) => vote.proposalId === proposalId)?.votes;
        const charlieVoted = votes.find(vote => vote[0] === councilMemberCharlie.address && vote[1] === true);
        console.log('Charlie voted::',charlieVoted);
        expect(charlieVoted).toBeDefined();
        done();
      }
    });
  });

  it('vote for proposal 0 to add new council member by a non council member should fail', async done => {
    const nonCouncilMember = keyring.addFromUri('//Ferdie');
    const proposalId = 0;
    const vote = true;
    await api.tx.governance.voteOnProposal(
      proposalId,
      vote
    ).signAndSend(nonCouncilMember, async ({ status, events }) => {
      if (status.isInBlock) {
        events.forEach(({phase, event: {data, method, section}}) => {
          expect(section).toEqual('system');
          expect(method).toEqual('ExtrinsicFailed')
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          done();
        });
      }
    });
  });

  it('List all the proposals and its details', async done => {
    const proposalId = 0;
    const proposals: DeriveProposalInfo[] = await api.derive.governance.proposals();
    console.log('proposals::',proposals);
    const proposal = proposals.find(proposal => proposal.id === proposalId);
    const newCouncilMember = '5FWEHQqYMN8YCg8yJxKHnon7Dtx4Psp2xnjvKfQqGC6kUwgv';
    const call = api.tx.governance.addCouncilMember(newCouncilMember);
    const proposalCall = api.registry.createType('Call', call).toHex();
    expect(proposal.id).toEqual(proposalId);
    expect(proposal.proposal.call.toString()).toEqual(proposalCall.toString());
    expect(proposal.proposal.enactmentDelay).toEqual(26);
    expect(proposal.proposal.justificationCid).toEqual('https://example.com/nft/metadata')
    const charlieVoted = proposal.votes.find(vote => vote[0] === councilMemberCharlie.address && vote[1] === true);
    const bobProposed = proposal.votes.find(vote => vote[0] === councilMemberBob.address && vote[1] === true);
    expect(charlieVoted).toBeDefined();
    expect(bobProposed).toBeDefined();
    done();
  });

});
