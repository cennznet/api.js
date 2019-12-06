import {Tuple} from '@polkadot/types';

import {AssetId} from '../ga';

export default class ExchangeKey extends Tuple.with([AssetId, AssetId]) {}
