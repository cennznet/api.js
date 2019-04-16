import {Tuple, U128} from '@plugnet/types';
import AssetId from './ga/AssetId';

export class ExchangeKey extends Tuple.with([AssetId, AssetId]) {}

export class FeeRate extends U128 {
    static readonly SCALE_FACTOR = 1000000;
}
