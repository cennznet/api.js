// Copyright 2019-2021 Centrality Investments Limited
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

import {getMetadata, essential} from "../../src/util/getMetadata";
import {TypeRegistry} from "@polkadot/types/create";
import {MetadataVersioned} from "@polkadot/types/metadata/MetadataVersioned";

describe('getMetadata()',  () => {
  it('get slim metadata for endpoint', async (done)=> {
    const slimMetadata = await getMetadata('ws://localhost:9944');
    const metadataKey = Object.entries(slimMetadata)[0][0].split('-');
    const metadataValue = Object.entries(slimMetadata)[0][1];
    expect(metadataKey[1]).toEqual("46");
    const registry = new TypeRegistry();
    const mVersionedSlim = new MetadataVersioned(registry, metadataValue);
    const modules = mVersionedSlim.asLatest.pallets.toArray();
    const storageData = modules.filter(m => m.storage.isSome);
    expect(storageData.length).toEqual(essential.length);
    const modulesName = storageData.map(value => value.name.toString().toLowerCase());
    expect(modulesName.sort()).toEqual(essential.sort());
    done();
  });

  it('get custom metadata for endpoint, with the list of metadata expected', async (done)=> {
    const keepMetaFor = ['Staking']
    const slimMetadata = await getMetadata('ws://localhost:9944', keepMetaFor);
    const metadataKey = Object.entries(slimMetadata)[0][0].split('-');
    const metadataValue = Object.entries(slimMetadata)[0][1];
    expect(metadataKey[1]).toEqual("46");
    const registry = new TypeRegistry();
    const mVersionedSlim = new MetadataVersioned(registry, metadataValue);
    const modules = mVersionedSlim.asLatest.pallets.toArray();
    const storageData = modules.filter(m => m.storage.isSome);
    expect(storageData.length).toEqual(keepMetaFor.length + essential.length);
    const modulesNameRecieved = storageData.map(value => value.name.toString().toLowerCase());
    const modulesNameExpected = keepMetaFor.concat(essential).map(value => value.toLowerCase());
    expect(modulesNameRecieved.sort()).toEqual(modulesNameExpected.sort());
    done();
  });
});
