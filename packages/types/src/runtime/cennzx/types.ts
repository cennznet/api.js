import {Codec} from '@polkadot/types/types';

import AssetId from '../ga/AssetId';

export interface IExchangeKey extends Codec, Array<AssetId> {}
