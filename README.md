# `CENNZNet SDK `

> The Cennznet JavaScript API library for browsers and Node.js.

# Components

| Name                                                       | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| [@cennznet/api](packages/api/README.md)       | package that providing the api                             |
| [@cennznet/wallet](packages/wallet/README.md) | a wallet implementation that can be used as signer for api |
| [@cennznet/util](packages/util/README.md)     | cennznet specific utility functions                         |
| [@cennznet/types](packages/types/README.md)   | cennznet specific type definitions                                |

# How to contribute

1. add new runtime type
    > add your Type definition into packages/types/src/types and export in index.ts (filename should be the same as type name),
    > then create a PR.
