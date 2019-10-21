/* eslint-disable no-dupe-class-members */
// Copyright 2017-2019 @polkadot/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Call} from '@plugnet/types/interfaces';
import {Constructor} from '@plugnet/types/types';
import {ApiInterfaceRx, ApiTypes} from '../types';
import {SubmittableExtrinsic} from './types';

//import ApiBase from '../base1';
import {ApiRx} from '@cennznet/api';
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
