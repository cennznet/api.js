# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.5.0](https://github.com/cennznet/api.js/compare/prerelease/1.5.0-alpha.0...prerelease/1.5.0) (18/11/2021)
### Added:
    - Eth Bridge module derived queries support
    - Governance module support
### Changed
    - Bump version tmpl from 1.0.4 to 1.0.5
    - Bump version ws from 5.2.2 to 5.2.3
    - Bump version url-parse from 1.4.7 to 1.5.3
    - Bump version color-string from 1.5.4 to 1.6.0
    - Bump version postcss from 7.0.35 to 7.0.39
    - Bump version prismjs from 1.23.0 to 1.25.0
    - Bump version tar from 4.4.15 to 4.4.19
    - Bump version browserlist from 4.8.7 to 4.17.6
    - Bump version hosted-git-info from 2.8.8 to 2.8.9
    - Bump version dns-packet from 1.3.1 to 1.3.4
    - Bump version handlebars from 4.7.3 to 4.7.7
    - Bump version underscore from 1.11.0 to 1.13.1
    - Bump version lodash from 4.17.20 to 4.17.21
## [1.5.0-alpha.0](https://github.com/cennznet/api.js/compare/prerelease/1.4.1...prerelease/1.5.0-alpha.0) (26/07/2021)
### Added:
    - Improved extrinsic payment option
    - Script for module specific markdown
    - Api creation with option to connection via network name
    - Doc generation for derive functions
    - useCennznet hook to connect to chain and extension and return all accounts
    - Generated extension release data
### Changed    
    - Update polkadot dependencies to 3.7.1.

## [1.4.0](https://github.com/cennznet/api.js/compare/release/1.3.4...prerelease/1.4.0) (25/05/2021)
### Added:
    - NFT module derived queries

## [1.3.4](https://github.com/cennznet/api.js/compare/release/1.3.3...prerelease/1.3.4) (15/03/2021)
### Changed:
    - Bump version elliptic from 6.5.3 to 6.5.4
    - Bump version prismjs from 1.22.0 to 1.23.0
## [1.3.3](https://github.com/cennznet/api.js/compare/release/1.3.3-alpha.1...prerelease/1.3.3) (18/02/2021)
### Changed:
    - Bump version
### Fixed:
    - Updated @cennznet/types dependency to 1.3.3
## [1.3.3-alpha.1](https://github.com/cennznet/api.js/compare/release/1.3.2...prerelease/1.3.3-alpha.1) (18/02/2021)
### Added:
    - Added RPC calls for staking(accruedPayout) and grandpa(restartVoter)
    - Bump ini from 1.3.5 to 1.3.7
### Removed:
    - Sylo extrinsics are removed in v38 runtime    
## [1.3.2](https://github.com/cennznet/api.js/compare/1.3.1.../1.3.2) (07/12/2020)
### Added:
    - Adds auto scheduled job to test upstream @polkadot packages for breaking changes
### Removed:
    - Removed @cennznet/util dependency from @cennznet/api
## [1.3.1](https://github.com/cennznet/api.js/compare/1.3.0.../1.3.1) (02/12/2020)
### Added:
    - Backwards compatible with v36
    - Bump highlight.js from 9.18.1 to 9.18.5
### Changed:
    - Update polkadot dependencies to 2.7.1.
### Fixed:
    - Fixed 'chosing fee asset to pay tx' example.
### Removed:
    - Removed rpc folder from API as rpc definitions is available through types/interface/definition.
## [1.3.0](https://github.com/cennznet/api.js/compare/1.3.0-alpha.1.../1.3.0) (24/11/2020)
### Added:
    -  Bump semantic-release from 15.14.0 to 17.2.3
    -  Metadata documentation added at docs/cennznet, including the output of errors from metadata.
### Changed:
    - Update all examples to use latest system.account queries (instead of system.accountNonce), latest dependency packages and removed resolution.
