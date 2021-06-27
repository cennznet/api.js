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

import {ApiRx} from '../../src/ApiRx';
import initApiRx from '../../../../jest/initApiRx';

describe('e2e rx api create', () => {
  const incorrectEndPoint = 'wss://rimu.centrality.cloud/';

  afterAll(async done => {
    done();
  });

  it('Should create an Api instance with the timeout option', async done => {
    const apiRx = await initApiRx();
    const api = await apiRx.toPromise();

    api.rpc.chain.getBlockHash().subscribe(hash => {
      expect(hash).toBeDefined();
      done();
    });
  });

  it('Should connect to all available networks on cennznet via network name', async done => {
    let apiRx;
    let api;
    const networkNames = ['azalea', 'nikau', 'rata', 'local'] as const;
    const connectionPromises = networkNames.map(async networkName => {
      apiRx = await ApiRx.create({network: networkName, timeout: 10000});
      api = await apiRx.toPromise()
      return api.rpc.chain.getBlockHash();
    });
    const networkHashes = await Promise.all(connectionPromises);
    networkHashes.forEach(hash => {
      expect(hash).toBeDefined();
    })
    done();
  });

  it('Should connect to use network name and not provider', async done => {
    const apiRx = await ApiRx.create({ network: 'local', provider: 'wss://should/not/use/this/provider.io', timeout: 10000});
    const api = await apiRx.toPromise()
    api.rpc.chain.getBlockHash().subscribe(hash => {
      expect(hash).toBeDefined();
      done();
    });
  });

  it('Should create Api without timeout if timeout is 0', async done => {
    const apiRx = await initApiRx();
    const api = await apiRx.toPromise();
    api.rpc.chain.getBlockHash().subscribe(hash => {
      expect(hash).toBeDefined();
      done();
    });
  });

  it('Should get error if the connection fails', async () => {
    const incorrectApiRx = await ApiRx.create({provider: incorrectEndPoint});
    await expect(incorrectApiRx.toPromise()).rejects.toThrow(/Connection fail/);
  });

  it('Should get rejected if it is not resolved in a specific period of time', async () => {
    const incorrectApiRx = await ApiRx.create({timeout: -1});
    await expect(incorrectApiRx.toPromise()).rejects.toThrow(/Timeout has occurred/);
  });
});
