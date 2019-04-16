import {Struct} from '@plugnet/types';
import Owner from './Owner';

/**
 * alias for PermissionLatest and PermissionOptions
 */
export default class PermissionsV1 extends Struct {
    constructor(value: any) {
        super({update: Owner, mint: Owner, burn: Owner}, value);
    }

    get update(): Owner {
        return this.get('update') as Owner;
    }

    get mint(): Owner {
        return this.get('mint') as Owner;
    }

    get burn(): Owner {
        return this.get('burn') as Owner;
    }
}
