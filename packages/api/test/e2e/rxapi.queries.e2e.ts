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

import { Hash } from '@cennznet/types';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import initApiRx from '../../../../jest/initApiRx';

describe('e2e queries', () => {
  let apiRx;
  let api;

  beforeAll(async () => {
    apiRx = await initApiRx();
    api = await apiRx.toPromise();
  });

  afterAll(async done => {
    api = null;
    done();
  });

  describe('Query storage using at', () => {
    it('Queries correct balance', async done => {
      const nextAssetId$ = api.rpc.chain
        .getBlockHash()
        .pipe(switchMap(blockHash => api.query.genericAsset.nextAssetId.at(blockHash as Hash)));
      combineLatest(api.query.genericAsset.nextAssetId(), nextAssetId$).subscribe(([nextAssetId, nextAssetIdAt]) => {
        expect(nextAssetId.toString()).toEqual(nextAssetIdAt.toString());
        done();
      });
    });
  });
});
