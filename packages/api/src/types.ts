import {DoughnutValue, FeeExchangeValue} from '@cennznet/types/extrinsic/Extrinsic';
import {SubmittableExtrinsic} from '@polkadot/api/SubmittableExtrinsic';
import {ApiOptions as ApiOptionsBase} from '@polkadot/api/types';
import {ProviderInterface} from '@polkadot/rpc-provider/types';
import {AccountId, Address} from '@polkadot/types';
import BN from 'bn.js';

export interface ApiOptions extends Pick<ApiOptionsBase, Exclude<keyof ApiOptionsBase, 'provider'>> {
    /**
     * provider implement ProviderInterface or string url for WsProvider.
     * If not specified, it will default to connecting to the
     * localhost with the default port, i.e. `ws://127.0.0.1:9944`
     */
    provider?: ProviderInterface | string;
}

export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;

export interface ICennznetExtrinsic<CodecResult, SubscriptionResult>
    extends SubmittableExtrinsic<CodecResult, SubscriptionResult> {
    addDoughnut(doughnut: DoughnutValue): this;
    addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): this;
}
