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
 
### council(): `Vec<AccountId>`
- **interface**: `api.query.governance.council`
- **summary**:   Ordered set of active council members 
 
### nextProposalId(): `ProposalId`
- **interface**: `api.query.governance.nextProposalId`
- **summary**:   Next available ID for proposal 
 
### proposalBond(): `Balance`
- **interface**: `api.query.governance.proposalBond`
- **summary**:   Proposal bond amount in 'wei' 
 
### proposalCalls(`ProposalId`): `Option<Bytes>`
- **interface**: `api.query.governance.proposalCalls`
- **summary**:   Map from proposal Id to call if any 
 
### proposals(`ProposalId`): `Option<Proposal>`
- **interface**: `api.query.governance.proposals`
- **summary**:   Map from proposal Id to proposal info 
 
### proposalStatus(`ProposalId`): `Option<ProposalStatusInfo>`
- **interface**: `api.query.governance.proposalStatus`
- **summary**:   Map from proposal Id to status 
 
### proposalVotes(`ProposalId`): `ProposalVoteInfo`
- **interface**: `api.query.governance.proposalVotes`
- **summary**:   Map from proposal Id to votes 
 
# Extrinsic
 
### addCouncilMember(new_member: `AccountId`)
- **interface**: `api.tx.governance.addCouncilMember`
- **summary**:   Add a member to the council This must be submitted like any other proposal 
 
### cancelEnactment(proposal_id: `ProposalId`)
- **interface**: `api.tx.governance.cancelEnactment`
- **summary**:   Cancel a proposal queued for enactment. 
 
### enactProposal(proposal_id: `ProposalId`)
- **interface**: `api.tx.governance.enactProposal`
- **summary**:   Execute a proposal transaction 
 
### removeCouncilMember(remove_member: `AccountId`)
- **interface**: `api.tx.governance.removeCouncilMember`
- **summary**:   Remove a member from the council This must be submitted like any other proposal 
 
### setProposalBond(new_proposal_bond: `Balance`)
- **interface**: `api.tx.governance.setProposalBond`
- **summary**:   Adjust the proposal bond This must be submitted like any other proposal 
 
### submitProposal(call: `Bytes`, justification_uri: `Bytes`, enactment_delay: `BlockNumber`)
- **interface**: `api.tx.governance.submitProposal`
 
### voteOnProposal(proposal_id: `ProposalId`, vote: `bool`)
- **interface**: `api.tx.governance.voteOnProposal`
 
# Error
 
# Events
 
### EnactProposal(`ProposalId`, `bool`)
- **summary**:   A proposal was enacted, success 
 
### ProposalVeto(`ProposalId`)
- **summary**:   A proposal was vetoed by the council 
 
### SubmitProposal(`ProposalId`)
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

[packages/api/src/derives/governance/overview.ts:16](https://github.com/cennznet/api.js/blob/30c06f4/packages/api/src/derives/governance/overview.ts#L16)

# Module: governance/types


### Interfaces

- [DeriveProposalInfo](../interfaces/governance_types.deriveproposalinfo.md)
- [Proposal](../interfaces/governance_types.proposal.md)
