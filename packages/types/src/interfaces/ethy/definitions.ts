export default {
  rpc: {
    subscribeEventProofs: {
      description: 'Subscribe event proof',
      params: [],
      pubsub: [
        'eventProofs',
        'subscribeEventProofs',
        'unsubscribeEventProofs',
      ],
      type: 'EventProof',
    },
  },
  types: {
    EthyId: "[u8; 33]",
    EventProof: {
      digest: '[u8; 32]',
      eventId: 'u64',
      validatorSetId: 'u64',
      signatures: 'Vec<EthereumSignature>'
    },
  }
};