## [1.3.0-alpha.1](https://github.com/cennznet/api.js/compare/release/1.2.1.../1.3.0-alpha.1) (23/10/2020)
Polkadot's changelog at [2.3.1](https://github.com/polkadot-js/api/blob/master/CHANGELOG.md#231-oct-19-2020)
### Added:
    - Bump http-proxy from 1.18.0 to 1.18.1
### Changed:
    - Updated the codebase to use the current latest polkadot dependencies (^2.3.1 as of now)
    - Used eslint over tslint
### Removed:
    - Removed wallet support and all crml packages
    - Removed doughnut support
### Fixed:
    - Fixed forceUnbond test race condition
    - Fixed yarn lint command

## [1.2.1](https://github.com/cennznet/api.js/compare/release/1.2.0...release/1.2.1) (18/08/2020)
### Fixed:
    - Fix API initialisation issue by moving derived types(interfaces) to a separate file

## [1.2.0](https://github.com/cennznet/api.js/compare/release/1.1.1...release/1.2.0) (17/08/2020)
### Added:
    - Bump prismjs from 1.19.0 to 1.21.0
    - Support for derived staking query (api.derive.staking.accountInfo)
    - Support for derived session query (api.derive.session.keyInfo)
### Fixed:
    - Fix GA lock query when an account is staked

## [1.1.1](https://github.com/cennznet/api.js/compare/release/1.1.0...release/1.1.1) (03/08/2020)
### Changed
- bump elliptic from 6.5.2 to 6.5.3

## [1.1.0](https://github.com/cennznet/api.js/compare/release/1.0.3...release/1.1.0) (31/07/2020)
  Add doughnut + CENNZnut support and e2e tests

## [1.0.3](https://github.com/cennznet/api.js/compare/release/1.0.2...release/1.0.3) (13/07/2020)

**Note:** Version bump only

## [1.0.2](https://github.com/cennznet/api.js/compare/release/1.0.1...release/1.0.2) (15/05/2020)

**Note:** Version bump only

## [1.0.1](https://github.com/cennznet/api.js/compare/release/1.0.0...release/1.0.1) (27/03/2020)

**Note:** Version bump only

