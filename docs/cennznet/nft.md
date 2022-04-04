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
 
### collectionName(`u32`): `Bytes`
- **interface**: `api.query.nft.collectionName`
- **summary**:    Map from collection to its human friendly name 
 
### collectionOwner(`u32`): `Option<AccountId32>`
- **interface**: `api.query.nft.collectionOwner`
- **summary**:    Map from collection to owner address 
 
### collectionRoyalties(`u32`): `Option<CrmlNftRoyaltiesSchedule>`
- **interface**: `api.query.nft.collectionRoyalties`
- **summary**:    Map from collection to its defacto royalty scheme 
 
### listingEndSchedule(`u32, u128`): `bool`
- **interface**: `api.query.nft.listingEndSchedule`
- **summary**:    Block numbers where listings will close. Value is `true` if at block number `listing_id` is scheduled to close. 
 
### listings(`u128`): `Option<CrmlNftListing>`
- **interface**: `api.query.nft.listings`
- **summary**:    NFT sale/auction listings keyed by collection id and token id 
 
### listingWinningBid(`u128`): `Option<(AccountId32,u128)>`
- **interface**: `api.query.nft.listingWinningBid`
- **summary**:    Winning bids on open listings. keyed by collection id and token id 
 
### nextCollectionId(): `u32`
- **interface**: `api.query.nft.nextCollectionId`
- **summary**:    The next available collection Id 
 
### nextListingId(): `u128`
- **interface**: `api.query.nft.nextListingId`
- **summary**:    The next available listing Id 
 
### nextMarketplaceId(): `u32`
- **interface**: `api.query.nft.nextMarketplaceId`
- **summary**:    The next available marketplace id 
 
### nextSerialNumber(`u32, u32`): `u32`
- **interface**: `api.query.nft.nextSerialNumber`
- **summary**:    The next available serial number in a given (collection, series) 
 
### nextSeriesId(`u32`): `u32`
- **interface**: `api.query.nft.nextSeriesId`
- **summary**:    The next group Id within an NFT collection  It is used as material to generate the global `TokenId` 
 
### openCollectionListings(`u32, u128`): `bool`
- **interface**: `api.query.nft.openCollectionListings`
- **summary**:    Map from collection to any open listings 
 
### registeredMarketplaces(`u32`): `CrmlNftMarketplace`
- **interface**: `api.query.nft.registeredMarketplaces`
- **summary**:    Map from marketplace account_id to royalties schedule 
 
### seriesAttributes(`u32, u32`): `Vec<CrmlNftNftAttributeValue>`
- **interface**: `api.query.nft.seriesAttributes`
- **summary**:    Map from (collection, series) to its attributes (deprecated) 
 
### seriesIssuance(`u32, u32`): `u32`
- **interface**: `api.query.nft.seriesIssuance`
- **summary**:    Map from a (collection, series) to its total issuance 
 
### seriesMetadataScheme(`u32, u32`): `Option<CrmlNftMetadataScheme>`
- **interface**: `api.query.nft.seriesMetadataScheme`
- **summary**:    Map from a token series to its metadata reference scheme 
 
### seriesMetadataURI(`u32, u32`): `Option<Bytes>`
- **interface**: `api.query.nft.seriesMetadataURI`
- **summary**:    DEPRECATED: Migrate to seriesMetadataScheme. Read-only for NFTs created in v46 
 
### seriesName(`(u32,u32)`): `Bytes`
- **interface**: `api.query.nft.seriesName`
- **summary**:    Map from series to its human friendly name 
 
### seriesRoyalties(`u32, u32`): `Option<CrmlNftRoyaltiesSchedule>`
- **interface**: `api.query.nft.seriesRoyalties`
- **summary**:    Map from (collection, series) to configured royalties schedule 
 
### storageVersion(): `u32`
- **interface**: `api.query.nft.storageVersion`
- **summary**:    Version of this module's storage schema 
 
### tokenBalance(`AccountId32`): `BTreeMap<(u32,u32), u32>`
- **interface**: `api.query.nft.tokenBalance`
- **summary**:    Count of tokens owned by an address, supports ERC721 `balanceOf` 
 
### tokenLocks(`(u32,u32,u32)`): `Option<CrmlNftTokenLockReason>`
- **interface**: `api.query.nft.tokenLocks`
- **summary**:    Map from a token to lock status if any 
 
