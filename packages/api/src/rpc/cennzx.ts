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

const liquidityPrice: RpcMethodOpt = {
  description: 'Retrieves the price of liquidity for a particular `asset_id`',
  isOptional: true,
  params: [createParam('AssetId', 'AssetId'), createParam('liquidityToBuy', 'Balance')],
  type: '(Balance, Balance)',
};

const liquidityValue: RpcMethodOpt = {
  description: 'Retrieves the value of liquidity in the exchange for `asset_id` for `account`',
  isOptional: true,
  params: [createParam('AccountId', 'Address'), createParam('AssetId', 'AssetId')],
  type: '(Balance, Balance, Balance)',
};

const section = 'cennzx';

export default [
  {...createMethod(section, 'buyPrice', buyPrice), name: 'buyPrice'},
  {...createMethod(section, 'sellPrice', sellPrice), name: 'sellPrice'},
  {...createMethod(section, 'liquidityPrice', liquidityPrice), name: 'liquidityPrice'},
  {...createMethod(section, 'liquidityValue', liquidityValue), name: 'liquidityValue'},
];
