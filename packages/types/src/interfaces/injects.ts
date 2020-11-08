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

import VecAny from '@polkadot/types/codec/VecAny';
import { CENNZnetExtrinsicSignatureV1, SignerPayload } from './extrinsic';
import * as definitions from './definitions';

const _types = {
  ...definitions,
  // We override the substrate v4 extrinsic signature type in CENNZnet
  // This funny format, makes it compatible with the structure from generated definitions
  other: {
    types: {
      ExtrinsicSignatureV4: CENNZnetExtrinsicSignatureV1,
      VecDeque: VecAny,
      SignerPayload,
    },
  },
};

// Unwind the nested type definitions into a flat map
export default Object.values(_types).reduce((res, { types }): object => ({ ...res, ...types }), {});
