import {Tuple} from '@polkadot/types';
import AssetId from './AssetId';

export class ExchangeKey extends Tuple.with([AssetId, AssetId]) {}
