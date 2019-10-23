import {CodecArg} from '@cennznet/types/types';
import {Call} from '@plugnet/types/interfaces';
import {Api, ApiRx} from '..';
import createSubmittable from '../submittable/createSubmittable';
import {SubmittableExtrinsic} from '../submittable/types';
import {SubmittableExtrinsicFunction} from '../types';

export function decorateExtrinsics(api: Api | ApiRx) {
    const creator = createSubmittable(api.type, (api as any)._rx, (api as any).decorateMethod);
    for (const sectionName of Object.keys(api.tx)) {
        for (const methodName of Object.keys(api.tx[sectionName])) {
            api.tx[sectionName][methodName] = decorateExtrinsic(api, api.tx[sectionName][methodName], creator);
        }
    }
}

function decorateExtrinsic(
    api: Api | ApiRx,
    method: SubmittableExtrinsicFunction<any>,
    creator: (value: Call | Uint8Array | string) => SubmittableExtrinsic<any>
): SubmittableExtrinsicFunction<any> {
    const newMethod = (...params: Array<CodecArg>) => {
        const extrinsic = creator(method(...params));
        Object.defineProperty(extrinsic, 'fee', {
            value: sender => api.derive.fees.estimateFee(extrinsic, sender),
        });
        return extrinsic;
    };
    return (api as any).decorateFunctionMeta(method, newMethod);
}
