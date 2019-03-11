import {Tuple} from '@polkadot/types';
import AssetId from './ga/AssetId';

export class ExchangeKey extends Tuple.with([AssetId, AssetId]) {}
