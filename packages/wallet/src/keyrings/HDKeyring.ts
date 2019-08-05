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

import {HDKeyring as BaseHdKeyring} from '@plugnet/wallet';
import {IKeyring} from '@plugnet/wallet/types';

interface SerializedHDKeyring {
    mnemonic: string;
    numberOfAccounts?: number;
    hdPath?: string;
    keyringType?: string;
}

/**
 * a HD Keyring implementation of ${IKeyring}
 * will use hd path "m/44'/392'/0'/0" (for CENNZ) by default
 */
export class HDKeyring extends BaseHdKeyring implements IKeyring<SerializedHDKeyring> {
    static DEFAULT_HD_PATH = "m/44'/392'/0'/0";
}
