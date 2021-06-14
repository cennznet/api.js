# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.4.1](https://github.com/cennznet/api.js/compare/release/1.4.0...prerelease/1.4.1) (15/06/2021)
### Changed:
- RPC types for CENNZX
## [1.4.0](https://github.com/cennznet/api.js/compare/release/1.3.4...prerelease/1.4.0) (25/05/2021)
### Added:
- NFT module types

## [1.3.4](https://github.com/cennznet/api.js/compare/release/1.3.3...prerelease/1.3.4) (15/03/2021)
### Added:
    - Added ExtrinsicPayload in typesBundle.
## [1.3.3](https://github.com/cennznet/api.js/compare/release/1.3.3-alpha.1...prerelease/1.3.3) (18/02/2021)
### Changed:
    - Bump version
## [1.3.3-alpha.1](https://github.com/cennznet/api.js/compare/release/1.3.2...prerelease/1.3.3-alpha.1) (18/02/2021)
### Added:
    - Added RPC calls for staking(accruedPayout) and grandpa(restartVoter)
## [1.3.1](https://github.com/cennznet/api.js/compare/1.3.0.../1.3.1) (02/12/2020)
### Added:
    - Added events types which are compatible with runtime version v36 i.e DispatchInfoTo36, WeightTo36, DispatchClassTo36
### Changed:
    - Use polkadot type generation script to generate types from metadata
### Fixed:
    - Fixed event decoding with rv36
## [1.3.0](https://github.com/cennznet/api.js/compare/1.3.0-alpha.1.../1.3.0) (24/11/2020)
### Fixed:
    - Fixed types for sylo module
### Added:
    - Added typesBundle to support 'runtime version' specific types to make it backward compatibile.
    - Added VecDeque type  
## [1.3.0-alpha.1](https://github.com/cennznet/api.js/compare/release/1.2.1.../1.3.0-alpha.1) (23/10/2020)
Polkadot's changelog at [2.3.1](https://github.com/polkadot-js/api/blob/master/CHANGELOG.md#231-oct-19-2020)
### Changed:
    - Changed the repo to generate types from polkadot script.
### Added:
    - Definition types for all supported types

