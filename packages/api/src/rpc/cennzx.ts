/**
 * This is similar to type defination of cennzx
 *
 * Note: @polkadot/jsonrpc has been deprecated since version 1.8.1
 *
 * TODO: Get refactored by using types to make PRC decoration, once polkadot/api dependency is upgraded to 1.8.1 above
 */
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
  description: 'Get the price of liquidity for the given asset ID',
  isOptional: true,
  params: [createParam('AssetId', 'AssetId'), createParam('liquidityToBuy', 'Balance')],
  type: '(Balance, Balance)' as any,
};

const liquidityValue: RpcMethodOpt = {
  description: "Get the value of an account's liquidity for the given asset",
  isOptional: true,
  params: [createParam('AccountId', 'Address'), createParam('AssetId', 'AssetId')],
  type: '(Balance, Balance, Balance)' as any,
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
