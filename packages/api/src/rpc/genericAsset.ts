import {RpcMethodOpt} from '@polkadot/jsonrpc/types';

import createMethod from '@polkadot/jsonrpc/create/method';

const registeredAssets: RpcMethodOpt = {
  description: 'Get all registered generic assets (symbol, decimal places)',
  isOptional: true,
  params: [],
  type: 'Vec<(AssetId, AssetInfo)>',
};

const section = 'genericAsset';

export default [{...createMethod(section, 'registeredAssets', registeredAssets), name: 'registeredAssets'}];
