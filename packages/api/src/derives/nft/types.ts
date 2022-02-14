// Copyright 2019-2021 Centrality Investments Limited
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

import { ListingId, StorageKey, u32 } from '@cennznet/types';
import { EnhancedTokenId } from '@cennznet/types/interfaces/nft/enhanced-token-id';
import { Codec, ITuple } from '@polkadot/types/types';

export interface DeriveTokenInfo {
  tokenId: EnhancedTokenId;
  /* Token owner address. It is undefined if the token is burnt */
  owner: string | undefined;
  listingId?: ListingId;
}

export interface CollectionInfo {
  id: number;
  name: string;
}
export type DeriveCollectionInfo = [StorageKey<[ITuple<[u32, u32]>, u32]>, Codec][];
