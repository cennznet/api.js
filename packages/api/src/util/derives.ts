import {DeriveCustom} from '@plugnet/api-derive';

export function mergeDeriveOptions(deriveOrigin: DeriveCustom, deriveAppend: DeriveCustom = {}): DeriveCustom {
    const ret = {...deriveOrigin};
    for (const [module, derives] of Object.entries(deriveAppend)) {
        ret[module] = Object.assign({}, ret[module], derives);
    }
    return ret;
}
