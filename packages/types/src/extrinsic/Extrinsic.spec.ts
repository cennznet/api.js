import staticMetadata from '@cennznet/api/staticMetadata';
import fromMetadata from '@plugnet/extrinsics/fromMetadata';
import getDefaultRegistry from '@plugnet/types/codec/typeRegistry';
import {Metadata, Method} from '../polkadot';
import Extrinsic from './Extrinsic';
import * as types from '../index';

const typeRegistry = getDefaultRegistry();
typeRegistry.register(types);

describe('CennznetExtrinsic', () => {
    const metadata = new Metadata(staticMetadata[Object.keys(staticMetadata)[1]]);
    Method.injectMethods(fromMetadata(metadata.asV0));
    typeRegistry;

    it('decode extrinsic with feeExchange', () => {
        const hexValue =
            '0x5902a1ff8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a4850341ff1633e656a7b7d89566b1eb3f8c3c636c00b04d3b50bce028d39d3d813764afea67c638b631117315f2c26109f5c9646ae8d8f431f65b5b512505575016000010101fa8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48419cc20901000f0000c52ebca2b1';
        const extrinsic = new Extrinsic(hexValue);
        expect(extrinsic.feeExchange).toBeDefined();
        expect(extrinsic.feeExchange.assetId.toNumber()).toEqual(17008);
        expect(extrinsic.feeExchange.maxPayment.toString()).toEqual('50000000000000000');
        expect(extrinsic.toHex()).toBe(hexValue);
    });
});
