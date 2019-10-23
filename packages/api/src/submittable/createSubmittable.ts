/* eslint-disable no-dupe-class-members */
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

// Copyright 2017-2018 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Call} from '@plugnet/types/interfaces';
import {Constructor} from '@plugnet/types/types';
import {ApiInterfaceRx, ApiTypes} from '../types';
import {SubmittableExtrinsic} from './types';

import ApiBase from '@plugnet/api/base';

type Creator<ApiType> = (extrinsic: Call | Uint8Array | string) => SubmittableExtrinsic<ApiType>;

let Submittable: Constructor<SubmittableExtrinsic<any>>;

export default function createSubmittable<ApiType>(
    type: ApiTypes,
    api: Partial<ApiInterfaceRx>,
    decorateMethod: ApiBase<ApiType>['decorateMethod']
): Creator<ApiType> {
    return (extrinsic: Call | Uint8Array | string): SubmittableExtrinsic<ApiType> => {
        // HACK This is not great, but basically what we do here is to lazily only require the class
        // right at the point it is actually needed - delaying initialization
        if (!Submittable) {
            Submittable = require('./Submittable').default;
        }

        return new Submittable(extrinsic, {api, decorateMethod, type});
    };
}