### tokenOwner(`(u32,u32), u32`): `AccountId32`
- **interface**: `api.query.nft.tokenOwner`
- **summary**:    Map from a token to its owner  The token Id is split in this map to allow better indexing (collection, series) + (serial number) 
 
# Extrinsic
 
### auction(token_id: `(u32,u32,u32)`, payment_asset: `u32`, reserve_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.auction`
- **summary**:   Auction a token on the open market to the highest bidder 

  Caller must be the token owner 

  - `payment_asset` fungible asset Id to receive payment with

  - `reserve_price` winning bid must be over this threshold

  - `duration` length of the auction (in blocks), uses default duration if unspecified
 
### auctionBundle(tokens: `Vec<(u32,u32,u32)>`, payment_asset: `u32`, reserve_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.auctionBundle`
- **summary**:   Auction a bundle of tokens on the open market to the highest bidder 

  - Tokens must be from the same series

  - Tokens with individual royalties schedules cannot be sold in bundles

  Caller must be the token owner 

  - `payment_asset` fungible asset Id to receive payment with

  - `reserve_price` winning bid must be over this threshold

  - `duration` length of the auction (in blocks), uses default duration if unspecified
 
### bid(listing_id: `u128`, amount: `u128`)
- **interface**: `api.tx.nft.bid`
- **summary**:   Place a bid on an open auction 

  - `amount` to bid (in the seller's requested payment asset)
 
### burn(token_id: `(u32,u32,u32)`)
- **interface**: `api.tx.nft.burn`
- **summary**:   Burn a token 🔥 

  Caller must be the token owner 
 
### burnBatch(collection_id: `u32`, series_id: `u32`, serial_numbers: `Vec<u32>`)
- **interface**: `api.tx.nft.burnBatch`
- **summary**:   Burn some tokens 🔥 Tokens must be from the same series 

  Caller must be the token owner Fails on duplicate serials 
 
### buy(listing_id: `u128`)
- **interface**: `api.tx.nft.buy`
- **summary**:   Buy a token listing for its specified price 
 
### cancelSale(listing_id: `u128`)
- **interface**: `api.tx.nft.cancelSale`
- **summary**:   Close a sale or auction returning tokens Requires no successful bids have been made for an auction. Caller must be the listed seller 
 
### createCollection(name: `Bytes`, royalties_schedule: `Option<CrmlNftRoyaltiesSchedule>`)
- **interface**: `api.tx.nft.createCollection`
- **summary**:   Create a new token collection 

  The caller will become the collection owner `collection_id`- 32 byte utf-8 string `metadata_base_uri` - Base URI for off-chain metadata for tokens in this collection `royalties_schedule` - defacto royalties plan for secondary sales, this will apply to all tokens in the collection by default. 
 
### migrateToMetadataScheme(collection_id: `u32`, series_id: `u32`, scheme: `CrmlNftMetadataScheme`)
- **interface**: `api.tx.nft.migrateToMetadataScheme`
- **summary**:   Set the owner of a collection Caller must be the current collection owner 
 
### mintAdditional(collection_id: `u32`, series_id: `u32`, quantity: `u32`, owner: `Option<AccountId32>`)
- **interface**: `api.tx.nft.mintAdditional`
- **summary**:   Mint tokens for an existing series 

  `quantity` - how many tokens to mint `owner` - the token owner, defaults to the caller if unspecified Caller must be the collection owner 

  -----------Weight is O(N) where N is `quantity` 
 
### mintSeries(collection_id: `u32`, quantity: `u32`, owner: `Option<AccountId32>`, metadata_scheme: `CrmlNftMetadataScheme`, royalties_schedule: `Option<CrmlNftRoyaltiesSchedule>`)
- **interface**: `api.tx.nft.mintSeries`
- **summary**:   Create a new series Additional tokens can be minted via `mint_additional` 

  `quantity` - number of tokens to mint now `owner` - the token owner, defaults to the caller `metadata_scheme` - The off-chain metadata referencing scheme for tokens in this series Caller must be the collection owner 
 
### registerMarketplace(marketplace_account: `Option<AccountId32>`, entitlement: `Permill`)
- **interface**: `api.tx.nft.registerMarketplace`
- **summary**:   Flag an account as a marketplace 

  `marketplace_account` - if specified, this account will be registered `entitlement` - Permill, percentage of sales to go to the marketplace If no marketplace is specified the caller will be registered 
 
### sell(token_id: `(u32,u32,u32)`, buyer: `Option<AccountId32>`, payment_asset: `u32`, fixed_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.sell`
- **summary**:   Sell a single token at a fixed price 

  `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase `asset_id` fungible asset Id to receive as payment for the NFT `fixed_price` ask price `duration` listing duration time in blocks from now `marketplace` optionally, the marketplace that the NFT is being sold on Caller must be the token owner 
 
### sellBundle(tokens: `Vec<(u32,u32,u32)>`, buyer: `Option<AccountId32>`, payment_asset: `u32`, fixed_price: `u128`, duration: `Option<u32>`, marketplace_id: `Option<u32>`)
- **interface**: `api.tx.nft.sellBundle`
- **summary**:   Sell a bundle of tokens at a fixed price 

  - Tokens must be from the same series

  - Tokens with individual royalties schedules cannot be sold with this method

  `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase `asset_id` fungible asset Id to receive as payment for the NFT `fixed_price` ask price `duration` listing duration time in blocks from now Caller must be the token owner 
 
### setOwner(collection_id: `u32`, new_owner: `AccountId32`)
- **interface**: `api.tx.nft.setOwner`
- **summary**:   Set the owner of a collection Caller must be the current collection owner 
 
### setSeriesName(collection_id: `u32`, series_id: `u32`, name: `Bytes`)
- **interface**: `api.tx.nft.setSeriesName`
- **summary**:   Set the name of a series Caller must be the current collection owner 
 
### transfer(token_id: `(u32,u32,u32)`, new_owner: `AccountId32`)
- **interface**: `api.tx.nft.transfer`
- **summary**:   Transfer ownership of an NFT Caller must be the token owner 
 
### transferBatch(collection_id: `u32`, series_id: `u32`, serial_numbers: `Vec<u32>`, new_owner: `AccountId32`)
- **interface**: `api.tx.nft.transferBatch`
- **summary**:   Transfer ownership of a batch of NFTs (atomic) Tokens must be from the same series Caller must be the token owner 
 
### updateFixedPrice(listing_id: `u128`, new_price: `u128`)
- **interface**: `api.tx.nft.updateFixedPrice`
- **summary**:   Update fixed price for a single token sale 

  `listing_id` id of the fixed price listing `new_price` new fixed price Caller must be the token owner 
 
# Error
 
### BidTooLow
- **interface**: `api.errors.nft.BidTooLow`
- **summary**:   Auction bid was lower than reserve or current highest bid 
 
### CollectionIdExists
- **interface**: `api.errors.nft.CollectionIdExists`
- **summary**:   A collection with the same ID already exists 
 
### CollectionNameInvalid
- **interface**: `api.errors.nft.CollectionNameInvalid`
- **summary**:   Given collection name is invalid (invalid utf-8, too long, empty) 
 
### InternalPayment
- **interface**: `api.errors.nft.InternalPayment`
- **summary**:   Internal error during payment 
 
### InvalidMetadataPath
- **interface**: `api.errors.nft.InvalidMetadataPath`
- **summary**:   The metadata path is invalid (non-utf8 or empty) 
 
### MarketplaceNotRegistered
- **interface**: `api.errors.nft.MarketplaceNotRegistered`
- **summary**:   The account_id hasn't been registered as a marketplace 
 
### MaxAttributeLength
- **interface**: `api.errors.nft.MaxAttributeLength`
- **summary**:   Given attribute value is larger than the configured max. 
 
### MixedBundleSale
- **interface**: `api.errors.nft.MixedBundleSale`
- **summary**:   Selling tokens from different collections is not allowed 
 
### NameAlreadySet
- **interface**: `api.errors.nft.NameAlreadySet`
- **summary**:   The Series name has been set 
 
### NoAvailableIds
- **interface**: `api.errors.nft.NoAvailableIds`
- **summary**:   No more Ids are available, they've been exhausted 
 
### NoCollection
- **interface**: `api.errors.nft.NoCollection`
- **summary**:   The NFT collection does not exist 
 
### NoPermission
- **interface**: `api.errors.nft.NoPermission`
- **summary**:   origin does not have permission for the operation (the token may not exist) 
 
### NoSeries
- **interface**: `api.errors.nft.NoSeries`
- **summary**:   The series does not exist 
 
### NotForAuction
- **interface**: `api.errors.nft.NotForAuction`
- **summary**:   The token is not listed for auction sale 
 
### NotForFixedPriceSale
- **interface**: `api.errors.nft.NotForFixedPriceSale`
- **summary**:   The token is not listed for fixed price sale 
 
### NoToken
- **interface**: `api.errors.nft.NoToken`
- **summary**:   The token does not exist 
 
### RoyaltiesInvalid
- **interface**: `api.errors.nft.RoyaltiesInvalid`
- **summary**:   Total royalties would exceed 100% of sale or an empty vec is supplied 
 
### RoyaltiesProtection
- **interface**: `api.errors.nft.RoyaltiesProtection`
- **summary**:   Tokens with different individual royalties cannot be sold together 
 
### SchemaMaxAttributes
- **interface**: `api.errors.nft.SchemaMaxAttributes`
- **summary**:   Too many attributes in the provided schema or data 
 
### TokenListingProtection
- **interface**: `api.errors.nft.TokenListingProtection`
- **summary**:   Cannot operate on a listed NFT 
 
# Events
 
### AuctionClosed(`u32`, `u128`, `CrmlNftAuctionClosureReason`)
- **interface**: `api.events.nft.AuctionClosed`
- **summary**:   An auction has closed without selling (collection, listing, reason) 
 
### AuctionOpen(`u32`, `u128`, `Option<u32>`)
- **interface**: `api.events.nft.AuctionOpen`
- **summary**:   An auction has opened (collection, listing, marketplace_id) 
 
### AuctionSold(`u32`, `u128`, `u32`, `u128`, `AccountId32`)
- **interface**: `api.events.nft.AuctionSold`
- **summary**:   An auction has sold (collection, listing, payment asset, bid, new owner) 
 
### Bid(`u32`, `u128`, `u128`)
- **interface**: `api.events.nft.Bid`
- **summary**:   A new highest bid was placed (collection, listing, amount) 
 
### Burn(`u32`, `u32`, `Vec<u32>`)
- **interface**: `api.events.nft.Burn`
- **summary**:   Tokens were burned (collection, series id, serial numbers) 
 
### CreateCollection(`u32`, `Bytes`, `AccountId32`)
- **interface**: `api.events.nft.CreateCollection`
- **summary**:   A new token collection was created (collection, name, owner) 
 
### CreateSeries(`u32`, `u32`, `u32`, `AccountId32`)
- **interface**: `api.events.nft.CreateSeries`
- **summary**:   A new series of tokens was created (collection, series id, quantity, owner) 
 
### CreateTokens(`u32`, `u32`, `u32`, `AccountId32`)
- **interface**: `api.events.nft.CreateTokens`
- **summary**:   Token(s) were created (collection, series id, quantity, owner) 
 
### FixedPriceSaleClosed(`u32`, `u128`)
- **interface**: `api.events.nft.FixedPriceSaleClosed`
- **summary**:   A fixed price sale has closed without selling (collection, listing) 
 
### FixedPriceSaleComplete(`u32`, `u128`, `AccountId32`)
- **interface**: `api.events.nft.FixedPriceSaleComplete`
- **summary**:   A fixed price sale has completed (collection, listing, buyer)) 
 
