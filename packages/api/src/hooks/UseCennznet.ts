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

import { ApiOptions } from '../types';
import { Api, Api as ApiPromise } from '../Api';
import { cennznetExtensions } from '../util/cennznetExtensions';

export async function UseCennznet(
  dAppName: string,
  options: ApiOptions
): Promise<{ api: ApiPromise; accounts: InjectedAccountWithMeta[] }> {
  const api = await Api.create(options);
  const extensions = await web3Enable(dAppName);
  if (extensions.length === 0) {
    return { api: api, accounts: null };
  }
  const polkadotExtension = extensions.find((ext) => ext.name === 'polkadot-js');
  const metadata = polkadotExtension.metadata;
  const checkIfMetaUpdated = localStorage.getItem(`EXTENSION_META_UPDATED-${options.network}`);
  if (!checkIfMetaUpdated) {
    const metadataDef = await extractMeta(api);
    await metadata.provide(metadataDef);
    localStorage.setItem(`EXTENSION_META_UPDATED-${options.network}`, 'true');
  }
  const allAccounts = await web3Accounts();
  return { api: api, accounts: allAccounts };
}

async function extractMeta(api) {
  const systemChain = await api.rpc.system.chain();
  const specTypes = getSpecTypes(
    api.registry,
    systemChain,
    api.runtimeVersion.specName,
    api.runtimeVersion.specVersion
  );
  if (specTypes.ExtrinsicSignatureV4) {
    delete specTypes.ExtrinsicSignatureV4;
  }
  if (specTypes.SignerPayload) {
    delete specTypes.SignerPayload;
  }
  if (specTypes.ExtrinsicPayloadV4) {
    delete specTypes.ExtrinsicPayloadV4;
  }
  const DEFAULT_SS58 = api.registry.createType('u32', addressDefaults.prefix);
  const DEFAULT_DECIMALS = api.registry.createType('u32', 4);
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
    types: specTypes,
    userExtensions: cennznetExtensions,
  };
  return metadata as MetadataDef;
}
