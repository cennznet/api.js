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

  const transaction1 = api.tx.governance.addCouncilMember(councilMemberAlice.address);
  const transaction2 = api.tx.governance.addCouncilMember(councilMemberBob.address);
  const transaction3 = api.tx.governance.addCouncilMember(councilMemberCharlie.address);
  const transaction4 = api.tx.governance.addCouncilMember(councilMemberDave.address);

  const batchCouncilEx = api.tx.utility.batch([
    transaction1,
    transaction2,
    transaction3,
    transaction4
  ]);

  await api.tx.sudo
    .sudo(batchCouncilEx)
    .signAndSend(sudoPair, async ({ events, status }) => {
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
    expect(members.includes(councilMemberAlice.address)).toBeTruthy();
    expect(members.includes(councilMemberCharlie.address)).toBeTruthy();
    expect(members.includes(councilMemberDave.address)).toBeTruthy();
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
