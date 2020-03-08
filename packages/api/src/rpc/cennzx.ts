import {RpcMethodOpt} from '@polkadot/jsonrpc/types';

import createMethod from '@polkadot/jsonrpc/create/method';
import createParam from '@polkadot/jsonrpc/create/param';

const buyPrice: RpcMethodOpt = {
  description: 'Retrieves the exchange price (buy price)',
  isOptional: true,
  params: [
    createParam('AssetToBuy', 'AssetId'),
    createParam('Amount', 'Balance'),
    createParam('AssetToPay', 'AssetId'),
  ],
  type: 'Balance',
};

const sellPrice: RpcMethodOpt = {
  description: 'Retrieves the exchange price (sell price)',
  isOptional: true,
  params: [
    createParam('AssetToSell', 'AssetId'),
    createParam('Amount', 'Balance'),
    createParam('AssetToPayout', 'AssetId'),
  ],
  type: 'Balance',
};

const section = 'cennzx';

export default [
  {...createMethod(section, 'buyPrice', buyPrice), name: 'buyPrice'},
  {...createMethod(section, 'sellPrice', sellPrice), name: 'sellPrice'},
];
