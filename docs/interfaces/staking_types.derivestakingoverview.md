[@cennznet/api](../README.md) / [Exports](../modules.md) / [staking/types](../modules/staking_types.md) / DeriveStakingOverview

# Interface: DeriveStakingOverview

[staking/types](../modules/staking_types.md).DeriveStakingOverview

## Hierarchy

- `DeriveSessionIndexes`

  ↳ **`DeriveStakingOverview`**

## Table of contents

### Properties

- [activeEra](staking_types.derivestakingoverview.md#activeera)
- [activeEraStart](staking_types.derivestakingoverview.md#activeerastart)
- [currentEra](staking_types.derivestakingoverview.md#currentera)
- [currentIndex](staking_types.derivestakingoverview.md#currentindex)
- [nextElected](staking_types.derivestakingoverview.md#nextelected)
- [validatorCount](staking_types.derivestakingoverview.md#validatorcount)
- [validators](staking_types.derivestakingoverview.md#validators)

## Properties

### activeEra

• **activeEra**: `EraIndex`

#### Inherited from

DeriveSessionIndexes.activeEra

#### Defined in

node_modules/@polkadot/api-derive/session/types.d.ts:4

___

### activeEraStart

• **activeEraStart**: `Option`<`Moment`\>

#### Inherited from

DeriveSessionIndexes.activeEraStart

#### Defined in

node_modules/@polkadot/api-derive/session/types.d.ts:5

___

### currentEra

• **currentEra**: `EraIndex`

#### Inherited from

DeriveSessionIndexes.currentEra

#### Defined in

node_modules/@polkadot/api-derive/session/types.d.ts:6

___

### currentIndex

• **currentIndex**: `SessionIndex`

#### Inherited from

DeriveSessionIndexes.currentIndex

#### Defined in

node_modules/@polkadot/api-derive/session/types.d.ts:7

___

### nextElected

• **nextElected**: `AccountId`[]

#### Defined in

[packages/api/src/derives/staking/types.ts:29](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/types.ts#L29)

___

### validatorCount

• **validatorCount**: `u32`

#### Inherited from

DeriveSessionIndexes.validatorCount

#### Defined in

node_modules/@polkadot/api-derive/session/types.d.ts:8

___

### validators

• **validators**: `AccountId`[]

#### Defined in

[packages/api/src/derives/staking/types.ts:30](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/staking/types.ts#L30)
