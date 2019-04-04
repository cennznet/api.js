import {AssetId} from '@cennznet/types';
import {Compact, getTypeRegistry, Option, Struct} from '@polkadot/types';

export default class FeeExchange extends Struct {
    constructor(value?: any) {
        const typeRegistry = getTypeRegistry();
        const AssetId = typeRegistry.getOrThrow('AssetId') as any;
        const Balance = typeRegistry.getOrThrow('Balance') as any;
        super({assetId: Compact.with(AssetId), maxPayment: Compact.with(Balance)}, value);
    }
}

export class OptionalFeeExchange extends Option.with(FeeExchange) {}
