const paymentRpc = {
  queryInfo: {
    description: 'Query transaction payment info',
    params: [
      {
        name: 'EncodedXt',
        type: 'Bytes',
      },
      {
        name: 'At',
        type: 'BlockHash',
      },
    ],
    type: 'RuntimeDispatchInfo',
  },
};

export default paymentRpc;