### FixedPriceSaleListed(`u32`, `u128`, `Option<u32>`)
- **interface**: `api.events.nft.FixedPriceSaleListed`
- **summary**:   A fixed price sale has been listed (collection, listing, marketplace_id) 
 
### FixedPriceSalePriceUpdated(`u32`, `u128`)
- **interface**: `api.events.nft.FixedPriceSalePriceUpdated`
- **summary**:   A fixed price sale has had its price updated (collection, listing) 
 
### RegisteredMarketplace(`AccountId32`, `Permill`, `u32`)
- **interface**: `api.events.nft.RegisteredMarketplace`
- **summary**:   An account has been registered as a marketplace (account, entitlement, marketplace_id) 
 
### Transfer(`AccountId32`, `u32`, `u32`, `Vec<u32>`, `AccountId32`)
- **interface**: `api.events.nft.Transfer`
- **summary**:   Token(s) were transferred (previous owner, token Ids, new owner) 
 
# RPC
 
### collectedTokens(collection: `CollectionId`, address: `Address`): `Vec<EnhancedTokenId>`
- **interface**: `api.rpc.nft.collectedTokens`
- **jsonrpc**: `nft_collectedTokens`
- **summary**: Get the tokens owned by an address in a certain collection
 
### getCollectionInfo(CollectionId: `CollectionId`): `Option<CollectionInfo>`
- **interface**: `api.rpc.nft.getCollectionInfo`
- **jsonrpc**: `nft_getCollectionInfo`
- **summary**: Get collection info from a given collection
 
