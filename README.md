# `CENNZNet SDK`

> The Cennznet JavaScript API library for browsers and Node.js.

## Get started

[Development guide](docs/GET_STARTED.md)

## Release notes

[17/01/2020] Proper document to be added when 1.0.0 final is releasing, here is a quick note:

- `@cennznet/api@0.20.7` is the last version working with `cennznet/cennznet:0.*.*`;
- `@cennznet/api@1.0.0-alpha.*` (current stage) is working with [cennznet/cennznet:1.0.0-rc1][cennznet/cennznet:1.0.0-rc1];
- `@cennznet/api@1.0.0-beta.*` (next stage) is planned to work with `cennznet/cennznet:1.0.0-rc2`(to be released);

Changes made in alpha version:

- Updated `Extrinsic` types
  - Added `ChargeTransactionPayment` type, which contains `tip (default 0)` and `FeeExchange (default None)`;
- Changed dependencies from `@plugnet/api` to `@polkadot/api@0.96.1` directly (breaking changes were introduced in `@polkadot/api@0.97.1`, which could be upgraded in beta releases);

---

Please read the [documentation](https://cennznetdocs.com/api/latest/tutorials/0_Overview.md) for more.

# Components

| Name                                | Description                                                |
| ----------------------------------- | ---------------------------------------------------------- |
| [@cennznet/api](packages/api)       | package that providing the api                             |
| [@cennznet/wallet](packages/wallet) | a wallet implementation that can be used as signer for api |
| [@cennznet/util](packages/util)     | cennznet specific utility functions                        |
| [@cennznet/types](packages/types)   | cennznet specific type definitions                         |

# Cennznet runtime module libraries

| Name                                                        | Description                                                          |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| [@cennznet/crml-generic-asset](packages/crml-generic-asset) | A sdk providing additional features for generic asset runtime module |
| [@cennznet/crml-cennzx-spot](packages/crml-cennzx-spot)     | A sdk providing additional features for cennzx spot runtime module   |
| [@cennznet/crml-attestation](packages/crml-attestation)     | A sdk providing additional features for Cennznet's Identity Service. |

# Examples

[docs/examples](docs/examples)
