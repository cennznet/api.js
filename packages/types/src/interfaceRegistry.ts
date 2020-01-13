import Option from '@polkadot/types/codec/Option';
import '@polkadot/types/interfaceRegistry';
import './Option';

import Doughnut from './Doughnut';
import {ChargeTransactionPayment, FeeExchange, FeeExchangeV1} from './extrinsic/types';

// Merge the [[InterfaceRegistry]] definition from `@polkadot/types/interfaceRegistry` with cennznet types
declare module '@polkadot/types/interfaceRegistry' {
  interface InterfaceRegistry {
    // Add types that only cennznet knows about.
    // TS will merge them into the polkadot provided [[InterfaceRegistry]]
    Doughnut: Doughnut;
    'Option<Doughnut>': Option<Doughnut>;
    FeeExchangeV1: FeeExchangeV1;
    FeeExchange: FeeExchange;
    ChargeTransactionPayment: ChargeTransactionPayment;
    'Option<FeeExchange>': Option<FeeExchange>;
  }
}
