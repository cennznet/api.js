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

/*
    Custom `Topic` type for Attestation module.
 */
import {ClassOf, TypeRegistry} from '@polkadot/types';
import {Registry} from '@polkadot/types/types';
import {isHex, isString, stringToU8a, u8aToString} from '@polkadot/util';

function isAscii(str: string) {
  return /^[\x20-\x7E]*$/.test(str);
}

const MAX_ALLOWED_LENGTH = 32;

function validateTopic(topic: string) {
  if (topic.length > MAX_ALLOWED_LENGTH) {
    throw new Error('Topic cannot exceed 32 characters');
  }
  if (!isAscii(topic)) {
    throw new Error('Topic must be an ASCII string with no characters that cannot be seen on a standard US keyboard');
  }
}

function stripTrailingZero(value: Uint8Array) {
  let endPos = value.length - 1;
  for (let i = endPos; i > -1; i--) {
    if (value[i] !== 0) {
      endPos = i;
      break;
    }
  }
  return value.slice(0, endPos + 1);
}
const registry = new TypeRegistry();

export default class AttestationTopic extends ClassOf(registry, 'H256') {
  constructor(registry_: Registry, value: string | Uint8Array) {
    if (isString(value) && !isHex(value)) {
      validateTopic(value);
      super(registry_, stringToU8a(value));
    } else {
      super(registry_, value);
    }
  }

  toString(base?: number): string {
    const u8a = this.toU8a();
    return u8aToString(stripTrailingZero(u8a));
  }
}
