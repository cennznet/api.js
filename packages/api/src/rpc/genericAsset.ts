import {RpcMethodOpt} from '@polkadot/jsonrpc/types';

import createMethod from '@polkadot/jsonrpc/create/method';

const registeredAssets: RpcMethodOpt = {
  description: 'RPC call for querying asset metadata',
  isOptional: true,
  params: [],
  type: 'Vec<(T::AssetId, AssetInfo)>',
};

const section = 'genericAsset';

export default [{...createMethod(section, 'registeredAssets', registeredAssets), name: 'registeredAssets'}];
