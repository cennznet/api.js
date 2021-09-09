// Copyright 2019-2020 Centrality Investments Limited
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

// CENNZnet types for injection into a polkadot API session

import { OverrideBundleType } from '@polkadot/types/types/registry';
import {
  CENNZnetExtrinsicSignatureV1,
  CENNZnetExtrinsicSignatureV0,
  SignerPayload,
  CENNZnetExtrinsicPayloadV1,
  CENNZnetExtrinsicPayloadV0,
  CENNZnetExtrinsic
} from './extrinsic';
import * as definitions from './definitions';
import { EnhancedTokenId } from './nft/enhanced-token-id';

const _types = {
  ...definitions,
  // We override the substrate v4 extrinsic signature type in CENNZnet
  // This funny format, makes it compatible with the structure from generated definitions
  other: {
    types: {
      SignerPayload,
    },
  },
};

const shareType37Onwards = {
  GenericExtrinsic: CENNZnetExtrinsic,
  // In our staking runtime module, we use StakingLedgerTo223 definition of polkadot's staking ledger
  // StakingLedger: 'StakingLedgerTo223',
  ExtrinsicSignatureV4: CENNZnetExtrinsicSignatureV1,
  ExtrinsicPayloadV4: CENNZnetExtrinsicPayloadV1,
  MessageId: 'SyloMessageId',
  EnhancedTokenId,
  // CENNZnet lookup source is 1:1 with address
  LookupSource: 'Address',
};

export const typesBundle: OverrideBundleType = {
  spec: {
    cennznet: {
      types: [
        {
          minmax: [0, 36],
          types: {
            DispatchClass: 'DispatchClassTo36',
            DispatchInfo: 'DispatchInfoTo36',
            ExtrinsicSignatureV4: CENNZnetExtrinsicSignatureV0,
            ExtrinsicPayloadV4: CENNZnetExtrinsicPayloadV0,
            AssetInfo: 'AssetInfoV40'
          },
        },
        {
          minmax: [37, 40],
          types: {
            ...shareType37Onwards,
            AssetInfo: 'AssetInfoV40',
            Proposal: 'GovernanceProposal'
          },
        },
        {
          minmax: [41, undefined],
          types: {
            ...shareType37Onwards,
            AssetInfo: 'AssetInfoV41',
            // Proposal also exist in polkadots democracy module
            Proposal: 'GovernanceProposal',
            // works with this definition
            SessionKeys5B: '(AccountId, AccountId, AccountId, AccountId, BeefyKey)',
            Keys: 'SessionKeys5B'
          },
        },
      ],
    },
  },
};
// Unwind the nested type definitions into a flat map
export default Object.values(_types).reduce((res, { types }): Record<string, unknown> => ({ ...res, ...types }), {});
