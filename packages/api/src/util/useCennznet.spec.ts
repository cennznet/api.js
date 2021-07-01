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

import { useCennznet } from '@cennznet/api/util/useCennznet';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { MetadataDef } from '@polkadot/extension-inject/types';

jest.mock('@polkadot/extension-dapp', () => ({
  web3Enable: jest.fn(),
  web3Accounts: jest.fn(),
}));

const web3EnableMocked = web3Enable as any;
const web3AccountsMocked = web3Accounts as any;

describe('useCennznet()', () => {
  beforeEach(async (done) => {
    localStorage.clear();
    done();
  });

  it('Should connect to correct chain and return null Accounts', async () => {
    web3EnableMocked.mockImplementation(() => {
      return [];
    });
    const { api, accounts } = await useCennznet('test_dapp', { network: 'azalea' });
    const systemChain = await api.rpc.system.chain();
    expect(accounts).toBe(null);
    expect(systemChain.toString()).toBe('CENNZnet Azalea');
  });

  it('Should return API and Dummy account when metadata already set', async () => {
    const fakeInjectedExtension = {
      name: 'polkadot-js',
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
    localStorage.setItem(`EXTENSION_META_UPDATED`, 'true');

    const { api, accounts } = await useCennznet('test_dapp', { network: 'azalea' });

    expect(api).toBeDefined();
    expect(accounts[0].address).toBe(fakeAccount.address);
  });

  it('Should extract and set metadata from chain', async () => {
    const fakeInjectedExtension = {
      name: 'polkadot-js',
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

    const { api, accounts } = await useCennznet('test_dapp', { network: 'nikau' });

    expect(api).toBeDefined();
    expect(accounts[0].address).toBe(fakeAccount.address);
    expect(fakeInjectedExtension.metadata.data.genesisHash).toBe(
      '0x4d9337089848aa1aac7f6db23118c3844cfd99972c394521f62341ef1b657612'
    );
    expect(fakeInjectedExtension.metadata.data.chain.toString()).toBe('CENNZnet Nikau');
  });
});
