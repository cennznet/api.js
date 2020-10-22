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

import { HttpProvider, WsProvider } from '@polkadot/rpc-provider';

import { getProvider } from './getProvider';

jest.mock('@polkadot/rpc-provider');

describe('getProvider()', () => {
  it('will create a ws provider if the string is a valid url and start with ws or wss', () => {
    const providerWss = getProvider('wss://xxxx0.xx.xx:9944');
    const providerWs = getProvider('ws://xxx0x.xx.xx:9944');

    expect(providerWss instanceof WsProvider).toEqual(true);
    expect(providerWs instanceof WsProvider).toEqual(true);
  });

  it('will create a http provider if the string is a valid url and start with http or https', () => {
    const providerHttps = getProvider('https://xxx.xx.xx:9944');
    const providerHttp = getProvider('http://xxx-xx0x.xx.xx:9944');

    expect(providerHttps instanceof HttpProvider).toEqual(true);
    expect(providerHttp instanceof HttpProvider).toEqual(true);
  });

  it('will throw error if the string is not a valid url', () => {
    expect(() => getProvider('ssss')).toThrow(/Missing protocol: sss/);
  });

  it('will throw error if the protocol is not a valid protocol', () => {
    expect(() => getProvider('xwss://xxx.xx.xx:9944')).toThrow(/Missing protocol: xwss:\/\/xxx.xx.xx:9944/);
  });
});
