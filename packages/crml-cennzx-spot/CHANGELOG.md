# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.20.0](https://github.com/cennznet/crml-cennzx-spot.js) (2019-09-10)
* Upgrade to `@plugnet/api@0.90.x`


### Breaking Change
* CennzxSpot.create() and CennzxSpotRx.create() are removed, they are not meant to be instantiated manually.
* cennzxSpot.ga and cennzxSpotRx.ga are removed, use `cennzxSpot.api.genericAsset` instead.


# [0.8.0](https://github.com/cennznet/crml-cennzx-spot.js/compare/v0.7.2...v0.8.0) (2019-07-29)


### Features

* Added support required for remove liquidity parameter ([#16](https://github.com/cennznet/crml-cennzx-spot.js/issues/16)) ([9a52324](https://github.com/cennznet/crml-cennzx-spot.js/commit/9a52324)), closes [#17](https://github.com/cennznet/crml-cennzx-spot.js/issues/17)

## [0.7.2](https://github.com/cennznet/crml-cennzx-spot.js/compare/v0.7.1...v0.7.2) (2019-07-19)


### Bug Fixes

* allow input price calculation of any amount of input data ([#15](https://github.com/cennznet/crml-cennzx-spot.js/issues/15)) ([fda092a](https://github.com/cennznet/crml-cennzx-spot.js/commit/fda092a))



## [0.7.1](https://github.com/cennznet/crml-cennzx-spot.js/compare/v0.6.1...v0.7.1) (2019-07-15)



## [0.6.1](https://github.com/cennznet/crml-cennzx-spot.js/compare/v0.6.0...v0.6.1) (2019-07-11)


### Bug Fixes

* adapt to ga v0.9.0 ([3148c79](https://github.com/cennznet/crml-cennzx-spot.js/commit/3148c79))
* input price as per cennznet crml formula ([#12](https://github.com/cennznet/crml-cennzx-spot.js/issues/12)) ([d434eff](https://github.com/cennznet/crml-cennzx-spot.js/commit/d434eff)), closes [cennznet/cennznet#38](https://github.com/cennznet/cennznet/issues/38)



# [0.6.0](https://github.com/cennznet/crml-cennzx-spot.js/compare/v0.5.6...v0.6.0) (2019-07-02)


### Features

* add pool balance query ([#8](https://github.com/cennznet/crml-cennzx-spot.js/issues/8)) ([426334c](https://github.com/cennznet/crml-cennzx-spot.js/commit/426334c))



## [0.5.5](https://bitbucket.org/centralitydev/cennznet-js-spotx/compare/v0.5.4...v0.5.5) (2019-05-21)

**Note:** Version bump only for package root





## [0.5.4](https://bitbucket.org/centralitydev/cennznet-js-spotx/compare/v0.5.0...v0.5.4) (2019-05-20)


### Bug Fixes

* assert error in constructor ([1234657](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/1234657))
* yarn audit issue ([5e33315](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/5e33315))


### Features

* constructor of CennzxSpot(Rx) are now public, and throw Error if used in wrong order ([ed8fa50](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/ed8fa50)), closes [#23](https://bitbucket.org/centralitydev/cennznet-js-spotx/issue/23)
* query of Input/OutputPrice ([e2ea9cc](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/e2ea9cc)), closes [#20](https://bitbucket.org/centralitydev/cennznet-js-spotx/issue/20)





## [0.5.3](https://bitbucket.org/centralitydev/cennznet-js-spotx/compare/v0.5.0...v0.5.3) (2019-05-06)

**Note:** Version bump only for package root





## [0.5.2](https://bitbucket.org/centralitydev/cennznet-js-spotx/compare/v0.5.1...v0.5.2) (2019-05-06)

**Note:** Version bump only for package root





## [0.5.1](https://bitbucket.org/centralitydev/cennznet-js-spotx/compare/v0.5.0...v0.5.1) (2019-05-06)

**Note:** Version bump only for package root





# [0.5.0](https://bitbucket.org/centralitydev/cennznet-js-spotx/compare/v0.4.0...v0.5.0) (2019-05-05)


### Features

* changes/update as module code refactored ([b82f66f](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/b82f66f)), closes [#13](https://bitbucket.org/centralitydev/cennznet-js-spotx/issue/13)
* rename cennzx module to cennzxSpot ([732b2f5](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/732b2f5)), closes [#11](https://bitbucket.org/centralitydev/cennznet-js-spotx/issue/11)
* rename with crml- prefix and expose as a plugin ([20fb126](https://bitbucket.org/centralitydev/cennznet-js-spotx/commits/20fb126)), closes [#14](https://bitbucket.org/centralitydev/cennznet-js-spotx/issue/14)
