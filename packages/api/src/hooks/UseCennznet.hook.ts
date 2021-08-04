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

import { UseCennznet, UseCennznetRx } from '@cennznet/api/hooks/UseCennznet';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { MetadataDef } from '@polkadot/extension-inject/types';
import { Api, ApiRx } from '@cennznet/api';

jest.mock('@polkadot/extension-dapp', () => ({
  web3Enable: jest.fn(),
  web3Accounts: jest.fn(),
}));

const web3EnableMocked = web3Enable as any;
const web3AccountsMocked = web3Accounts as any;

describe('UseCennznet()', () => {
  let apiGlobal;

  beforeEach((done) => {
    localStorage.clear();
    done();
  });

  it('Should connect to correct chain, return null Accounts, and extension not installed', async () => {
    web3EnableMocked.mockImplementation(() => {
      return [];
    });
    const { api, accounts, isExtensionInstalled } = await UseCennznet('test_dapp', { network: 'azalea' });
    apiGlobal = api;
    const systemChain = await api.rpc.system.chain();
    expect(accounts).toBe(null);
    expect(isExtensionInstalled).toBe(false);
    expect(systemChain.toString()).toBe('CENNZnet Azalea');
  });

  it('Should return API, Dummy account, and extension installed when metadata already set', async () => {
    const fakeInjectedExtension = {
      name: 'cennznet-extension',
    };
    const fakeAccount = {
      address: 'random_account_hash',
    };
    web3EnableMocked.mockImplementation(() => {
      return [fakeInjectedExtension];
    });
    web3AccountsMocked.mockImplementation(() => {
      return [fakeAccount];
    });
    apiGlobal = await Api.create({ network: 'azalea' });
    localStorage.setItem(
      `cennznet-ext-meta-azalea-${apiGlobal.runtimeVersion.specName}-${apiGlobal.runtimeVersion.specVersion}`,
      'true'
    );
    await apiGlobal.disconnect();
    const { api, accounts, isExtensionInstalled } = await UseCennznet('test_dapp', { network: 'azalea' });
    apiGlobal = api;
    expect(api).toBeDefined();
    expect(isExtensionInstalled).toBe(true);
    expect(accounts[0].address).toBe(fakeAccount.address);
  });

  it('Should extract and set metadata from chain', async () => {
    const fakeInjectedExtension = {
      name: 'cennznet-extension',
      metadata: {
        data: {} as MetadataDef,
        provide: (metadata: MetadataDef) => {
          return (fakeInjectedExtension.metadata.data = metadata);
        },
      },
    };
    const fakeAccount = {
      address: 'random_account_hash',
    };
    web3EnableMocked.mockImplementation(() => {
      return [fakeInjectedExtension];
    });
    web3AccountsMocked.mockImplementation(() => {
      return [fakeAccount];
    });

    const { api, accounts } = await UseCennznet('test_dapp', { network: 'nikau' });
    apiGlobal = api;
    expect(api).toBeDefined();
    expect(accounts[0].address).toBe(fakeAccount.address);
    expect(fakeInjectedExtension.metadata.data.genesisHash).toBe(
      '0xc65170707265757d8a1fb8e039062286b8f0092f2984f5938588bd8e0f21ca2e'
    );
    expect(fakeInjectedExtension.metadata.data.chain.toString()).toBe('CENNZnet Nikau');
  });

  it('Should be able to connect to multiple chains and update metadata', async () => {
    const fakeInjectedExtension = {
      name: 'cennznet-extension',
      metadata: {
        provide: (metadata: MetadataDef) => {
          return (fakeInjectedExtension.metadata[metadata.genesisHash] = metadata);
        },
      },
    };
    const fakeAccount = {
      address: 'random_account_hash',
    };
    web3EnableMocked.mockImplementation(() => {
      return [fakeInjectedExtension];
    });
    web3AccountsMocked.mockImplementation(() => {
      return [fakeAccount];
    });

    // Update extension with azalea metadata
    let res = await UseCennznet('test_dapp', { network: 'azalea' });
    const azaleaGenHash = '0x0d0971c150a9741b8719b3c6c9c2e96ec5b2e3fb83641af868e6650f3e263ef0';
    expect(fakeInjectedExtension.metadata[azaleaGenHash].chain.toString()).toBe('CENNZnet Azalea');
    await res.api.disconnect();

    // Update extension with nikau metadata
    res = await UseCennznet('test_dapp', { network: 'nikau' });
    const nikauGenHash = '0xc65170707265757d8a1fb8e039062286b8f0092f2984f5938588bd8e0f21ca2e';
    expect(fakeInjectedExtension.metadata[nikauGenHash].chain.toString()).toBe('CENNZnet Nikau');
    await res.api.disconnect();

    // Empty azalea metadata and ensure it isn't updated because extension should already have it stored
    fakeInjectedExtension.metadata[azaleaGenHash] = undefined;
    res = await UseCennznet('test_dapp', { network: 'azalea' });
    expect(fakeInjectedExtension.metadata[azaleaGenHash]).toBeUndefined();
    await res.api.disconnect();
  });

  it('Should return API RX instance', async (done) => {
    const fakeInjectedExtension = {
      name: 'cennznet-extension',
      metadata: {
        provide: (metadata: MetadataDef) => {
          return (fakeInjectedExtension.metadata[metadata.genesisHash] = metadata);
        },
      },
    };
    const fakeAccount = {
      address: 'random_account_hash',
    };
    web3EnableMocked.mockImplementation(() => {
      return [fakeInjectedExtension];
    });
    web3AccountsMocked.mockImplementation(() => {
      return [fakeAccount];
    });
    const { api } = await UseCennznetRx('test_dapp', { network: 'azalea' });
    apiGlobal = api;
    (api as ApiRx).rpc.chain.getBlockHash().subscribe((hash) => {
      expect(hash).toBeDefined();
      done();
    });
  });

  afterEach(async () => {
    try {
      if (apiGlobal.isConnected) {
        await apiGlobal.disconnect();
      }
    } catch (e) {
      console.error(e);
    }
  });
});
