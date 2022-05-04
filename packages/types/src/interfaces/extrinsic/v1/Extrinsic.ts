import {cvmToAddress} from "@cennznet/types/utils";
import { GenericExtrinsic, UInt } from '@polkadot/types';
import { SignatureOptions } from '@cennznet/types/interfaces/extrinsic/types';
import {
  AnyU8a,
  Callback,
  ExtrinsicPayloadValue,
  IKeyringPair,
  ISubmittableResult,
  Registry
} from '@polkadot/types/types';
import { Address, Call } from '@polkadot/types/interfaces/runtime';
import { ExtrinsicValueV4 } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { Api } from '@cennznet/api';
import { EstimateFeeParams, PaymentOptions } from '@cennznet/api/derives/types';
import {Constructor, HexString} from '@polkadot/util/types';

export default class CENNZnetExtrinsic extends GenericExtrinsic{
  private signaturePayloadOptions: SignatureOptions | ExtrinsicPayloadValue;

  constructor(registry: Registry, value?: GenericExtrinsic | ExtrinsicValueV4 | AnyU8a | Call) {
    super(registry, value);
    this.signaturePayloadOptions = {
      blockHash: undefined,
      genesisHash: undefined,
      method: undefined,
      specVersion: undefined,
      nonce: undefined,
      runtimeVersion: undefined,
      transactionPayment: undefined,
      transactionVersion: undefined
    };
  }

  addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | HexString, payload: ExtrinsicPayloadValue | Uint8Array | string): GenericExtrinsic {
    const mergeDefinedObjects = (A, B) => {
      const res = {};
      Object.keys({...A,...B}).map(key => {
        res[key] = A[key] || B[key];
      });
      return res as ExtrinsicPayloadValue;
    };

    const mergedPayload = mergeDefinedObjects(payload, this.signaturePayloadOptions);
    return super.addSignature(signer, signature, mergedPayload);
  }

  /**
   * @description Sign the extrinsic with a specific keypair
   */
  sign(account: IKeyringPair, options: SignatureOptions): GenericExtrinsic {
    const mergeDefinedObjects = (A, B) => {
      const res = {};
      Object.keys({...A,...B}).map(key => {
          res[key] = A[key] || B[key];
      });
      return res as SignatureOptions;
    };
    const mergedSignatureOpts = mergeDefinedObjects(options, this.signaturePayloadOptions);
    return super.sign(account, mergedSignatureOpts);
  }

  /**
   * @description Adds payment options such as slippage and tip to the Extrinsic signature
   */
  setPaymentOpts(api: Api, { feeAssetId, slippage = 0, tip = 0 }: PaymentOptions): this{
    const _maxPaymentConstructor: Constructor<UInt> = UInt.with(128)
    const _maxPayment: string = new _maxPaymentConstructor(this.registry).toString()
    const getEstimatedFee = async () => {
      const estimatedFee = await api.derive.fees.estimateFee({ extrinsic : this , userFeeAssetId: feeAssetId, maxPayment: _maxPayment } as unknown as EstimateFeeParams)
      return estimatedFee;
    }
    getEstimatedFee()
      .then((estimatedfee) => {
      const maxPayment = parseFloat(estimatedfee.toString()) * (1 + slippage);
      const assetId = this.registry.createType('AssetId', feeAssetId);
      const feeExchange = this.registry.createType('FeeExchange', { assetId, maxPayment }, 0);
      const transactionPayment = this.registry.createType('ChargeTransactionPayment', {tip: tip, feeExchange});
      if ('transactionPayment' in this.signaturePayloadOptions) {
        this.signaturePayloadOptions.transactionPayment = transactionPayment;
      }
      return this;
      })
      .catch((err) => {
          console.error(err)
          return this;
      })
    return this;
  }

  /**
   * @description sign the extrinsic via any ethereum wallet
   */
  async signViaEthWallet(ethAddress: string, api: Api, ethereum: any, optionalStatusCb?: Callback<ISubmittableResult>): Promise<this> {
    const cennznetAddress = cvmToAddress(ethAddress);
    const nonce = await api.rpc.system.accountNextIndex(cennznetAddress);
    const payload = this.registry.createType('EthWalletCall', { call: this, nonce }).toHex();
    // Request signature from ethereum wallet
    const signature = await ethereum.request({ method: 'personal_sign', params: [payload, ethAddress] });
    // Broadcast the tx to CENNZnet
    await api.tx.ethWallet.call(this, ethAddress, signature).send(optionalStatusCb);
    return this;
  }
}
