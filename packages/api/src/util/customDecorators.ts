import {Api, ApiRx} from '@cennznet/api';
import createSubmittable from '@cennznet/api/submittable/createSubmittable';
import Submittable from '@cennznet/api/submittable/Submittable';
import {SubmittableExtrinsic} from '@cennznet/api/submittable/types';
import {SubmittableExtrinsicFunction, SubmittableExtrinsics, SubmittableModuleExtrinsics} from '@cennznet/api/types';
import Types from '@cennznet/types/injects';
import {CodecArg} from '@cennznet/types/types';
import extrinsics from '@plugnet/api-metadata/extrinsics';
import extrinsicsFromMeta from '@plugnet/api-metadata/extrinsics/fromMetadata';
import Decorate from '@plugnet/api/base/Decorate';
import {ApiInterfaceRx} from '@plugnet/api/types';
// import {ApiInterfaceRx} from '@plugnet/api/types';
// import {ModulesWithCalls} from '@plugnet/types/types';
import {CodecArg as Arg} from '@plugnet/types/types';

export function decorateExtrinsics(api: Api | ApiRx) {
    //let out;
    const creator = createSubmittable(this._type, this._rx as ApiInterfaceRx, decorateMethod);
    for (const sectionName of Object.keys(api.tx)) {
        for (const methodName of Object.keys(api.tx[sectionName])) {
            const mtd = api.tx[sectionName][methodName];
            api.tx[sectionName][methodName] = decorateExtrinsic(api, api.tx[sectionName][methodName], creator);
        }
    }
}

function decorateExtrinsic(
    api: Api | ApiRx,
    method: SubmittableExtrinsicFunction<any>,
    creator: any
): SubmittableExtrinsicFunction<any> {
    const newMethod = (...params: Array<CodecArg>) => {
        const extrinsic = method(...params);
        Object.defineProperty(extrinsic, 'fee', {
            value: sender => api.derive.fees.estimateFee(extrinsic, sender),
        });
        return extrinsic;
    };
    const decorated = (...params: Arg[]): SubmittableExtrinsic<any> => creator(method(...params));
    (api as any).decorateFunctionMeta(method, newMethod);
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
