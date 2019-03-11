/*
 Custom `AssetOptions` type for generic asset module.
*/

import {Balance, Compact, Struct} from '@polkadot/types';
import {PermissionOptions} from './index';

export default class AssetOptions extends Struct {
    constructor(value: any) {
        super({initialIssuance: Compact.with(Balance), permissions: PermissionOptions}, value);
    }

    get initialIssuance(): Balance {
        return this.get('initialIssuance') as Balance;
    }

    get permissions(): PermissionOptions {
        return this.get('permissions') as PermissionOptions;
    }
}
