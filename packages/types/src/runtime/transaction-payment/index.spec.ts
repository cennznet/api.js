// import Option from '@polkadot/types/codec/Option';
// import {TypeRegistry} from '@polkadot/types';
// import {FeeExchange} from './extrinsic/types';
// import './Option';
// import './extrinsic/types';

// const registry = new TypeRegistry();

// describe('Option', () => {
//   describe('toUa8', () => {
//     test('should isNone checking work', () => {
//       expect(new Option('Option<FeeExchange>', null).toU8a()).toEqual(new Uint8Array([0]));
//     });
//   });
// });

import '@polkadot/types/interfaceRegistry';
// import BN from 'bn.js';
// const {createType} = require('@polkadot/types');
import {ChargeTransactionPayment} from './index';
import '../../interfaceRegistry';
// import '../../extrinsic/types';
// import {ChargeTransactionPayment} from '../../types';

describe('Option', () => {
  describe('toUa8', () => {
    test('should isNone checking work', () => {
      const result = new ChargeTransactionPayment({tip: 0, feeExchange: null}).toU8a(true);
      // const result = createType('ChargeTransactionPayment', {tip: 0, feeExchange: null}).toU8a(true);
      expect(result).toEqual(new Uint8Array([0, 0]));
    });
  });
});
