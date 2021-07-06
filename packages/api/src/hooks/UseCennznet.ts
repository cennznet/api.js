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
import { InjectedAccountWithMeta, MetadataDef } from '@polkadot/extension-inject/types';
import { getSpecTypes } from '@polkadot/types-known';
import { defaults as addressDefaults } from '@polkadot/util-crypto/address/defaults';
import { default as cennznetExtensions } from '@cennznet/types/interfaces/extrinsic/signedExtensions/cennznet';
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
  if (extensions.length === 0) {
    return { api: api, accounts: null, isExtensionInstalled: false };
  }
  const polkadotExtension = extensions.find((ext) => ext.name === 'polkadot-js');
  const metadata = polkadotExtension.metadata;

  const checkIfMetaUpdated = localStorage.getItem(
    `cennznet-ext-meta-${options.network}-${api.runtimeVersion.specName}-${api.runtimeVersion.specVersion}`
  );
  if (!checkIfMetaUpdated) {
    const metadataDef = await extractMeta(api);
    await metadata.provide(metadataDef);
    localStorage.setItem(
      `cennznet-ext-meta-${options.network}-${api.runtimeVersion.specName}-${api.runtimeVersion.specVersion}`,
      'true'
    );
  }
  const allAccounts = await web3Accounts();
  return { api: api, accounts: allAccounts, isExtensionInstalled: true };
}

async function extractMeta(api) {
  const systemChain = await api.rpc.system.chain();
  const specTypes = getSpecTypes(
    api.registry,
    systemChain,
    api.runtimeVersion.specName,
    api.runtimeVersion.specVersion
  );
  const filteredSpecTypes = Object.keys(specTypes)
    .filter((key) => {
      return typeof specTypes[key] !== 'function';
    })
    .reduce((obj, key) => {
      obj[key] = specTypes[key];
      return obj;
    }, {});
  const DEFAULT_SS58 = api.registry.createType('u32', addressDefaults.prefix);
  const DEFAULT_DECIMALS = api.registry.createType('u32', 4);
  renameNestedKeys(cennznetExtensions, 'extra', 'payload');
  renameNestedKeys(cennznetExtensions, 'types', 'extrinsic');
  const metadata = {
    chain: systemChain,
    color: '#191a2e',
    genesisHash: api.genesisHash.toHex(),
    icon: 'CENNZnet',
    metaCalls: Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64'),
    specVersion: api.runtimeVersion.specVersion.toNumber(),
    ss58Format: DEFAULT_SS58.toNumber(),
    tokenDecimals: DEFAULT_DECIMALS.toNumber(),
    tokenSymbol: 'CENNZ',
    types: filteredSpecTypes,
    userExtensions: cennznetExtensions,
  };
  return metadata as MetadataDef;
}

function renameNestedKeys(obj, oldKey, newKey) {
  Object.keys(obj).map((key) => {
    if (typeof obj[key] === 'object') {
      renameNestedKeys(obj[key], oldKey, newKey);
    }
    if (key === oldKey) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  });
  return obj;
}