### getCollectionListings(CollectionId: `CollectionId`, cursor: `u128`, limit: `u16`): `Option<ListingResponseWrapper<AccountId>>`
- **interface**: `api.rpc.nft.getCollectionListings`
- **jsonrpc**: `nft_getCollectionListings`
- **summary**: Get collection listing from a given collection
 
### getTokenInfo(CollectionId: `CollectionId`, SeriesId: `SeriesId`, SerialNumber: `SerialNumber`): `TokenInfo<AccountId>`
- **interface**: `api.rpc.nft.getTokenInfo`
- **jsonrpc**: `nft_getTokenInfo`
- **summary**: Get token info
 
### tokenUri(TokenId: `TokenId`): `Vec<u8>`
- **interface**: `api.rpc.nft.tokenUri`
- **jsonrpc**: `nft_tokenUri`
- **summary**: Get token uri
 
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

[packages/api/src/derives/nft/collectionInfo.ts:13](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/collectionInfo.ts#L13)

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

[packages/api/src/derives/nft/openCollectionListings.ts:30](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/openCollectionListings.ts#L30)

___

### openCollectionListingsV2

▸ **openCollectionListingsV2**(`collectionId`: `string`) => `Observable`<[`DeriveListingInfo`](../interfaces/nft_types.derivelistinginfo.md)[]\>

Gets all tokens in a collection that have an open listing


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collectionId` | `string` | The collection Id value |

##### Returns

`Observable`<[`DeriveListingInfo`](../interfaces/nft_types.derivelistinginfo.md)[]\>

#### Defined in

[packages/api/src/derives/nft/openCollectionListings.ts:100](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/openCollectionListings.ts#L100)

# Module: nft/tokenInfo


## Functions

### seriesMetadataUri

▸ **seriesMetadataUri**(`collectionId`: `number` \| `CollectionId`, `seriesId`: `number` \| `SeriesId`) => `Observable`<`Option`<`Bytes` \| `CrmlNftMetadataScheme`\>\>

Get metadata uri for a series, older runtime 45 (uses api.query.nft.seriesMetadataURI) new ones (api.query.nft.seriesMetadataScheme)


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collectionId` | `number` \| `CollectionId` | collection |
| `seriesId` | `number` \| `SeriesId` |  |

##### Returns

`Observable`<`Option`<`Bytes` \| `CrmlNftMetadataScheme`\>\>

#### Defined in

[packages/api/src/derives/nft/tokenInfo.ts:110](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/tokenInfo.ts#L110)

___

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

[packages/api/src/derives/nft/tokenInfo.ts:32](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/tokenInfo.ts#L32)

___

### tokensOf

▸ **tokensOf**(`owner`: `string` \| `AccountId`, `collectionIds?`: `CollectionId`[]) => `Observable`<`Error` \| `EnhancedTokenId`[]\>

Get info on the current token


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| `AccountId` | The owner address |
| `collectionIds?` | `CollectionId`[] | list of collectionIds [0,1,2..] (if not specified returns all the tokens in all the collections) |

##### Returns

`Observable`<`Error` \| `EnhancedTokenId`[]\>

#### Defined in

[packages/api/src/derives/nft/tokenInfo.ts:80](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/tokenInfo.ts#L80)

# Module: nft/tokenInfoForCollection


## Functions

### tokenInfoForCollection

▸ **tokenInfoForCollection**(`collectionId`: `string`) => `Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)[]\>

**`description`** Retrieve the list of all tokens in a collection


| Name | Type |
| :------ | :------ |
| `collectionId` | `string` |

##### Returns

`Observable`<[`DeriveTokenInfo`](../interfaces/nft_types.derivetokeninfo.md)[]\>

#### Defined in

[packages/api/src/derives/nft/tokenInfoForCollection.ts:27](https://github.com/cennznet/api.js/blob/8a3918c/packages/api/src/derives/nft/tokenInfoForCollection.ts#L27)

# Module: nft/types


### Interfaces

- [CollectionInfo](../interfaces/nft_types.collectioninfo.md)
- [DeriveListingInfo](../interfaces/nft_types.derivelistinginfo.md)
- [DeriveTokenInfo](../interfaces/nft_types.derivetokeninfo.md)
- [tokens](../interfaces/nft_types.tokens.md)
