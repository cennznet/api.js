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
            type: 'Vec<EnhancedTokenId>',
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
        'MarketplaceId': 'u32',
        'Marketplace': {
          'account': 'AccountId',
          'entitlement': 'Permill'
        },
        'MassDrop': {
          'price': 'Balance',
          'assetId': 'AssetId',
          'maxSupply': 'TokenCount',
          'transactionLimit': 'Option<TokenCount>',
          'activationTime': 'BlockNumber',
          'preSale': 'Option<Presale>'
        },
        'Presale': {
          'price': 'Balance',
          'transactionLimit': 'Option<TokenCount>',
          'activationTime': 'BlockNumber',
          'maxSupply': 'TokenCount'
        }
    }
}
