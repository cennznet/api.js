import {Compact, getTypeRegistry, Option, Struct} from '@plugnet/types';

export default class FeeExchange extends Struct {
    constructor(value?: any) {
        const typeRegistry = getTypeRegistry();
        const AssetId = typeRegistry.getOrThrow('AssetId') as any;
        const Balance = typeRegistry.getOrThrow('Balance') as any;
        super({assetId: Compact.with(AssetId), maxPayment: Compact.with(Balance)}, value);
    }
}

export class OptionalFeeExchange extends Option.with(FeeExchange) {}
