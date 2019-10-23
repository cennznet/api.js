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

import {CodecArg} from '@cennznet/types/types';
import {Call} from '@plugnet/types/interfaces';
import {Api, ApiRx} from '..';
import createSubmittable from '../submittable/createSubmittable';
import {SubmittableExtrinsic} from '../submittable/types';
import {SubmittableExtrinsicFunction} from '../types';

export function decorateExtrinsics(api: Api | ApiRx) {
    const creator = createSubmittable(api.type, (api as any)._rx, (api as any).decorateMethod);
    for (const sectionName of Object.keys(api.tx)) {
        for (const methodName of Object.keys(api.tx[sectionName])) {
            api.tx[sectionName][methodName] = decorateExtrinsic(api, api.tx[sectionName][methodName], creator);
        }
    }
}

function decorateExtrinsic(
    api: Api | ApiRx,
    method: SubmittableExtrinsicFunction<any>,
    creator: (value: Call | Uint8Array | string) => SubmittableExtrinsic<any>
): SubmittableExtrinsicFunction<any> {
    const newMethod = (...params: Array<CodecArg>) => {
        const extrinsic = creator(method(...params) as any);
        Object.defineProperty(extrinsic, 'fee', {
            value: sender => api.derive.fees.estimateFee(extrinsic, sender),
        });
        return extrinsic;
    };
    return (api as any).decorateFunctionMeta(method, newMethod);
}
