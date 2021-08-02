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

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiRx } from '@cennznet/api';

import { ApiOptions } from '../types';
import { Api, Api as ApiPromise } from '../Api';

export async function UseCennznetRx(
  dAppName: string,
  options: ApiOptions
): Promise<{ api: ApiRx; accounts: InjectedAccountWithMeta[]; isExtensionInstalled: boolean }> {
  const api = await ApiRx.create(options).toPromise();
  return updateExtensionMetadataRetrieveAccounts(api, options, dAppName);
}

export async function UseCennznet(
  dAppName: string,
  options: ApiOptions
): Promise<{ api: ApiPromise; accounts: InjectedAccountWithMeta[]; isExtensionInstalled: boolean }> {
  const api = await Api.create(options);
  return updateExtensionMetadataRetrieveAccounts(api, options, dAppName);
}

async function updateExtensionMetadataRetrieveAccounts(
  api: ApiPromise,
  options: ApiOptions,
  dAppName: string
): Promise<{ api: ApiPromise; accounts: InjectedAccountWithMeta[]; isExtensionInstalled: boolean }>;

async function updateExtensionMetadataRetrieveAccounts(
  api: ApiRx,
  options: ApiOptions,
  dAppName: string
): Promise<{ api: ApiRx; accounts: InjectedAccountWithMeta[]; isExtensionInstalled: boolean }>;

async function updateExtensionMetadataRetrieveAccounts(
  api: ApiPromise | ApiRx,
  options: ApiOptions,
  dAppName: string
): Promise<{ api: ApiPromise | ApiRx; accounts: InjectedAccountWithMeta[]; isExtensionInstalled: boolean }> {
  const extensions = await web3Enable(dAppName);
  const cennznetExtension = extensions.find((ext) => ext.name === 'cennznet-extension');
  if (!cennznetExtension) {
    return { api: api, accounts: null, isExtensionInstalled: false };
  }
  const allAccounts = await web3Accounts();
  return { api: api, accounts: allAccounts, isExtensionInstalled: true };
}
