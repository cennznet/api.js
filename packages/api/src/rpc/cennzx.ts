// import { RpcMethodOpt } from '@polkadot/jsonrpc/types';
//
// import createMethod from '@polkadot/jsonrpc/create/method';
// import createParam from '@polkadot/jsonrpc/create/param';
//
// const buyPrice: RpcMethodOpt = {
//   description: 'Retrieves the CENNZX exchange buy price',
//   isOptional: true,
//   params: [
//     createParam('AssetToBuy', 'AssetId'),
//     createParam('Amount', 'Balance'),
//     createParam('AssetToPay', 'AssetId'),
//   ],
//   type: 'Balance',
// };
//
// const sellPrice: RpcMethodOpt = {
//   description: 'Retrieves the CENNZX exchange sell price',
//   isOptional: true,
//   params: [
//     createParam('AssetToSell', 'AssetId'),
//     createParam('Amount', 'Balance'),
//     createParam('AssetToPayout', 'AssetId'),
//   ],
//   type: 'Balance',
// };
//
// // Returns the core asset price and investment asset's price for investment asset Id
// const liquidityPrice: RpcMethodOpt = {
//   description: 'Get the price of liquidity for the given asset ID',
//   isOptional: true,
//   params: [createParam('AssetId', 'AssetId'), createParam('liquidityToBuy', 'Balance')],
//   type: '(Balance, Balance)' as any,
// };
//
// // Returns liquidity volume, core amount, asset amount for given asset
// const liquidityValue: RpcMethodOpt = {
//   description: "Get the value of an account's liquidity for the given asset",
//   isOptional: true,
//   params: [createParam('AccountId', 'Address'), createParam('AssetId', 'AssetId')],
//   type: '(Balance, Balance, Balance)' as any,
// };
//
// const section = 'cennzx';
//
// export default [
//   { ...createMethod(section, 'buyPrice', buyPrice), name: 'buyPrice' },
//   { ...createMethod(section, 'sellPrice', sellPrice), name: 'sellPrice' },
//   { ...createMethod(section, 'liquidityPrice', liquidityPrice), name: 'liquidityPrice' },
//   { ...createMethod(section, 'liquidityValue', liquidityValue), name: 'liquidityValue' },
// ];
