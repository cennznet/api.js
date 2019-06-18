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

import {EnumType, U8a} from '@plugnet/types';
import FeesFee from './FeesFee';
import GenericAssetFee from './GenericAssetFee';

const genericAssetFeeIndex = 0;
const feesFeeIndex = 1;

/**
 * @name Fee
 * @description
 * Custom `Fee` type
 */
export default class Fee extends EnumType {
    static GenericAssetFee = {
        TransferFee: new Fee(GenericAssetFee.Transfer, genericAssetFeeIndex),
    };
    static FeesFee = {
        BaseFee: new Fee(FeesFee.Base, feesFeeIndex),
        BytesFee: new Fee(FeesFee.Bytes, feesFeeIndex),
    };

    constructor(values?: any, index?: number) {
        super({GenericAssetFee, FeesFee}, values, index);
    }
}
