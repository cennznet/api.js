// Copyright 2019-2021 Centrality Investments Limited
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

import type { Observable } from '@polkadot/x-rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';

import { combineLatest } from '@polkadot/x-rxjs';
import { map, switchMap } from '@polkadot/x-rxjs/operators';
import { hexToString } from '@polkadot/util';
import { Option, ProposalId, GovernanceProposal as Proposal, Vec, ProposalVotes } from '@cennznet/types';
import { DeriveProposalInfo } from '@cennznet/api/derives/governance/types';

/**
 * @description Retrieve the proposal overview
 */
export function proposals(instanceId: string, api: ApiInterfaceRx) {
  return (): Observable<DeriveProposalInfo[]> => {
    return api.query.governance.nextProposalId().pipe(
      switchMap(
        (nextProposalId): Observable<DeriveProposalInfo[]> => {
          const queryArgsList = [];
          for (let i = 0; i < (nextProposalId as ProposalId).toNumber(); i++) {
            queryArgsList.push({ proposalId: i });
          }
          return combineLatest([
            api.query.governance.proposalCalls.multi(queryArgsList.map((arg) => [arg.proposalId])),
            api.query.governance.proposals.multi(queryArgsList.map((arg) => [arg.proposalId])),
            (api.rpc as any).governance.getProposalVotes(),
          ]).pipe(
            map(
              ([proposalCalls, proposals, votes]: [
                [],
                Vec<Option<Proposal>>,
                Vec<ProposalVotes>
              ]): DeriveProposalInfo[] => {
                const proposalDetails = proposalCalls.map((call, idx) => {
                  if (proposals[idx].isSome) {
                    const proposalDetail = proposals[idx].unwrap().toJSON();
                    return {
                      id: idx,
                      proposal: {
                        call: call,
                        sponsor: proposalDetail.sponsor,
                        justificationCid: hexToString(proposalDetail.justificationUri as string),
                        enactmentDelay: proposalDetail.enactmentDelay,
                      },
                      votes:
                        votes.length > 0
                          ? ((votes.toJSON() as unknown) as ProposalVotes[]).find(
                              (vote: ProposalVotes) => ((vote.proposalId as unknown) as number) === idx
                            )?.votes
                          : [],
                    };
                  }
                });
                return (proposalDetails.filter(
                  (proposal) => proposal !== undefined
                ) as unknown) as DeriveProposalInfo[];
              }
            )
          );
        }
      )
    );
  };
}
