import {DoughnutValue, FeeExchangeValue} from '@cennznet/types/extrinsic/Extrinsic';
import {DeriveCustom} from '@plugnet/api-derive';
import {SubmittableExtrinsic} from '@plugnet/api/SubmittableExtrinsic';
import {ApiOptions as ApiOptionsBase} from '@plugnet/api/types';
import {ProviderInterface} from '@plugnet/rpc-provider/types';
import {AccountId, Address} from '@plugnet/types';
import {Constructor, RegistryTypes} from '@plugnet/types/types';
import BN from 'bn.js';

export interface ApiOptions extends Pick<ApiOptionsBase, Exclude<keyof ApiOptionsBase, 'provider'>> {
    /**
     * provider implement ProviderInterface or string url for WsProvider.
     * If not specified, it will default to connecting to the
     * localhost with the default port, i.e. `ws://127.0.0.1:9944`
     */
    provider?: ProviderInterface | string;
    plugins?: IPlugin[];
}

export type AnyAddress = BN | Address | AccountId | Array<number> | Uint8Array | number | string;

export interface ICennznetExtrinsic<CodecResult, SubscriptionResult>
    extends SubmittableExtrinsic<CodecResult, SubscriptionResult> {
    addDoughnut(doughnut: DoughnutValue): this;
    addFeeExchangeOpt(feeExchangeOpt: FeeExchangeValue): this;
}

export interface IPlugin {
    injectName: string;
    sdkClass: Constructor<any>;
    sdkRxClass: Constructor<any>;
    types?: RegistryTypes;
    derives?: DeriveCustom;
}
