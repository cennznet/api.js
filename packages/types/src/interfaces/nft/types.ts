// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, Text, U8aFixed, Vec, i32, u128, u16, u32, u64, u8 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { AccountId, AssetId, Balance, BlockNumber, Permill } from '@polkadot/types/interfaces/runtime';

/** @name AuctionClosureReason */
export interface AuctionClosureReason extends Enum {
  readonly isExpiredNoBids: boolean;
  readonly isSettlementFailed: boolean;
  readonly isVendorCancelled: boolean;
}

/** @name AuctionListing */
export interface AuctionListing extends Struct {
  readonly paymentAsset: AssetId;
  readonly reservePrice: Balance;
  readonly close: BlockNumber;
  readonly tokens: Vec<TokenId>;
  readonly quantity: TokenCount;
  readonly seller: AccountId;
}

/** @name CollectionId */
export interface CollectionId extends u32 {}

/** @name CollectionNameType */
export interface CollectionNameType extends Bytes {}

/** @name FixedPriceListing */
export interface FixedPriceListing extends Struct {
  readonly paymentAsset: AssetId;
  readonly fixedPrice: Balance;
  readonly close: BlockNumber;
  readonly buyer: Option<AccountId>;
  readonly tokens: Vec<TokenId>;
  readonly quantity: TokenCount;
  readonly seller: AccountId;
}

/** @name Listing */
export interface Listing extends Enum {
  readonly isFixedPrice: boolean;
  readonly asFixedPrice: FixedPriceListing;
  readonly isAuction: boolean;
  readonly asAuction: AuctionListing;
}

/** @name ListingId */
export interface ListingId extends u128 {}

/** @name MetadataBaseURI */
export interface MetadataBaseURI extends Enum {
  readonly isIpfs: boolean;
  readonly isHttps: boolean;
  readonly asHttps: Bytes;
}

/** @name NFTAttributeName */
export interface NFTAttributeName extends Text {}

/** @name NFTAttributeTypeId */
export interface NFTAttributeTypeId extends Enum {
  readonly isI32: boolean;
  readonly isU8: boolean;
  readonly isU16: boolean;
  readonly isU32: boolean;
  readonly isU64: boolean;
  readonly isU128: boolean;
  readonly isBytes32: boolean;
  readonly isBytes: boolean;
  readonly isText: boolean;
  readonly isHash: boolean;
  readonly isTimestamp: boolean;
  readonly isUrl: boolean;
}

/** @name NFTAttributeValue */
export interface NFTAttributeValue extends Enum {
  readonly isI32: boolean;
  readonly asI32: i32;
  readonly isU8: boolean;
  readonly asU8: u8;
  readonly isU16: boolean;
  readonly asU16: u16;
  readonly isU32: boolean;
  readonly asU32: u32;
  readonly isU64: boolean;
  readonly asU64: u64;
  readonly isU128: boolean;
  readonly asU128: u128;
  readonly isBytes32: boolean;
  readonly asBytes32: U8aFixed;
  readonly isBytes: boolean;
  readonly asBytes: Bytes;
  readonly isText: boolean;
  readonly asText: Text;
  readonly isHash: boolean;
  readonly asHash: U8aFixed;
  readonly isTimestamp: boolean;
  readonly asTimestamp: u64;
  readonly isUrl: boolean;
  readonly asUrl: Text;
}

/** @name Reason */
export interface Reason extends AuctionClosureReason {}

/** @name RoyaltiesSchedule */
export interface RoyaltiesSchedule extends Struct {
  readonly entitlements: Vec<ITuple<[AccountId, Permill]>>;
}

/** @name SerialNumber */
export interface SerialNumber extends u32 {}

/** @name SeriesId */
export interface SeriesId extends u32 {}

/** @name TokenCount */
export interface TokenCount extends u32 {}

/** @name TokenId */
export interface TokenId extends ITuple<[CollectionId, SeriesId, SerialNumber]> {}

export type PHANTOM_NFT = 'nft';
