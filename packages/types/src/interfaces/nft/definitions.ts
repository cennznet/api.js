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
            type: 'Vec<TokenId>',
          },
    },
    types: {
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
            'tokenId': 'TokenId',
            'quantity': 'TokenCount',
            'seller': 'AccountId',
        },
        'CollectionId': 'String',
        'FixedPriceListing': {
            'paymentAsset': 'AssetId',
            'fixedPrice': 'Balance',
            'close': 'BlockNumber',
            'buyer': 'Option<AccountId>',
            'tokenId': 'TokenId',
            'quantity': 'TokenCount',
            'seller': 'AccountId',
        },
        'InnerId': 'TokenCount',
        'Listing': {
            '_enum': {
                'FixedPrice': 'FixedPriceListing',
                'Auction': 'AuctionListing'
            }
        },
        'ListingId': 'u128',
        'MetadataURI': 'String',
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
        'NFTAttributeName': 'String',
        'NFTAttributeTypeId': {
            '_enum': {
                'i32': null,
                'u8': null,
                'u16': null,
                'u32': null,
                'u64': null,
                'u128': null,
                'Bytes32': null,
                'Bytes': null,
                'String': null,
                'Hash': null,
                'Timestamp': null,
                'Url': null
            }
        },
        'NFTSchema': 'Vec<(NFTAttributeName, NFTAttributeTypeId)>',
        'Reason': 'AuctionClosureReason',
        'RoyaltiesSchedule': {
            'entitlements': 'Vec<(AccountId, Permill)>'
        },
        'TokenCount': 'u32',
        'TokenId': 'Hash',
    }
}
