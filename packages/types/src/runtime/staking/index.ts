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

import { Enum } from '@polkadot/types';
import { Registry } from '@polkadot/types/types';
import { AccountId } from '@cennznet/types/interfaces';

// Specifies which account staking rewards should be paid too.
// Note: Polkadot has an additional 'Staked' option which is not supported in CENNZnet
// due to the fact that the reward currency is different from the staked currency.
export class RewardDestination extends Enum {
  constructor(registry: Registry, value: any) {
    super(registry, { Stash: 'Null', Controller: 'Null', Account: 'AccountId' }, value);
  }

  get isStash(): boolean {
    return this.index === 0;
  }

  get isController(): boolean {
    return this.index === 1;
  }

  get isAccount(): boolean {
    return this.index === 2;
  }

  get asAccount(): AccountId {
    return this.raw as AccountId;
  }
}
