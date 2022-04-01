---
 Governance
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[RPC](#RPC)**

- **[Derive queries](#derive-queries)**

 
# Storage
 
### council(): `Vec<AccountId32>`
- **interface**: `api.query.governance.council`
- **summary**:    Ordered set of active council members 
 
### minimumCouncilStake(): `u128`
- **interface**: `api.query.governance.minimumCouncilStake`
- **summary**:    Minimum stake required to create a new council member 
 
### minVoterStakedAmount(): `u128`
- **interface**: `api.query.governance.minVoterStakedAmount`
- **summary**:    Minimum amount of staked CENNZ required to vote 
 
### nextProposalId(): `u64`
- **interface**: `api.query.governance.nextProposalId`
- **summary**:    Next available ID for proposal 
 
### proposalBond(): `u128`
- **interface**: `api.query.governance.proposalBond`
- **summary**:    Proposal bond amount in 'wei' 
 
### proposalCalls(`u64`): `Option<Bytes>`
- **interface**: `api.query.governance.proposalCalls`
- **summary**:    Map from proposal Id to call if any 
 
### proposals(`u64`): `Option<CrmlGovernanceProposal>`
- **interface**: `api.query.governance.proposals`
- **summary**:    Map from proposal Id to proposal info 
 
### proposalStatus(`u64`): `Option<CrmlGovernanceProposalStatusInfo>`
- **interface**: `api.query.governance.proposalStatus`
- **summary**:    Map from proposal Id to status 
 
### proposalVotes(`u64`): `CrmlGovernanceProposalVoteInfo`
- **interface**: `api.query.governance.proposalVotes`
- **summary**:    Map from proposal Id to votes 
 
### referendumStartTime(`u64`): `Option<u32>`
- **interface**: `api.query.governance.referendumStartTime`
- **summary**:    Map from proposal id to referendum start time 
 
### referendumThreshold(): `Permill`
- **interface**: `api.query.governance.referendumThreshold`
- **summary**:    Permill of vetos needed for a referendum to fail 
 
### referendumVetoSum(`u64`): `u128`
- **interface**: `api.query.governance.referendumVetoSum`
- **summary**:    Running tally of referendum votes 
 
### referendumVotes(`u64, AccountId32`): `u128`
- **interface**: `api.query.governance.referendumVotes`
- **summary**:    Map from proposal Id to VotingPower 
 
# Extrinsic
 
### addCouncilMember(new_member: `AccountId32`)
- **interface**: `api.tx.governance.addCouncilMember`
- **summary**:   Add a member to the council This must be submitted like any other proposal 
 
### cancelEnactment(proposal_id: `u64`)
- **interface**: `api.tx.governance.cancelEnactment`
- **summary**:   Cancel a proposal queued for enactment. 
 
### enactReferendum(proposal_id: `u64`)
- **interface**: `api.tx.governance.enactReferendum`
- **summary**:   Execute a proposal transaction 
 
### removeCouncilMember(remove_member: `AccountId32`)
- **interface**: `api.tx.governance.removeCouncilMember`
- **summary**:   Remove a member from the council This must be submitted like any other proposal 
 
### setMinimumCouncilStake(new_minimum_council_stake: `u128`)
- **interface**: `api.tx.governance.setMinimumCouncilStake`
- **summary**:   Adjust the minimum stake required for new council members 
 
### setMinimumVoterStakedAmount(new_minimum_staked_amount: `u128`)
- **interface**: `api.tx.governance.setMinimumVoterStakedAmount`
- **summary**:   Adjust the minimum staked amount This must be submitted like any other proposal 
 
### setProposalBond(new_proposal_bond: `u128`)
- **interface**: `api.tx.governance.setProposalBond`
- **summary**:   Adjust the proposal bond This must be submitted like any other proposal 
 
### setReferendumThreshold(new_referendum_threshold: `Permill`)
- **interface**: `api.tx.governance.setReferendumThreshold`
- **summary**:   Adjust the referendum veto threshold This must be submitted like any other proposal 
 
### submitProposal(call: `Bytes`, justification_uri: `Bytes`, enactment_delay: `u32`)
- **interface**: `api.tx.governance.submitProposal`
 
### voteAgainstReferendum(proposal_id: `u64`)
- **interface**: `api.tx.governance.voteAgainstReferendum`
- **summary**:   Submit a veto for a referendum 
 
### voteOnProposal(proposal_id: `u64`, vote: `bool`)
- **interface**: `api.tx.governance.voteOnProposal`
 
# Error
 
# Events
 
### EnactReferendum(`u64`, `bool`)
- **interface**: `api.events.governance.EnactReferendum.is`
- **summary**:   A proposal was enacted, success 
 
### ProposalVeto(`u64`)
- **interface**: `api.events.governance.ProposalVeto.is`
- **summary**:   A proposal was vetoed by the council 
 
### ReferendumApproved(`u64`)
- **interface**: `api.events.governance.ReferendumApproved.is`
- **summary**:   A referendum has been approved and is awaiting enactment 
 
### ReferendumCreated(`u64`)
- **interface**: `api.events.governance.ReferendumCreated.is`
- **summary**:   A proposal was approved by council and a referendum has been created 
 
### ReferendumVeto(`u64`)
- **interface**: `api.events.governance.ReferendumVeto.is`
- **summary**:   A referendum was vetoed by vote 
 
### SubmitProposal(`u64`)
- **interface**: `api.events.governance.SubmitProposal.is`
- **summary**:   A proposal was submitted 
 
# RPC
 
### getProposalVotes(): `Vec<ProposalVotes<AccountId>>`
- **interface**: `api.rpc.governance.getProposalVotes`
- **jsonrpc**: `governance_getProposalVotes`
- **summary**: Get all proposals and the vote information
 
# Derive queries

- **interface**: api.derive.governance.function_name
# Module: governance/overview


## Functions

### proposals

▸ **proposals**() => `Observable`<[`DeriveProposalInfo`](../interfaces/governance_types.deriveproposalinfo.md)[]\>

**`description`** Retrieve the proposal overview


`Observable`<[`DeriveProposalInfo`](../interfaces/governance_types.deriveproposalinfo.md)[]\>

#### Defined in

[packages/api/src/derives/governance/overview.ts:16](https://github.com/cennznet/api.js/blob/d167385/packages/api/src/derives/governance/overview.ts#L16)

# Module: governance/types


### Interfaces

- [DeriveProposalInfo](../interfaces/governance_types.deriveproposalinfo.md)
- [Proposal](../interfaces/governance_types.proposal.md)