## [1.2.0](https://github.com/cennznet/api.js/compare/release/1.1.2...release/1.2.0) (17/08/2020)
### Added:
    - Support for staking types
    - Support for (Generic asset's) balanceLock type

## [1.1.2](https://github.com/cennznet/api.js/compare/release/1.1.1...release/1.1.2) (03/08/2020)
### Changed
    - Conditional compile support for @plugnet/doughnut-wasm dependency

## [1.1.1](https://github.com/cennznet/api.js/compare/release/1.1.0...release/1.1.1) (03/08/2020)
### Fixed
    - Fix missing @plugnet/doughnut-wasm dependency

## [1.1.0](https://github.com/cennznet/api.js/compare/release/1.0.3...release/1.1.0) (31/07/2020)
    Changed:
    - Improve getting started doc (#122)
    Added:
    - Fix TS SignerOptions to include doughnut
    - Phase type to include 'Initialization'
    - Updated Azalea metadata for runtime version 36 (#122)

## [1.0.3](https://github.com/cennznet/api.js/compare/release/1.0.2...release/1.0.3) (13/07/2020)

    Adds:
    - Support CENNZX liquidity RPCs (#117)
    - Slim metadata generation script (#120)
    - Support on-chain asset registry (#116)
    Fixes:
    - Corrected some generated example snippets (#121)

## [1.0.2](https://github.com/cennznet/api.js/compare/release/1.0.1...release/1.0.2) (15/05/2020)

    Patch:
    - Add null constructor to sylo runtime response enum (#109) 


## [1.0.1](https://github.com/cennznet/api.js/compare/release/1.0.0...release/1.0.1) (27/03/2020)

    Patch:
    - Fix decoding of Sylo pkb response (#104) 
    - Add Message and MessageId types for Sylo (#105)

## [1.0.0](https://github.com/cennznet/api.js/compare/v0.14.0...release/1.0.0) (27/03/2020)
    Discontinue support for pre-1.0.0 chains

    Changes:
    - Updated Extrinsic types to use new "signed extra" / extrinsic v4 format
        - Added ChargeTransactionPayment type, which contains tip (default 0) and FeeExchange (default None);
    - New format for fee exchange type
    - Support MultiSignature and type registry refactors
    - Replaced @plugnet/* dependencies with @polkadot/api@0.96.1 directly

    Adds:
    - Derived query for estimating fee is updated
    - CENNZX rpc calls for price calculation


## [0.14.0](https://github.com/cennznet/api.js/compare/v0.13.6...v0.14.0) (2019-06-18)


### Bug Fixes

* CennznetExtrinsic encoding issue ([#16](https://github.com/cennznet/api.js/issues/16)) ([e81b641](https://github.com/cennznet/api.js/commit/e81b641)), closes [#17](https://github.com/cennznet/api.js/issues/17)





## [0.13.5](https://github.com/cennznet/api.js/compare/v0.13.4...v0.13.5) (2019-05-24)

**Note:** Version bump only for package @cennznet/types





## [0.13.4](https://github.com/cennznet/api.js/compare/v0.13.3...v0.13.4) (2019-05-21)

**Note:** Version bump only for package @cennznet/types





## [0.13.3](https://github.com/cennznet/api.js/compare/v0.13.2...v0.13.3) (2019-05-21)

**Note:** Version bump only for package @cennznet/types





## [0.13.2](https://github.com/cennznet/api.js/compare/v0.13.1...v0.13.2) (2019-05-16)

**Note:** Version bump only for package @cennznet/types





## [0.13.1](https://github.com/cennznet/api.js/compare/v0.13.0...v0.13.1) (2019-05-10)

**Note:** Version bump only for package @cennznet/types





# [0.13.0](https://github.com/cennznet/api.js/compare/v0.12.3...v0.13.0) (2019-05-10)


### Bug Fixes

* checkDoughnut and checkFeeExchange in ExtrinsicSignature.ts ([d3161a8](https://github.com/cennznet/api.js/commit/d3161a8)), closes [#88](https://github.com/cennznet/api.js/issues/88)


### Dependency update

* upgrade to @plugnet/api v0.78.100 ([3b50371](https://github.com/cennznet/api.js/commit/3b50371)), closes [#90](https://github.com/cennznet/api.js/issues/90)


### Features

* prebundle metadata ([3b481af](https://github.com/cennznet/api.js/commit/3b481af)), closes [#87](https://github.com/cennznet/api.js/issues/87)





## [0.12.3](https://github.com/cennznet/api.js/compare/v0.12.2...v0.12.3) (2019-05-07)

**Note:** Version bump only for package @cennznet/types





## [0.12.2](https://github.com/cennznet/api.js/compare/v0.12.1...v0.12.2) (2019-05-07)

**Note:** Version bump only for package @cennznet/types





## [0.12.1](https://github.com/cennznet/api.js/compare/v0.12.0...v0.12.1) (2019-05-06)

**Note:** Version bump only for package @cennznet/types





# [0.12.0](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.11.2...v0.12.0) (2019-04-30)


### Dependency update

* upgrade to @plugnet/api 0.77.101 ([6e53046](https://bitbucket.org/centralitydev/cennznet-js/commits/6e53046))





## [0.11.2](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.11.1...v0.11.2) (2019-04-29)


### Bug Fixes

* special treatment in SignaturePayload for doughnut and feeExchange ([9d568f4](https://bitbucket.org/centralitydev/cennznet-js/commits/9d568f4))





## [0.11.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.11.0...v0.11.1) (2019-04-24)

**Note:** Version bump only for package @cennznet/types





# [0.11.0](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.10.2...v0.11.0) (2019-04-17)


### Bug Fixes

* missing deps ([6248afe](https://bitbucket.org/centralitydev/cennznet-js/commits/6248afe)), closes [#71](https://bitbucket.org/centralitydev/cennznet-js/issue/71)


### Features

* adding alias ([84497e9](https://bitbucket.org/centralitydev/cennznet-js/commits/84497e9))





## [0.10.2](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.10.1...v0.10.2) (2019-04-11)

**Note:** Version bump only for package @cennznet/types





## [0.10.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.10.0...v0.10.1) (2019-04-11)

**Note:** Version bump only for package @cennznet/types
