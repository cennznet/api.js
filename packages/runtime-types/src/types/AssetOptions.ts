/*
 Custom `AssetOptions` type for generic asset module.
*/

import Balance from '@polkadot/types/Balance';
import Struct from '@polkadot/types/codec/Struct';

class AssetOptions extends Struct {
    constructor(value: any) {
        super({total_supply: Balance}, value);
    }
}

export default AssetOptions;
