export default {
    rpc: {
        collectedTokens: {
            description: 'Get the tokens owned by an address in a certain collection',
            params: [
              {
                name: 'collection',
                type: 'CollectionId'
              },
              {
                name: 'address',
                type: 'Address',
              }
            ],
            type: 'Json',
          },
        getCollectionInfo: {
          description: 'Get collection info from a given collection',
          params: [
            {
              name: 'CollectionId',
              type: 'CollectionId'
            }
          ],
          type: 'Json',
        },
        getCollectionListings: {
          description: 'Get collection listing from a given collection',
          params: [
            {
              name: 'CollectionId',
              type: 'CollectionId'
            },
            {
              name: 'cursor',
              type: 'u128'
            },
            {
              name: 'limit',
              type: 'u16'
            }
          ],
          type: 'Json',
        },
        getTokenInfo: {
            description: 'Get token info',
            params: [
            {
                name: 'CollectionId',
                type: 'CollectionId'
            },
            {
                name: 'SeriesId',
                type: 'SeriesId'
            },
            {
                name: 'SerialNumber',
                type: 'SerialNumber'
            }
            ],
            type: 'Json',
        },
        tokenUri: {
        description: 'Get token uri',
        params: [
            {
                name: 'TokenId',
                type: 'TokenId'
            }
        ],
        type: 'Vec<u8>',
      },
    },
    types: {
        'TokenId': '(CollectionId, SeriesId, SerialNumber)',
        'AuctionClosureReason': {
            '_enum': {
                'ExpiredNoBids': null,
                'SettlementFailed': null,
                'VendorCancelled': null
            }
        },
        'AuctionListing': {
            'paymentAsset': 'AssetId',
            'reservePrice': 'Balance',
            'close': 'BlockNumber',
            'seller': 'AccountId',
            'tokens': 'Vec<TokenId>',
            'royaltiesSchedule': 'RoyaltiesSchedule',
        },
        'CollectionId': 'u32',
        'CollectionNameType': 'Vec<u8>',
        'FixedPriceListing': {
            'paymentAsset': 'AssetId',
            'fixedPrice': 'Balance',
            'close': 'BlockNumber',
            'buyer': 'Option<AccountId>',
            'seller': 'AccountId',
            'tokens': 'Vec<TokenId>',
            'royaltiesSchedule': 'RoyaltiesSchedule',
        },
        'Listing': {
            '_enum': {
                'FixedPrice': 'FixedPriceListing',
                'Auction': 'AuctionListing'
            }
        },
        'ListingId': 'u128',
        'MetadataScheme': {
            "_enum": {
                "Ipfs": null,
                "Https": "Vec<u8>",
            }
        },
        'MetadataBaseURI': {
          "_enum": {
            "Ipfs": null,
            "Https": "Vec<u8>",
          }
        },
        'NFTAttributeValue': {
            '_enum': {
                'i32': 'i32',
                'u8': 'u8',
                'u16': 'u16',
                'u32': 'u32',
                'u64': 'u64',
                'u128': 'u128',
                'Bytes32': '[u8; 32]',
                'Bytes': 'Bytes',
                'String': 'String',
                'Hash': '[u8; 32]',
                'Timestamp': 'u64',
                'Url': 'String'
            }
        },
        'Reason': 'AuctionClosureReason',
        'RoyaltiesSchedule': {
            'entitlements': 'Vec<(AccountId, Permill)>'
        },
        'SeriesId': 'u32',
        'SerialNumber': 'u32',
        'TokenCount': 'u32',
        'TokenLockReason': {
          '_enum': {
            'ListingId': 'ListingId'
          }
        },
        'CollectionInfo': {
          'name': 'Vec<u8>',
          'owner': 'AccountId',
          'royalties': 'Vec<(AccountId, Permill)>'
        },
        'ListingResponse': {
          'id': 'ListingId',
          'listingType': 'Vec<u8>',
          'paymentAsset': 'AssetId',
          'price': 'Balance',
          'endBlock': 'BlockNumber',
          'buyer': 'Option<AccountId>',
          'seller': 'AccountId',
          'tokenIds': 'Vec<TokenId>',
          'royalties': 'Vec<(AccountId, Permill)>'
        },
        'ListingResponseWrapper': {
          'listings': 'Vec<ListingResponse<AccountId>>',
          'newCursor': 'Option<u128>'
        },
      'TokenInfo':{
        'attributes': 'Vec<NFTAttributeValue>',
        'owner': 'AccountId',
        'royalties': 'Vec<(AccountId, Permill)>'
      }
    }
}
