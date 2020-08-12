// Copyright 2019 Centrality Investments Limited
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

import {TypeRegistry} from '@polkadot/types';

import WithdrawReasons from './WithdrawReasons';

const registry = new TypeRegistry();
registry.register(WithdrawReasons);

describe('WithdrawReasons', () => {
  it('It can decode reasons: All', () => {
    const reasons = new WithdrawReasons(registry, WithdrawReasons.all());
    expect(reasons.isFee()).toBeTruthy();
    expect(reasons.isReserve()).toBeTruthy();
    expect(reasons.isTip()).toBeTruthy();
    expect(reasons.isTransactionPayment()).toBeTruthy();
    expect(reasons.isTransfer()).toBeTruthy();
    expect(reasons.isAll()).toBeTruthy();
  });
});
