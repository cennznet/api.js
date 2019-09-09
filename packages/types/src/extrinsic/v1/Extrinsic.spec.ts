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

import staticMetadata from '@cennznet/api/staticMetadata';
import fromMetadata from '@plugnet/api-metadata/extrinsics/fromMetadata';
import {getTypeRegistry, Metadata} from '@plugnet/types';
import {hexToU8a} from '@plugnet/util';
import Extrinsic from '../Extrinsic';
import * as types from '../index';
import Call from '@plugnet/types/primitive/Generic/Call';

const typeRegistry = getTypeRegistry();
typeRegistry.register(types as any);

describe('CennznetExtrinsic', () => {
    const metadata = new Metadata(staticMetadata[Object.keys(staticMetadata)[0]]);
    Call.injectMethods(fromMetadata(metadata));

    it('decode extrinsic with feeExchange', () => {
        const hexValue =
            '0x5902a1ff8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4850341ff1633e656a7b7d89566b1eb3f8c3c636c00b04d3b50bce028d39d3d813764afea67c638b631117315f2c26109f5c9646ae8d8f431f65b5b512505575016000010101fa8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48419cc20901000f0000c52ebca2b1';
        const extrinsic = new Extrinsic(hexToU8a(hexValue));
        expect(extrinsic.feeExchange).toBeDefined();
        expect(extrinsic.feeExchange.assetId.toNumber()).toEqual(17008);
        expect(extrinsic.feeExchange.maxPayment.toString()).toEqual('50000000000000000');
        expect(extrinsic.toHex()).toBe(hexValue);
    });
});
