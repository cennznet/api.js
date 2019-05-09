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
import staticMetadata from '../../staticMetadata';
import WsProvider from '@plugnet/rpc-provider/ws';
import {Metadata} from '@plugnet/types';

describe('e2e api create', () => {

    it('For Kauri environment - checking if static metadata is same as latest', async () => {
        const endPoint = 'wss://kauri.centrality.cloud/ws?apikey=d449e2d0-868a-4f38-b977-b99e1476b7f0';
        const websocket = new WsProvider(endPoint);
        const api = await Api.create({provider: websocket});
        const meta = staticMetadata[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`];
        expect(api.runtimeMetadata.toJSON()).toEqual(new Metadata(meta).toJSON());
        (websocket as any).websocket.onclose = null;
        (websocket as any).websocket.close();
    });

    it('For Rimu environment - checking if static metadata is same as latest', async () => {
        const endPoint = 'wss://rimu.centrality.cloud/ws?apikey=d449e2d0-868a-4f38-b977-b99e1476b7f0';
        const websocket = new WsProvider(endPoint);
        const api = await Api.create({provider: websocket});
        const meta = staticMetadata[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`];
        expect(api.runtimeMetadata.toJSON()).toEqual(new Metadata(meta).toJSON());
        (websocket as any).websocket.onclose = null;
        (websocket as any).websocket.close();
    });

});
