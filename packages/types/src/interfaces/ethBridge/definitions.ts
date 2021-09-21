export default {
  types: {
    "EventProofId": "u64",
    "EventClaimId": "u64",
    "EthAddress": "H160",
    "EthHash": "H256",
    "EventTypeId": "u32",
    "Erc20DepositEvent": {
      "tokenAddress": "EthAddress",
      "amount": "U256",
      "beneficiary": "Address"
    },
    "EventClaimResult": {
      _enum: {
        Valid: null,
        DataProviderErr: null,
        TxStatusFailed: null,
        UnexpectedContractAddress: null,
        NoTxLogs: null,
        NotEnoughConfirmations: null,
        UnexpectedData: null,
        Expired: null
      }
    },
    "NotarizationPayload": {
      "eventClaimId": "EventClaimId",
      "authorityIndex": "u16",
      "result": "EventClaimResult"
    },
    Details: 'Vec<(EthAddress, Vec<u8>, u8 )>',
  },
};
