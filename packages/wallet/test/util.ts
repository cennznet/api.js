import {stringToU8a} from '@polkadot/util';

function padSeed(seed: string): Uint8Array {
    return stringToU8a(seed.padEnd(32));
}

export const SEEDS: {[index: string]: Uint8Array} = {
    alice: padSeed('Alice'),
    bob: padSeed('Bob'),
};