## [1.0.0](https://github.com/cennznet/api.js/compare/v0.20.5...release/1.0.0) (27/03/2020)
  Discontinued support for pre-1.0.0 CENNZnet chains
  Changed (breaking):
    - Replaced @plugnet/* dependencies with @polkadot/api@0.96.1 directly
    - Disabled plugins
    - Use @polkadot/api 1.1.1

# [0.20.6](https://github.com/cennznet/api.js/compare/v20.3...v0.20.6) (2019-09-10)
### Feature
* migrate crml-attestation into monorepo

### Bug Fixes
* fix ExtrinsicSignature#sign() when feeExchange is set (#47)
* fix ExtrinsicSignature#sign() when no doughnut and feeExchange set (#46)


# [0.20.0](https://github.com/cennznet/api.js/compare/v0.15.1...v0.20.3) (2019-09-10)
* Upgrade to `@plugnet/api@0.90.x`


### Breaking Change
* Api.create() doesn't accept provider, pass {provider: ..} instead
* `@cennznet/crml-*` are direct dependencies, not peer dependencies any more
* WsProvider is no longer exported. pass url string to provider directly.
* SubmittableResult is no longer exported from `@cennznet/api/polkadot`, use it from ``@cennznet/api` instead.
* Doughnut and and FeeExchangeOption need to be passed as part of SignerOptions as well
* AnyAddress and AnyAssetId are moved to `@cennznet/types/types`
* `@cennznet/types/polkadot.types` are moved to `@cennznet/types/types`
* `@cennznet/types/polkadot` are moved to `@cennznet/types`
* `@cennznet/api/polkadot.types` are moved to `@cennznet/api/types`
* The rest breaking changes please check https://github.com/polkadot-js/api/blob/master/UPGRADING.md
  

# [0.14.0](https://github.com/cennznet/api.js/compare/v0.13.6...v0.14.0) (2019-06-18)

### Breaking(comes with @plugnet/keyring v0.93.100)
* External pair interface for keyring has been changed. Instead of
  * `getMeta` use the `meta` getter, i.e. `console.log(pair.meta.name)`
  * `address` use the `address` getter, i.e. `console.log(pair.address)`
  * `publicKey` use the `publicKey` getter, i.e. `console.log(pair.publicKey)`
* `Move decodeAddress`, `encodeAddress` & `setAddressPrefix` functions into `@plugnet/util-crypto` from `@plugnet/keyring`. External interfaces should not be affected at this point since it is also (still) exported and exposed on keyring


### Dependency update
* upgrade @plugnet/api from v0.78.100 to v0.81.100
* upgrade @plugnet/common from v0.90.100 to v0.93.100
* upgrade @plugnet/wasm-crypto to v0.11.100


### Bug Fixes

* CennznetExtrinsic encoding issue ([#16](https://github.com/cennznet/api.js/issues/16)) ([e81b641](https://github.com/cennznet/api.js/commit/e81b641)), closes [#17](https://github.com/cennznet/api.js/issues/17)


### Features

* handle protocol of provider url ([#10](https://github.com/cennznet/api.js/issues/10)) ([37b4d61](https://github.com/cennznet/api.js/commit/37b4d61))
* Plugin Injection interface improvement([#14](https://github.com/cennznet/api.js/issues/14)) ([a95f6d4](https://github.com/cennznet/api.js/commit/a95f6d4))
* reject if the connection fail, add timeout ([#13](https://github.com/cennznet/api.js/issues/13)) ([9d743df](https://github.com/cennznet/api.js/commit/9d743df))





## [0.13.5]() (2019-05-24)


### Bug Fixes

* await crypto ready in wallet and keyring ([4171cb5]()), closes [#96]()





## [0.13.4]() (2019-05-21)

**Note:** Version bump only for package root





## [0.13.3]() (2019-05-21)


### Bug Fixes

* fix fstream version per yarn audit ([9844e67]())


### Features

* export WsProvider, HttpProvider and SubmittableResult from @cennznet/api ([7e08d3c]())





## [0.13.2]() (2019-05-16)


### Bug Fixes

* move Alias after options.types to avoid missing types ([3d99922]())





## [0.13.1]() (2019-05-10)


### Bug Fixes

* move staticMetadata under src/ ([dc07068]())





# [0.13.0]() (2019-05-10)


### Bug Fixes

* checkDoughnut and checkFeeExchange in ExtrinsicSignature.ts ([d3161a8]()), closes [#88]()


### Dependency update

* upgrade to @plugnet/api v0.78.100 ([3b50371]()), closes [#90]()


### Features

* prebundle metadata ([3b481af]()), closes [#87]()





## [0.12.3]() (2019-05-07)

**Note:** Version bump only for package root





## [0.12.2]() (2019-05-07)


### Bug Fixes

* d.ts missing when pack ([64cb289]())





## [0.12.1]() (2019-05-06)


### Bug Fixes

* yarn audit ([f768cb2]())


### Features

* @cennznet/util add parseUnits and formatUnits ([448413b]()), closes [#73]()





# [0.12.0]() (2019-04-30)


### Dependency update

* upgrade to @plugnet/api v0.77.101(@polkadot/api v0.77.1) ([6e53046]())
* **0.77.101**  
Support Metadata v4, which introduces the use of a custom hasher to hash storage map keys.
Add TresuryProposal (not the same as democracy, type aliassed)




## [0.11.2]() (2019-04-29)


### Bug Fixes

* special treatment in SignaturePayload for doughnut and feeExchange ([9d568f4]())





## [0.11.1]() (2019-04-24)

**Note:** Version bump only for package root





# [0.11.0]() (2019-04-17)


### Dependency update

* update polkadotjs v0.52.1 to plugnetjs v0.76.102
  * **0.76.102**  
Adding support for DoubleMap in Metadata
Caching improvements (duplicate queries, no duplicate subscriptions)
Experimental contract API
Update @polkadot/keyring to enable Alice's stash account on dev chains
Update @polkadot/util-crypto with smaller footprint   
  * **0.75.1**  
Start journey to 1.0   
  * **0.53.1**  
Change spelling to US English as per substrate master (1.0-rc1). Breaking changes as a result:
  For extrinsic status results, if you have checked the type returns, i.e. result.type === 'Finalised' now check on the status for result.status.isFinalized or result.status.isBroadcast, ... (the type property is now accessible only on result.status.type)
  If using subscribeFinalisedHeads update this to subscribeFinalizedHeads (likewise getFinalisedHead should be updated to getFinalizedHead and derive.bestNumberFinalized)
The underlying ss58 addess checksums have changed in the keyring along with the latest specs
All examples have been updated with sr25519 addresses (with the new checksums)    
  * **0.49.1**  
Fix large message signing on non-known nodes (default is now hashing, there has been enough time between upgrades)    
  * **0.48.1**  
Pull in new sr25519 capable keyring for dev nodes  
When using dev mode, it assumes that the node is the latest with derived sr25519 keys  


### Bug Fixes

* ga type in ApiRx ([0ec0b38]()), closes [#72]()
* missing deps ([6248afe]()), closes [#71]()


### Features

* [@cennznet/wallet]add addFromUri in SimpleKeyring([b968af9]())
* [@cennznet/types]allow to add alias for type ([84497e9]())


### BREAKING CHANGES

* Using sr25519 as default keyring type instead of ed25519.
* Using uri to generate toy keyPairs and test keyPairs now instead of using seed.
* Change spelling to US English as per substrate master (1.0-rc1). Breaking changes as a result:
  * After sending extrinsic, the signature of subscribe callback is changed. Now checking result status using `result.status.isFinalized` instead of `result.type === 'Finalised'`.
  * If using subscribeFinalisedHeads update this to subscribeFinalizedHeads (likewise getFinalisedHead should be updated to getFinalizedHead and derive.bestNumberFinalized)




## [0.10.2]() (2019-04-11)

**Note:** Version bump only for package root





## [0.10.1]() (2019-04-11)


### Features

* load and inject crml plugins from @cennznet/crml-* ([43c88d3]()), closes [#67]()





# 0.10.0 (2019-04-02)


### Dependency update

* update polkadot from 0.48.0-beta.1 to 0.52.1 ([07b04ff]())  
  * **0.52.1**  
Support queries to linked mapped storage (found in new staking interfaces)  
Add derive.staking.controllers to retrieve all active staking controllers  
Align types as per latest substrate master  
PeerInfo from system_peers does not have the index field anymore (dropped in substrate)  
Allow parsing of V3 metadata with DoubleMap support  
Check for single instances for api and types as they are loaded (assertSingletonPackage)    
  * **0.51.1**  
Support metadata V2 as per latest substrate master  
Update metadata with new types as per lastest substrate master    
  * **0.50.1**  
Lastest util-crypto (usage of WASM with JS fallbacks if not available)  
Update upstream @polkadot dependencies (for new crypto)    
  * **0.49.1**  
Fix large message signing on non-known nodes (default is now hashing, there has been enough time between upgrades)    
  * **0.48.1**  
Pull in new sr25519 capable keyring for dev nodes  
When using dev mode, it assumes that the node is the latest with derived sr25519 keys  



## [0.9.2]() (2019-03-19)


### Features

* add estimateFee and estimateFeeAt(blockHash) ([3edf690]()), closes [#58]()



## [0.9.1]() (2019-03-18)


### Features

* put generateStorageDoubleMapKey in @cennznet/util ([ee97b0e]())



## [0.8.3]() (2019-03-11)


### Bug Fixes

* mkdocs ([d63dac6]()), closes [#56]()
* new types for ga ([1238df1]()), closes [#55]()



## [0.8.1]() (2019-03-08)


### Bug Fixes

* type import from @cennznet/types ([302b6f9]())
* type re-export ([cb91490]())



## [0.7.7]() (2019-03-05)


### Features

* add cennzx's type ([c8c351c]()), closes [#49]()



## [0.7.6]() (2019-03-05)


### Bug Fixes

* a wrong import in Sylo's type ([89c4880]())



## [0.7.5]() (2019-03-04)


### Features

* Add Sylo runtime types ([79af3d6]()), closes [#48]()
* expose ApiRx in cennznet-api ([bb87a8c]()), closes [#47]()



## [0.7.3]() (2019-02-25)


### Features

* add runtime type `Amount` ([92edd99]()), closes [#45]()



## [0.7.1]() (2019-02-14)


### Bug Fixes

* _accountKeyringMap is empty after wallet restore ([3c77eb0]()), closes [#40]() [#DK-74]()
* update to polkadot v0.42.18 and fix compatibility ([9d87600]()), closes [#42]()



# 0.7.0 (2019-02-14)


### Bug Fixes

* _accountKeyringMap is empty after wallet restore ([3c77eb0]()), closes [#40]() [#DK-74]()
* update to polkadot v0.42.18 and fix compatibility ([9d87600]()), closes [#42]()


### BREAKING CHANGES

* Changed additionalTypes to types in ApiOptions
* Querying and transaction sending with callback now returns unsubscribe function instead of unsubscribe number.
```
v0.6.0:
const subscribeNumber = await api.query.runtimeName.methodName((result: any) => {})
await api.query.runtimeName.methodName.unsubscribe(subscribeNumber);
v0.7.0:
const unsubscribeFn = await api.query.runtimeName.methodName((result: any) => {})
unsubscribeFn();
``` 
* Now using signAndSend() instead of send() to sign an send transaction
```
v0.6.0:
await api.tx.runtimeName.methodName(arg).send({from: address, blockHash, nonce});
v0.7.0:
await api.tx.runtimeName.methodName(arg).signAndSend(address, {blockHash, nonce});
```



# 0.6.0 (2019-02-07)


### Bug Fixes

* update unit test cases ([bbf5b98]()), closes [#39]()


### Features

* update polkadot version v0.42.2 ([0f8a3b4]()), closes [#37]()



## 0.5.8 (2019-02-04)


### Bug Fixes

* export Topic and Value in runtime-types ([568fe09]())



## 0.5.7 (2019-02-01)


### Features

* 🎸 Added new runtime type for Attestation module ([c3a4708]()), closes [#36]()



## 0.5.6 (2019-01-31)


### Bug Fixes

* 🐛 fix the files in package.json for runtime-types ([875c0f1]()), closes [#35]()
* Change total_supply in AssetOption.ts to use camel-case ([c088632]()), closes [#33]()



## 0.5.3 (2019-01-23)



## 0.5.2 (2019-01-22)



## 0.5.1 (2019-01-22)



# 0.5.0 (2019-01-22)


### Features

* Add new runtime type 'AssetOptions'. ([ea7a8b3]()), closes [#25]()
* adding unit test for SubmittableExtrinsic and filterEvents ([7affd78]()), closes [#23]()
* dk17 - Avoid user perform lock() on any key pair get from wallet ([6d0f9d9]()), closes [#27]()
* upgrade to polkadot v0.39.7 ([1d79190]()), closes [#DK-45]() [#22]()



# 0.3.0 (2019-01-08)


### Features

* add createNewVaultAndRestore on wallet ([bbdb1c9]()), closes [#DK-10]() [#21]()
* upgrade polkadotjs to 0.35.19 ([cf77fa8]()), closes [#DK-23]() [#20]()



# 0.2.0 (2019-01-04)


### Bug Fixes

* export keyring classes ([cad2248]()), closes [#17]()
* remove change log from docs ([34f09a6]()), closes [#16]()


### Features

* wallet support multiple keyrings and use HDKeyring as default ([d472f3f]()), closes [#DK-10]() [#DK-22]() [#15]()



## 0.1.1 (2018-12-27)



# 0.1.0 (2018-12-20)


### Features

* allow lock/unlock the wallet ([2fa4113]()), closes [#DK-14]() [#8]()
* setup developement pipeline ([06279cc]()), closes [#9]()
* setup jenkins pr pipeline; setup yarn audit, lint, prettier stages ([35ba99b]()), closes [#6]()
* support cennznet runtime types ([2978e6e]()), closes [#10]()
