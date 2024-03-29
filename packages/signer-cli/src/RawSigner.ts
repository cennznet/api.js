// Copyright 2018-2021 @polkadot/signer-cli authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as readline from 'readline';
import type { Signer, SignerResult } from '@polkadot/api/types';
import type { SignerPayloadRaw } from '@polkadot/types/types';


import { assert, isHex } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';
import { HexString } from '@polkadot/util/types';

export default class RawSigner implements Signer {
  async signRaw ({ data }: SignerPayloadRaw): Promise<SignerResult> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve): void => {
      const hashed = (data.length > (256 + 1) * 2)
        ? blake2AsHex(data)
        : data;

      rl.question(`Payload: ${hashed}\nSignature> `, (signature: HexString) => {
        assert(isHex(signature), 'Supplied signature is not hex');

        // @ts-ignore
        resolve({ id: 1, signature: signature.trim() });
        rl.close();
      });
    });
  }
}
