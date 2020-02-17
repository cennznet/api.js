// import {Api, ApiRx} from '@cennznet/api';
// import {SubmittableExtrinsicFunction} from '@cennznet/api/types';
// import {CodecArg} from '@cennznet/types/types';
//
// export function decorateExtrinsics(api: Api | ApiRx) {
//     for (const sectionName of Object.keys(api.tx)) {
//         for (const methodName of Object.keys(api.tx[sectionName])) {
//             api.tx[sectionName][methodName] = decorateExtrinsic(api, api.tx[sectionName][methodName]);
//         }
//     }
// }
//
// function decorateExtrinsic(
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
//     return (api as any).decorateFunctionMeta(method, newMethod);
// }
