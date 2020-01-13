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

import '@polkadot/types/injector';
import {createType, getTypeRegistry} from '@polkadot/types';
import {Codec} from '@polkadot/types/types';
import Option from '@polkadot/types/codec/Option';

import {ChargeTransactionPayment, FeeExchange, FeeExchangeV1} from './index';

const registry = getTypeRegistry();
registry.register({Option, ChargeTransactionPayment, FeeExchange, FeeExchangeV1});

describe('ChargeTransactionPayment', () => {
  describe('codec', () => {
    it('encode', () => {
      const tp = createType('ChargeTransactionPayment');
      console.log(tp);
      console.log('isBare: false', tp.toU8a());
      console.log('isBare: true', tp.toU8a(true));
      expect(tp.toU8a(true)).toEqual(new Uint8Array([0, 0]));
    });
  });
});
