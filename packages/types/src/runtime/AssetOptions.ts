/*
 Custom `AssetOptions` type for generic asset module.
*/

import Struct from '@polkadot/types/codec/Struct';
import Balance from '@polkadot/types/type/Balance';
import Hash from '@polkadot/types/type/Hash';

const JSON_MAP = new Map([['totalSupply', 'total_supply']]);

class AssetOptions extends Struct {
    constructor(value: any) {
        super({totalSupply: Balance}, value, JSON_MAP);
    }

    get totalSupply(): Hash {
        return this.get('totalSupply') as Hash;
    }
}

export default AssetOptions;
