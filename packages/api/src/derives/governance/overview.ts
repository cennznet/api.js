// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
                              (vote: ProposalVotes) => vote.proposalId.toNumber() === idx
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
