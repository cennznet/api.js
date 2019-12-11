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

import {ApiRx} from '../../src/ApiRx';
import initApiRx from '../../../../jest/initApiRx';

describe('e2e rx api create', () => {
  let apiRx;
  let incorrectApiRx;

  beforeAll(async () => {
    const incorrectEndPoint = 'wss://rimu.centrality.cloud/';

    apiRx = await initApiRx();
    incorrectApiRx = await ApiRx.create({provider: incorrectEndPoint});
  });

  afterAll(async done => {
    apiRx = null;
    incorrectApiRx = null;
    done();
  });
  it('should create an Api instance with the timeout option', async done => {
    const api = await apiRx.toPromise();

    api.rpc.chain.getBlockHash().subscribe(hash => {
      expect(hash).toBeDefined();
      done();
    });
  });

  it('should create Api without timeout if timeout is 0', async done => {
    const api = await apiRx.toPromise();
    api.rpc.chain.getBlockHash().subscribe(hash => {
      expect(hash).toBeDefined();
      done();
    });
  });

  it('should get error if the connection fails', async () => {
    await expect(incorrectApiRx.toPromise()).rejects.toThrow(/Connection fail/);
  });

  it('should get rejected if it is not resolved in a specific period of time', async () => {
    const incorrectEndPoint = 'wss://rimu.centrality.cloud/ws?apikey=d449e2d0-868a-4f38-b977-b99e1476b7f0';

    incorrectApiRx = await ApiRx.create({provider: incorrectEndPoint, timeout: -1});

    await expect(incorrectApiRx.toPromise()).rejects.toThrow(/Timeout has occurred/);
  });
});
