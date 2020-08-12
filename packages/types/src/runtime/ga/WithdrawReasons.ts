// Copyright 2020 Centrality Investments Limited
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

import {i8} from '@polkadot/types';

// See: https://github.com/plugblockchain/plug-blockchain/blob/f580bbbb496f66655b27105e27e9d1e1d52bbb02/frame/support/src/traits.rs#L737-L756
const ReasonMask = {
  /// In order to pay for (system) transaction costs.
  TRANSACTION_PAYMENT: 0b0000_0001,
  /// In order to transfer ownership.
  TRANSFER: 0b0000_0010,
  /// In order to reserve some funds for a later return or repatriation.
  RESERVE: 0b0000_0100,
  /// In order to pay some other (higher-level) fees.
  FEE: 0b0000_1000,
  /// In order to tip a validator for transaction inclusion.
  TIP: 0b0001_0000,
  // Combined mask, all on
  ALL: this.TRANSACTION_VERSION & this.TRANSFER & this.RESERVE & this.FEE & this.TIP,
};

export default class WithdrawReasons extends i8 {
  // The mask value of all reasons set
  static all(): number {
    return ReasonMask.ALL;
  }
  // Whether the withdraw reasons are 'all' of them
  isAll(): boolean {
    return (this.toNumber() & ReasonMask.ALL) === ReasonMask.ALL;
  }
  // Whether the withdraw reasons include higher-level fees.
  isFee(): boolean {
    return (this.toNumber() & ReasonMask.FEE) === ReasonMask.FEE;
  }
  // Whether the withdraw reasons include reservation.
  isReserve(): boolean {
    return (this.toNumber() & ReasonMask.RESERVE) === ReasonMask.RESERVE;
  }
  // Whether the withdraw reasons include transaction tips.
  isTip(): boolean {
    return (this.toNumber() & ReasonMask.TIP) === ReasonMask.TIP;
  }
  // Whether the withdraw reasons include transaction fee payment.
  isTransactionPayment(): boolean {
    return (this.toNumber() & ReasonMask.TRANSACTION_PAYMENT) === ReasonMask.TRANSACTION_PAYMENT;
  }
  // Whether the withdraw reasons include transfers.
  isTransfer(): boolean {
    return (this.toNumber() & ReasonMask.TRANSFER) === ReasonMask.TRANSFER;
  }
}
