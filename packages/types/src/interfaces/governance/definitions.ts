import {bool} from "@polkadot/types";

export default {
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
  },
};
