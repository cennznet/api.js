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
      type: 'Option<VersionedEventProof>',
    },
    getEventProof: {
      description: 'Get event proof for event Id',
      params: [
        {
          name: 'EventId',
          type: 'EthyEventId',
        },
      ],
      type: 'Option<VersionedEventProof>'
    }
  },
  types: {
    VersionedEventProof: {
      _enum: {
          sentinel: null,
          EventProof: 'EventProof'
      }
    },
    EthyId: "[u8; 33]",
    EthyEventId: 'u64',
    EventProof: {
      digest: '[u8; 32]',
      eventId: 'EthyEventId',
      validatorSetId: 'u64',
      signatures: 'Vec<EthereumSignature>',
      blockHash: '[u8; 32]',
      tag: 'Option<Vec<u8>>',
    },
  }
};
