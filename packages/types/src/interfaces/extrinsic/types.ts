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

// Extrinsic related type definitions

import {
  AnyU8a,
  ExtrinsicPayloadValue as ExtrinsicPayloadValueBase,
  SignatureOptions as SignatureOptionsBase,
} from '@polkadot/types/types';
import { Option } from '@polkadot/types';
import { ChargeTransactionPayment, FeeExchange } from '../transactionPayment';
import { doughnut } from '../types';

export interface ExtrinsicPayloadValue extends ExtrinsicPayloadValueBase {
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}

export interface SignatureOptions extends SignatureOptionsBase {
  transactionPayment?: AnyU8a | ChargeTransactionPayment;
}

export interface ExtrinsicV0SignatureOptions extends SignatureOptionsBase {
  doughnut?: Option<doughnut>;
  transactionPayment?: ChargeTransactionPayment;
  feeExchange?: FeeExchange;
}
