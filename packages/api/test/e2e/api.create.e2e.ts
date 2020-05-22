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

import {Api} from '../../src/Api';
import staticMetadata from '../../src/staticMetadata';
import initApiPromise from '../../../../jest/initApiPromise';
import config from '../../../../config';
import { Metadata } from '@polkadot/types';

describe('e2e api create', () => {
  let api;
  let incorrectApi;

  it.skip('For local environment - checking if static metadata is same as latest', async () => {
    api = await initApiPromise();
    const meta = staticMetadata[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`];
    expect(meta).toBeDefined();
    expect(api.runtimeMetadata.toJSON()).toEqual(new Metadata(api.registry, meta).toJSON());
  });

  afterEach(async () => {
    try {
      api.disconnect();
      if (incorrectApi) {
        incorrectApi.disconnect();
      }
      incorrectApi = null;
    } catch (e) {}
  });

  it('should create an Api instance with the timeout option', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    api = await Api.create({provider, timeout: 1000000});

    const hash = await api.rpc.chain.getBlockHash();

    expect(hash).toBeDefined();
  });

  it('should get rejected if the connection fails', async () => {
    const incorrectEndPoint = 'wss://rimu.unfrastructure.io/private/ws';
    await expect(Api.create({provider: incorrectEndPoint})).rejects.toThrow(
      'Connection fail');
  });

  it('should get rejected if it is not resolved in a specific period of time', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    await expect(Api.create({provider, timeout: 1})).rejects.toThrow(
      'Timed out in 1 ms.');
  });
});
