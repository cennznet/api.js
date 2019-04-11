# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.10.1](https://bitbucket.org/centralitydev/cennznet-js/compare/v0.10.0...v0.10.1) (2019-04-11)


### Features

* load and inject crml plugins from @cennznet/crml-* ([43c88d3](https://bitbucket.org/centralitydev/cennznet-js/commits/43c88d3)), closes [#67](https://bitbucket.org/centralitydev/cennznet-js/issue/67)





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
