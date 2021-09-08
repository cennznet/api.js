---
 Nft
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[RPC](#RPC)**

- **[Derive queries](#derive-queries)**

 
# Storage
 
### collectionMetadataURI(`CollectionId`): `Option<MetadataBaseURI>`
- **interface**: `api.query.nft.collectionMetadataURI`
- **summary**:   Map from collection to a base metadata URI for its token's offchain attributes 
 
### collectionName(`CollectionId`): `CollectionNameType`
- **interface**: `api.query.nft.collectionName`
- **summary**:   Map from collection to its human friendly name 
 
### collectionOwner(`CollectionId`): `Option<AccountId>`
- **interface**: `api.query.nft.collectionOwner`
- **summary**:   Map from collection to owner address 
 
### collectionRoyalties(`CollectionId`): `Option<RoyaltiesSchedule>`
- **interface**: `api.query.nft.collectionRoyalties`
- **summary**:   Map from collection to its defacto royalty scheme 
 
### isSingleIssue(`CollectionId, SeriesId`): `bool`
- **interface**: `api.query.nft.isSingleIssue`
- **summary**:   Demarcates a series limited to exactly one token 
 
### listingEndSchedule(`BlockNumber, ListingId`): `bool`
- **interface**: `api.query.nft.listingEndSchedule`
- **summary**:   Block numbers where listings will close. Value is `true` if at block number `listing_id` is scheduled to close. 
 
### listings(`ListingId`): `Option<Listing>`
- **interface**: `api.query.nft.listings`
- **summary**:   NFT sale/auction listings keyed by collection id and token id 
 
### listingWinningBid(`ListingId`): `Option<(AccountId,Balance)>`
- **interface**: `api.query.nft.listingWinningBid`
- **summary**:   Winning bids on open listings. keyed by collection id and token id 
 
### nextCollectionId(): `CollectionId`
- **interface**: `api.query.nft.nextCollectionId`
- **summary**:   The next available collection Id 
 
### nextListingId(): `ListingId`
- **interface**: `api.query.nft.nextListingId`
- **summary**:   The next available listing Id 
 
### nextSerialNumber(`CollectionId, SeriesId`): `SerialNumber`
- **interface**: `api.query.nft.nextSerialNumber`
- **summary**:   The next available serial number in a given (collection, series) 
 
### nextSeriesId(`CollectionId`): `SeriesId`
- **interface**: `api.query.nft.nextSeriesId`
- **summary**:   The next group Id within an NFT collection It is used as material to generate the global `TokenId` 
 
### openCollectionListings(`CollectionId, ListingId`): `bool`
- **interface**: `api.query.nft.openCollectionListings`
- **summary**:   Map from collection to any open listings 
 
### seriesAttributes(`CollectionId, SeriesId`): `Vec<NFTAttributeValue>`
- **interface**: `api.query.nft.seriesAttributes`
- **summary**:   Map from (collection, series) to its attributes 
 
### seriesIssuance(`CollectionId, SeriesId`): `TokenCount`
- **interface**: `api.query.nft.seriesIssuance`
- **summary**:   Map from a (collection, series) to its total issuance 
 
### seriesMetadataURI(`CollectionId, SeriesId`): `Option<Bytes>`
- **interface**: `api.query.nft.seriesMetadataURI`
- **summary**:   Map from a token series to its metadata URI path. This should be joined wih the collection base path 
 
### seriesRoyalties(`CollectionId, SeriesId`): `Option<RoyaltiesSchedule>`
- **interface**: `api.query.nft.seriesRoyalties`
- **summary**:   Map from (collection, series) to configured royalties schedule 
 
### tokenLocks(`TokenId`): `bool`
- **interface**: `api.query.nft.tokenLocks`
- **summary**:   Map from token to its locked status 
 
### tokenOwner(`(CollectionId,SeriesId), SerialNumber`): `AccountId`
- **interface**: `api.query.nft.tokenOwner`
- **summary**:   Map from a token to its owner The token Id is split in this map to allow better indexing (collection, series) + (serial number) 
 
# Extrinsic
 
### auction(token_id: `TokenId`, payment_asset: `AssetId`, reserve_price: `Balance`, duration: `Option<BlockNumber>`)
- **interface**: `api.tx.nft.auction`
- **summary**:   Auction a token on the open market to the highest bidder 

  Caller must be the token owner 

  - `payment_asset` fungible asset Id to receive payment with

  - `reserve_price` winning bid must be over this threshold

  - `duration` length of the auction (in blocks), uses default duration if unspecified
 
### auctionBundle(tokens: `Vec<TokenId>`, payment_asset: `AssetId`, reserve_price: `Balance`, duration: `Option<BlockNumber>`)
- **interface**: `api.tx.nft.auctionBundle`
- **summary**:   Auction a bundle of tokens on the open market to the highest bidder 

  - Tokens must be from the same collection

  - Tokens with individual royalties schedules cannot be sold in bundles

  Caller must be the token owner 

  - `payment_asset` fungible asset Id to receive payment with

  - `reserve_price` winning bid must be over this threshold

  - `duration` length of the auction (in blocks), uses default duration if unspecified
 
### bid(listing_id: `ListingId`, amount: `Balance`)
- **interface**: `api.tx.nft.bid`
- **summary**:   Place a bid on an open auction 

  - `amount` to bid (in the seller's requested payment asset)
 
### burn(token_id: `TokenId`)
- **interface**: `api.tx.nft.burn`
- **summary**:   Burn a token 🔥 

  Caller must be the token owner 
 
### burnBatch(collection_id: `CollectionId`, series_id: `SeriesId`, serial_numbers: `Vec<SerialNumber>`)
- **interface**: `api.tx.nft.burnBatch`
- **summary**:   Burn some tokens 🔥 Tokens must be from the same collection and series 

  Caller must be the token owner Fails on duplicate serials 
 
### buy(listing_id: `ListingId`)
- **interface**: `api.tx.nft.buy`
- **summary**:   Buy a token listing for its specified price 
 
### cancelSale(listing_id: `ListingId`)
- **interface**: `api.tx.nft.cancelSale`
- **summary**:   Close a sale or auction returning tokens Requires no successful bids have been made for an auction. Caller must be the listed seller 
 
### createCollection(name: `CollectionNameType`, metadata_base_uri: `Option<MetadataBaseURI>`, royalties_schedule: `Option<RoyaltiesSchedule>`)
- **interface**: `api.tx.nft.createCollection`
- **summary**:   Create a new token collection 

  The caller will become the collection owner `collection_id`- 32 byte utf-8 string `metadata_base_uri` - Base URI for off-chain metadata for tokens in this collection `royalties_schedule` - defacto royalties plan for secondary sales, this will apply to all tokens in the collection by default. 
 
### mintAdditional(collection_id: `CollectionId`, series_id: `SeriesId`, quantity: `TokenCount`, owner: `Option<AccountId>`)
- **interface**: `api.tx.nft.mintAdditional`
- **summary**:   Mint additional tokens to an existing series It will fail if the series is not semi-fungible 

  `quantity` - how many tokens to mint `owner` - the token owner, defaults to the caller Caller must be the collection owner 

  -----------Weight is O(N) where N is `quantity` 
 
### mintSeries(collection_id: `CollectionId`, quantity: `TokenCount`, owner: `Option<AccountId>`, attributes: `Vec<NFTAttributeValue>`, metadata_path: `Option<Bytes>`, royalties_schedule: `Option<RoyaltiesSchedule>`)
- **interface**: `api.tx.nft.mintSeries`
- **summary**:   Mint a series of tokens distinguishable only by a serial number (SFT) Series can be issued additional tokens with `mint_additional` 

  `quantity` - how many tokens to mint `owner` - the token owner, defaults to the caller `attributes` - all tokens in series will have these values `metadata_path` - URI path to token offchain metadata relative to the collection base URI Caller must be the collection owner 

  -----------Performs O(N) writes where N is `quantity` 
 
### mintUnique(collection_id: `CollectionId`, owner: `Option<AccountId>`, attributes: `Vec<NFTAttributeValue>`, metadata_path: `Option<Bytes>`, royalties_schedule: `Option<RoyaltiesSchedule>`)
- **interface**: `api.tx.nft.mintUnique`
- **summary**:   Mint a single token (NFT) 

  `owner` - the token owner, defaults to the caller `attributes` - initial values according to the NFT collection/schema `metadata_path` - URI path to the offchain metadata relative to the collection base URI Caller must be the collection owner 
 
### sell(token_id: `TokenId`, buyer: `Option<AccountId>`, payment_asset: `AssetId`, fixed_price: `Balance`, duration: `Option<BlockNumber>`)
- **interface**: `api.tx.nft.sell`
- **summary**:   Sell a single token at a fixed price 

  `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase `asset_id` fungible asset Id to receive as payment for the NFT `fixed_price` ask price `duration` listing duration time in blocks from now Caller must be the token owner 
 
### sellBundle(tokens: `Vec<TokenId>`, buyer: `Option<AccountId>`, payment_asset: `AssetId`, fixed_price: `Balance`, duration: `Option<BlockNumber>`)
- **interface**: `api.tx.nft.sellBundle`
- **summary**:   Sell a bundle of tokens at a fixed price 

  - Tokens must be from the same collection

  - Tokens with individual royalties schedules cannot be sold with this method

  `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase `asset_id` fungible asset Id to receive as payment for the NFT `fixed_price` ask price `duration` listing duration time in blocks from now Caller must be the token owner 
 
### setOwner(collection_id: `CollectionId`, new_owner: `AccountId`)
- **interface**: `api.tx.nft.setOwner`
- **summary**:   Set the owner of a collection Caller must be the current collection owner 
 
### transfer(token_id: `TokenId`, new_owner: `AccountId`)
- **interface**: `api.tx.nft.transfer`
- **summary**:   Transfer ownership of an NFT Caller must be the token owner 
 
### transferBatch(tokens: `Vec<TokenId>`, new_owner: `AccountId`)
- **interface**: `api.tx.nft.transferBatch`
- **summary**:   Transfer ownership of a batch of NFTs (atomic) Tokens must be from the same collection Caller must be the token owner 
 
# Error
 
### AddToUniqueIssue
- **summary**:   Cannot mint additional tokens in a unique issue series 
 
### BidTooLow
- **summary**:   Auction bid was lower than reserve or current highest bid 
 
### CollectionIdExists
- **summary**:   A collection with the same ID already exists 
 
### CollectionNameInvalid
- **summary**:   Given collection name is invalid (invalid utf-8, too long, empty) 
 
### InternalPayment
- **summary**:   Internal error during payment 
 
### MaxAttributeLength
- **summary**:   Given attirbute value is larger than the configured max. 
 
### MixedBundleSale
- **summary**:   Selling tokens from different collections is not allowed 
 
### NoAvailableIds
- **summary**:   No more Ids are available, they've been exhausted 
 
### NoCollection
- **summary**:   The NFT collection does not exist 
 
### NoPermission
- **summary**:   origin does not have permission for the operation (the token may not exist) 
 
### NotForAuction
- **summary**:   The token is not listed for auction sale 
 
### NotForFixedPriceSale
- **summary**:   The token is not listed for fixed price sale 
 
### NoToken
- **summary**:   The token does not exist 
 
### RoyaltiesInvalid
- **summary**:   Total royalties would exceed 100% of sale or an empty vec is supplied 
 
### RoyaltiesProtection
- **summary**:   Tokens with different individual royalties cannot be sold together 
 
### SchemaMaxAttributes
- **summary**:   Too many attributes in the provided schema or data 
 
### TokenListingProtection
- **summary**:   Cannot operate on a listed NFT 
 
# Events
 
### AuctionClosed(`CollectionId`, `ListingId`, `Reason`)
- **summary**:   An auction has closed without selling (collection, listing, reason) 
 
### AuctionOpen(`CollectionId`, `ListingId`)
- **summary**:   An auction has opened (collection, listing) 
 
### AuctionSold(`CollectionId`, `ListingId`, `AssetId`, `Balance`, `AccountId`)
- **summary**:   An auction has sold (collection, listing, payment asset, bid, new owner) 
 
### Bid(`CollectionId`, `ListingId`, `Balance`)
- **summary**:   A new highest bid was placed (collection, listing, amount) 
 
### Burn(`CollectionId`, `SeriesId`, `Vec<SerialNumber>`)
- **summary**:   Tokens were burned (collection, series id, serial numbers) 
 
### CreateAdditional(`CollectionId`, `SeriesId`, `TokenCount`, `AccountId`)
- **summary**:   Additional tokens were added to a series (collection, series id, quantity, owner) 
 
### CreateCollection(`CollectionId`, `CollectionNameType`, `AccountId`)
- **summary**:   A new token collection was created (collection, name, owner) 
 
### CreateSeries(`CollectionId`, `SeriesId`, `TokenCount`, `AccountId`)
- **summary**:   A new series of tokens was created (collection, series id, quantity, owner) 
 
### CreateToken(`CollectionId`, `TokenId`, `AccountId`)
- **summary**:   A unique token was created (collection, series id, serial number, owner) 
 
### FixedPriceSaleClosed(`CollectionId`, `ListingId`)
- **summary**:   A fixed price sale has closed without selling (collection, listing) 
 
### FixedPriceSaleComplete(`CollectionId`, `ListingId`, `AccountId`)
- **summary**:   A fixed price sale has completed (collection, listing, buyer)) 
 
### FixedPriceSaleListed(`CollectionId`, `ListingId`)
- **summary**:   A fixed price sale has been listed (collection, listing) 
 
### Transfer(`AccountId`, `Vec<TokenId>`, `AccountId`)
- **summary**:   Token(s) were transferred (previous owner, token Ids, new owner) 
 
# RPC
 
### collectedTokens(collection: `CollectionId`, address: `Address`): `Vec<EnhancedTokenId>`
- **interface**: `api.rpc.nft.collectedTokens`
- **jsonrpc**: `nft_collectedTokens`
- **summary**: Get the tokens owned by an address in a certain collection
 
# Derive queries

- **interface**: api.derive.nft.function_name
# Module: nft/collectionInfo


## Functions

### collectionInfo

▸ **collectionInfo**() => `Observable`<[`CollectionInfo`](../interfaces/nft_types.collectioninfo.md)[]\>

Get map of collection id to collection name


##### Returns

`Observable`<[`CollectionInfo`](../interfaces/nft_types.collectioninfo.md)[]\>

#### Defined in

[packages/api/src/derives/nft/collectionInfo.ts:13](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/nft/collectionInfo.ts#L13)

# Module: nft/openCollectionListings


## Functions

### openCollectionListings

▸ **openCollectionListings**(`collectionId`: `string`) => `Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)[]\>

Gets all tokens in a collection that have an open listing


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collectionId` | `string` | The collection Id value |

##### Returns

`Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)[]\>

#### Defined in

[packages/api/src/derives/nft/openCollectionListings.ts:30](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/nft/openCollectionListings.ts#L30)

# Module: nft/tokenInfo


## Functions

### tokenInfo

▸ **tokenInfo**(`tokenId`: `TokenId` \| `EnhancedTokenId`) => `Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)\>

Get info on the current token


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenId` | `TokenId` \| `EnhancedTokenId` | The token Id value |

##### Returns

`Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)\>

#### Defined in

[packages/api/src/derives/nft/tokenInfo.ts:31](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/nft/tokenInfo.ts#L31)

___

### tokensOf

▸ **tokensOf**(`owner`: `string` \| `AccountId`, `collectionIds?`: `CollectionId`[]) => `Observable`<`EnhancedTokenId`[]\>

Get info on the current token


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| `AccountId` | The owner address |
| `collectionIds?` | `CollectionId`[] | list of collectionIds [0,1,2..] (if not specified returns all the tokens in all the collections) |

##### Returns

`Observable`<`EnhancedTokenId`[]\>

#### Defined in

[packages/api/src/derives/nft/tokenInfo.ts:64](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/nft/tokenInfo.ts#L64)

# Module: nft/tokenInfoForCollection


## Functions

### tokenInfoForCollection

▸ **tokenInfoForCollection**() => `Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)[]\>

**`description`** Retrieve the list of all tokens in a collection


`Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)[]\>

#### Defined in

[packages/api/src/derives/nft/tokenInfoForCollection.ts:28](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/nft/tokenInfoForCollection.ts#L28)

# Module: nft/types


### Interfaces

- [CollectionInfo](../interfaces/nft_types.collectioninfo.md)
- [DeriveTokenInfo](../interfaces/nft_types.derivetokeninfo.md)
