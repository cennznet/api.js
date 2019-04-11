# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.10.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.10.0...v0.10.1) (2019-04-11)


### Features

* load and inject crml plugins from @cennznet/crml-* ([43c88d3](https://bitbucket.org/centralitydev/cennznet-js/commits/43c88d3)), closes [#67](https://bitbucket.org/centralitydev/cennznet-js/issue/67)





# 0.10.0 (2019-04-02)


### Dependency update

* update polkadot from 0.48.0-beta.1 to 0.52.1 ([07b04ff](https://bitbucket.org/centralitydev/cennznet-js/commits/0e6aa40))  
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



## [0.9.2](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.9.1...v0.9.2) (2019-03-19)


### Features

* add estimateFee and estimateFeeAt(blockHash) ([3edf690](https://bitbucket.org/centralitydev/cennznet-js/commits/3edf690)), closes [#58](https://bitbucket.org/centralitydev/cennznet-js/issue/58)



## [0.9.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.9.0...v0.9.1) (2019-03-18)


### Features

* put generateStorageDoubleMapKey in @cennznet/util ([ee97b0e](https://bitbucket.org/centralitydev/cennznet-js/commits/ee97b0e))



## [0.8.3](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.8.2...v0.8.3) (2019-03-11)


### Bug Fixes

* mkdocs ([d63dac6](https://bitbucket.org/centralitydev/cennznet-js/commits/d63dac6)), closes [#56](https://bitbucket.org/centralitydev/cennznet-js/issue/56)
* new types for ga ([1238df1](https://bitbucket.org/centralitydev/cennznet-js/commits/1238df1)), closes [#55](https://bitbucket.org/centralitydev/cennznet-js/issue/55)



## [0.8.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.8.0...v0.8.1) (2019-03-08)


### Bug Fixes

* type import from @cennznet/types ([302b6f9](https://bitbucket.org/centralitydev/cennznet-js/commits/302b6f9))
* type re-export ([cb91490](https://bitbucket.org/centralitydev/cennznet-js/commits/cb91490))



## [0.7.7](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.7.6...v0.7.7) (2019-03-05)


### Features

* add cennzx's type ([c8c351c](https://bitbucket.org/centralitydev/cennznet-js/commits/c8c351c)), closes [#49](https://bitbucket.org/centralitydev/cennznet-js/issue/49)



## [0.7.6](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.7.5...v0.7.6) (2019-03-05)


### Bug Fixes

* a wrong import in Sylo's type ([89c4880](https://bitbucket.org/centralitydev/cennznet-js/commits/89c4880))



## [0.7.5](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.7.4...v0.7.5) (2019-03-04)


### Features

* Add Sylo runtime types ([79af3d6](https://bitbucket.org/centralitydev/cennznet-js/commits/79af3d6)), closes [#48](https://bitbucket.org/centralitydev/cennznet-js/issue/48)
* expose ApiRx in cennznet-api ([bb87a8c](https://bitbucket.org/centralitydev/cennznet-js/commits/bb87a8c)), closes [#47](https://bitbucket.org/centralitydev/cennznet-js/issue/47)



## [0.7.3](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.7.2...v0.7.3) (2019-02-25)


### Features

* add runtime type `Amount` ([92edd99](https://bitbucket.org/centralitydev/cennznet-js/commits/92edd99)), closes [#45](https://bitbucket.org/centralitydev/cennznet-js/issue/45)



## [0.7.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.6.0...v0.7.1) (2019-02-14)


### Bug Fixes

* _accountKeyringMap is empty after wallet restore ([3c77eb0](https://bitbucket.org/centralitydev/cennznet-js/commits/3c77eb0)), closes [#40](https://bitbucket.org/centralitydev/cennznet-js/issue/40) [#DK-74](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-74)
* update to polkadot v0.42.18 and fix compatibility ([9d87600](https://bitbucket.org/centralitydev/cennznet-js/commits/9d87600)), closes [#42](https://bitbucket.org/centralitydev/cennznet-js/issue/42)



# 0.7.0 (2019-02-14)


### Bug Fixes

* _accountKeyringMap is empty after wallet restore ([3c77eb0](https://bitbucket.org/centralitydev/cennznet-js/commits/3c77eb0)), closes [#40](https://bitbucket.org/centralitydev/cennznet-js/issue/40) [#DK-74](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-74)
* update to polkadot v0.42.18 and fix compatibility ([9d87600](https://bitbucket.org/centralitydev/cennznet-js/commits/9d87600)), closes [#42](https://bitbucket.org/centralitydev/cennznet-js/issue/42)


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

* update unit test cases ([bbf5b98](https://bitbucket.org/centralitydev/cennznet-js/commits/bbf5b98)), closes [#39](https://bitbucket.org/centralitydev/cennznet-js/issue/39)


### Features

* update polkadot version v0.42.2 ([0f8a3b4](https://bitbucket.org/centralitydev/cennznet-js/commits/0f8a3b4)), closes [#37](https://bitbucket.org/centralitydev/cennznet-js/issue/37)



## 0.5.8 (2019-02-04)


### Bug Fixes

* export Topic and Value in runtime-types ([568fe09](https://bitbucket.org/centralitydev/cennznet-js/commits/568fe09))



## 0.5.7 (2019-02-01)


### Features

* 🎸 Added new runtime type for Attestation module ([c3a4708](https://bitbucket.org/centralitydev/cennznet-js/commits/c3a4708)), closes [#36](https://bitbucket.org/centralitydev/cennznet-js/issue/36)



## 0.5.6 (2019-01-31)


### Bug Fixes

* 🐛 fix the files in package.json for runtime-types ([875c0f1](https://bitbucket.org/centralitydev/cennznet-js/commits/875c0f1)), closes [#35](https://bitbucket.org/centralitydev/cennznet-js/issue/35)
* Change total_supply in AssetOption.ts to use camel-case ([c088632](https://bitbucket.org/centralitydev/cennznet-js/commits/c088632)), closes [#33](https://bitbucket.org/centralitydev/cennznet-js/issue/33)



## 0.5.3 (2019-01-23)



## 0.5.2 (2019-01-22)



## 0.5.1 (2019-01-22)



# 0.5.0 (2019-01-22)


### Features

* Add new runtime type 'AssetOptions'. ([ea7a8b3](https://bitbucket.org/centralitydev/cennznet-js/commits/ea7a8b3)), closes [#25](https://bitbucket.org/centralitydev/cennznet-js/issue/25)
* adding unit test for SubmittableExtrinsic and filterEvents ([7affd78](https://bitbucket.org/centralitydev/cennznet-js/commits/7affd78)), closes [#23](https://bitbucket.org/centralitydev/cennznet-js/issue/23)
* dk17 - Avoid user perform lock() on any key pair get from wallet ([6d0f9d9](https://bitbucket.org/centralitydev/cennznet-js/commits/6d0f9d9)), closes [#27](https://bitbucket.org/centralitydev/cennznet-js/issue/27)
* upgrade to polkadot v0.39.7 ([1d79190](https://bitbucket.org/centralitydev/cennznet-js/commits/1d79190)), closes [#DK-45](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-45) [#22](https://bitbucket.org/centralitydev/cennznet-js/issue/22)



# 0.3.0 (2019-01-08)


### Features

* add createNewVaultAndRestore on wallet ([bbdb1c9](https://bitbucket.org/centralitydev/cennznet-js/commits/bbdb1c9)), closes [#DK-10](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-10) [#21](https://bitbucket.org/centralitydev/cennznet-js/issue/21)
* upgrade polkadotjs to 0.35.19 ([cf77fa8](https://bitbucket.org/centralitydev/cennznet-js/commits/cf77fa8)), closes [#DK-23](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-23) [#20](https://bitbucket.org/centralitydev/cennznet-js/issue/20)



# 0.2.0 (2019-01-04)


### Bug Fixes

* export keyring classes ([cad2248](https://bitbucket.org/centralitydev/cennznet-js/commits/cad2248)), closes [#17](https://bitbucket.org/centralitydev/cennznet-js/issue/17)
* remove change log from docs ([34f09a6](https://bitbucket.org/centralitydev/cennznet-js/commits/34f09a6)), closes [#16](https://bitbucket.org/centralitydev/cennznet-js/issue/16)


### Features

* wallet support multiple keyrings and use HDKeyring as default ([d472f3f](https://bitbucket.org/centralitydev/cennznet-js/commits/d472f3f)), closes [#DK-10](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-10) [#DK-22](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-22) [#15](https://bitbucket.org/centralitydev/cennznet-js/issue/15)



## 0.1.1 (2018-12-27)



# 0.1.0 (2018-12-20)


### Features

* allow lock/unlock the wallet ([2fa4113](https://bitbucket.org/centralitydev/cennznet-js/commits/2fa4113)), closes [#DK-14](https://bitbucket.org/centralitydev/cennznet-js/issue/DK-14) [#8](https://bitbucket.org/centralitydev/cennznet-js/issue/8)
* setup developement pipeline ([06279cc](https://bitbucket.org/centralitydev/cennznet-js/commits/06279cc)), closes [#9](https://bitbucket.org/centralitydev/cennznet-js/issue/9)
* setup jenkins pr pipeline; setup yarn audit, lint, prettier stages ([35ba99b](https://bitbucket.org/centralitydev/cennznet-js/commits/35ba99b)), closes [#6](https://bitbucket.org/centralitydev/cennznet-js/issue/6)
* support cennznet runtime types ([2978e6e](https://bitbucket.org/centralitydev/cennznet-js/commits/2978e6e)), closes [#10](https://bitbucket.org/centralitydev/cennznet-js/issue/10)
