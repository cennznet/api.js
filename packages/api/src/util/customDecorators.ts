import {Api, ApiRx} from '@cennznet/api';
import createSubmittable from '@cennznet/api/submittable/createSubmittable';
import {SubmittableExtrinsic} from '@cennznet/api/submittable/types';
import {SubmittableExtrinsicFunction} from '@cennznet/api/types';
import {CodecArg} from '@cennznet/types/types';
import {CodecArg as Arg} from '@plugnet/types/types';

export function decorateExtrinsics(api: Api | ApiRx) {
    for (const sectionName of Object.keys(api.tx)) {
        for (const methodName of Object.keys(api.tx[sectionName])) {
            api.tx[sectionName][methodName] = decorateExtrinsic(api, api.tx[sectionName][methodName]);
        }
    }
}

function decorateExtrinsic(
    api: Api | ApiRx,
    method: SubmittableExtrinsicFunction<any>
): SubmittableExtrinsicFunction<any> {
    const newMethod = (...params: Array<CodecArg>) => {
        const extrinsic = method(...params);
        Object.defineProperty(extrinsic, 'fee', {
            value: sender => api.derive.fees.estimateFee(extrinsic, sender),
        });
        return extrinsic;
    };
    return (api as any).decorateFunctionMeta(method, newMethod);
}

export function decorateExtrinsicsSubmittables(api: Api | ApiRx) {
    for (const sectionName of Object.keys(api.tx)) {
        for (const methodName of Object.keys(api.tx[sectionName])) {
            // console.log('Method:', api.tx[sectionName][methodName]);
            const creator = createSubmittable(
                api.type,
                (api as any)._rx,
                (api as any).decorateMethod(api.tx[sectionName][methodName])
            );
            api.tx[sectionName][methodName] = decorateExtrinsicsSubmittable(
                api,
                api.tx[sectionName][methodName],
                creator
            );
        }
    }
}

function decorateExtrinsicsSubmittable(
    api: Api | ApiRx,
    method: SubmittableExtrinsicFunction<any>,
    creator: any
): SubmittableExtrinsicFunction<any> {
    const decorated = (...params: Arg[]): SubmittableExtrinsic<any> => creator(method(...params));
    return (api as any).decorateFunctionMeta(method, decorated);
}

// function decorateExtrinsic1(
//     api: Api | ApiRx,
//     method: SubmittableExtrinsicFunction<any>
// ): SubmittableExtrinsicFunction<any> {
//     const newMethod = (...params: Array<CodecArg>) => {
//         const extrinsic = method(...params);
//         Object.defineProperty(extrinsic, 'fee', {
//             value: sender => api.derive.fees.estimateFee(extrinsic, sender),
//         });
//         return extrinsic;
//     };
//     // console.log('New  mtd', newMethod);
//     // console.log('API', api);
//      const a = (api as any).decorateFunctionMeta(method, newMethod);
//     // console.log('*********');
//     // console.log('type',api.type);
//     //console.log('rx',api._rx);
//     // console.log('decorator td',method);
//     const creator = createSubmittable(api.type,  api as ApiRx , method);
//     const extrinsic = extrinsicsFromMeta(api.runtimeMetadata);
//    // new Submittable(extrinsic, { api, decorateMethod, type });
//     const b = Object.entries(extrinsic).reduce((out, [name, section]): SubmittableExtrinsics<any> => {
//         out[name] = Object.entries(section).reduce((out, [name, method]): SubmittableModuleExtrinsics<any> => {
//             // out[name] = (api as any).decorateExtrinsicEntry(method, creator);
//             const decorated = (...params: any[]): SubmittableExtrinsic<any> =>
//                 creator(method(...params));
//
//             out[name] = (api as any).decorateFunctionMeta(method, decorated as any) as SubmittableExtrinsicFunction<any>;
//
//             return out;
//         }, {} as unknown as SubmittableModuleExtrinsics<any>);
//
//         return out;
//     }, creator as unknown as SubmittableExtrinsics<any>);
//     return b as unknown as SubmittableExtrinsicFunction<any>;
// }
