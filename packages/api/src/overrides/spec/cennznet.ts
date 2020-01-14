import Option from '@polkadot/types/codec/Option';
import * as runtimeTypes from '../../../../types/src/runtime';

import '../../../../types/src/Option';

export default {
  ...runtimeTypes,
  AssetOf: 'u128',
  'ed25519::Signature': 'H512',
  RewardBalance: 'Balance',
  Option: Option,
};
