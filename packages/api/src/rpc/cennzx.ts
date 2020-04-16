import {RpcMethodOpt} from '@polkadot/jsonrpc/types';

import createMethod from '@polkadot/jsonrpc/create/method';
import createParam from '@polkadot/jsonrpc/create/param';

const buyPrice: RpcMethodOpt = {
  description: 'Retrieves the spot exchange buy price',
  isOptional: true,
  params: [
    createParam('AssetToBuy', 'AssetId'),
    createParam('Amount', 'Balance'),
    createParam('AssetToPay', 'AssetId'),
  ],
  type: 'Balance',
};

const sellPrice: RpcMethodOpt = {
  description: 'Retrieves the spot exchange sell price',
  isOptional: true,
  params: [
    createParam('AssetToSell', 'AssetId'),
    createParam('Amount', 'Balance'),
    createParam('AssetToPayout', 'AssetId'),
  ],
  type: 'Balance',
};

const section = 'cennzx';

export default {
  isDeprecated: false,
  isHidden: false,
  description: 'CENNZX-spot',
  section,
  methods: {
    buyPrice: createMethod(section, 'buyPrice', buyPrice),
    sellPrice: createMethod(section, 'sellPrice', sellPrice),
  },
};
