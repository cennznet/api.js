/*
 Custom `AssetOptions` type for generic asset module.
*/

import Balance from '@polkadot/types/Balance';
import Struct from '@polkadot/types/codec/Struct';
import Hash from '@polkadot/types/Hash';

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
