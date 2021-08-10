import {bool} from "@polkadot/types";

export default {
  rpc: {
    getProposalVotes: {
      description: 'Get all proposals and the vote information',
      params: [],
      type: 'Vec<ProposalVotes<AccountId>>'
    }
  },
  types: {
    ProposalId: 'u64',
    ProposalStatusInfo: {
      _enum: {
        'Deliberation': null,
        'ApprovedWaitingEnactment': null,
        'ApprovedEnacted': bool,
        'ApprovedEnactmentCancelled': null,
        'Disapproved': null
      }
    },
    ProposalVoteInfo:{
      voteBits: '(u128, u128)',
      activeBits: '(u128, u128)'
    },
    "ProposalVotes": {
      "proposalId": "ProposalId",
      "votes": "Vec<(AccountId, Option<bool>)>"
    },
    "Proposal": {
      "sponsor": "AccountId",
      "justificationUri": "Vec<u8>",
      "enactmentDelay": "u64"
    }
  },
};
