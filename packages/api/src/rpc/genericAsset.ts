import {RpcMethodOpt} from '@polkadot/jsonrpc/types';

import createMethod from '@polkadot/jsonrpc/create/method';

const registeredAssets: RpcMethodOpt = {
  description: 'Retrieves the spot exchange buy price',
  isOptional: true,
  params: [],
  type: 'Vec<(T::AssetId, AssetInfo)>',
};

const section = 'genericAsset';

export default [{...createMethod(section, 'registeredAssets', registeredAssets), name: 'registeredAssets'}];
