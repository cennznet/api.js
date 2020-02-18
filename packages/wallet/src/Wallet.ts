// Copyright 2019 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {SignerPayloadJSON} from '@cennznet/types/extrinsic/SignerPayload';
import {Signer, SignerResult} from '@polkadot/api/types';
import {createType, TypeRegistry} from '@polkadot/types';
import {Registry} from '@polkadot/types/types';
import {u8aToHex} from '@polkadot/util';
import {Wallet as Base} from '../../plugnet_wallet/src';
import {requireUnlocked, waitForCryptoReady} from '../../plugnet_wallet/src/decorators';
import {IWallet, SignerPayloadRaw, WalletOption} from '../../plugnet_wallet/src/types';
import {HDKeyring} from './keyrings/HDKeyring';

/**
 * a Wallet implementation which can be used as signer in cennznet-api
 * support multi-keyring and shipped with a HD Keyring as default keyring type.
 */
export class Wallet extends Base implements Signer, IWallet {
  private registry: Registry;
  constructor(registry: Registry, option: WalletOption = {}) {
    const opt = {...option};
    opt.keyringTypes = option.keyringTypes || [HDKeyring];
    super(option);
    this.registry = registry;
  }

  /**
   * sign a extrinsic payload (for the new Signer interface)
   * @param extrinsic
   * @param opt
   * @requires wallet unlocked
   * @throws when the account is not managed by the wallet.
   */
  @requireUnlocked
  @waitForCryptoReady
  async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
    const {address, version} = payload;
    // const registry = new TypeRegistry();
    const hexPayload = u8aToHex(
      createType(this.registry, 'ExtrinsicPayload', payload, {version}).toU8a({method: true})
    );
    return this.signRaw({type: 'payload', data: hexPayload, address});
  }
}
