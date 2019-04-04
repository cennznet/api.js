import {AccountId, Option, Signature, Struct, Text, Tuple, U32, U64, Vector} from '@polkadot/types';

export class Certificate extends Struct {
    constructor(value?: any) {
        super(
            {
                expires: U64,
                version: U32,
                holder: AccountId,
                notBefore: U64,
                permissions: Vector.with(Tuple.with([Text, Text])),
                issuer: AccountId,
            },
            value
        );
    }
}

export class Doughnut extends Struct {
    constructor(value?: any) {
        super(
            {
                certificate: Certificate,
                signature: Signature,
            },
            value
        );
    }
}

export class OptionalDoughnut extends Option.with(Doughnut) {}
