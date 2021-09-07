[@cennznet/api](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / EstimateFeeParams

# Interface: EstimateFeeParams

[types](../modules/types.md).EstimateFeeParams

## Hierarchy

- `Codec`

  ↳ **`EstimateFeeParams`**

## Table of contents

### Properties

- [createdAtHash](types.estimatefeeparams.md#createdathash)
- [encodedLength](types.estimatefeeparams.md#encodedlength)
- [extrinsic](types.estimatefeeparams.md#extrinsic)
- [hash](types.estimatefeeparams.md#hash)
- [isEmpty](types.estimatefeeparams.md#isempty)
- [maxPayment](types.estimatefeeparams.md#maxpayment)
- [registry](types.estimatefeeparams.md#registry)
- [userFeeAssetId](types.estimatefeeparams.md#userfeeassetid)

### Methods

- [eq](types.estimatefeeparams.md#eq)
- [toHex](types.estimatefeeparams.md#tohex)
- [toHuman](types.estimatefeeparams.md#tohuman)
- [toJSON](types.estimatefeeparams.md#tojson)
- [toRawType](types.estimatefeeparams.md#torawtype)
- [toString](types.estimatefeeparams.md#tostring)
- [toU8a](types.estimatefeeparams.md#tou8a)

## Properties

### createdAtHash

• `Optional` **createdAtHash**: `Hash`

**`description`** The block at which this value was retrieved/created (set to non-empty when retrieved from storage)

#### Inherited from

Codec.createdAtHash

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:43

___

### encodedLength

• `Readonly` **encodedLength**: `number`

**`description`** The length of the value when encoded as a Uint8Array

#### Inherited from

Codec.encodedLength

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:27

___

### extrinsic

• **extrinsic**: `SubmittableExtrinsic`<`ApiTypes`, `ISubmittableResult`\> \| `default`

#### Defined in

[packages/api/src/derives/types.ts:25](https://github.com/cennznet/api.js/blob/9d130bf/packages/api/src/derives/types.ts#L25)

___

### hash

• `Readonly` **hash**: `Hash`

**`description`** Returns a hash of the value

#### Inherited from

Codec.hash

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:31

___

### isEmpty

• `Readonly` **isEmpty**: `boolean`

**`description`** Checks if the value is an empty value

#### Inherited from

Codec.isEmpty

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:35

___

### maxPayment

• `Optional` **maxPayment**: `string`

#### Defined in

[packages/api/src/derives/types.ts:27](https://github.com/cennznet/api.js/blob/9d130bf/packages/api/src/derives/types.ts#L27)

___

### registry

• `Readonly` **registry**: `Registry`

**`description`** The registry associated with this object

#### Inherited from

Codec.registry

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:39

___

### userFeeAssetId

• **userFeeAssetId**: `string` \| `number`

#### Defined in

[packages/api/src/derives/types.ts:26](https://github.com/cennznet/api.js/blob/9d130bf/packages/api/src/derives/types.ts#L26)

## Methods

### eq

▸ **eq**(`other?`): `boolean`

**`description`** Compares the value of the input to see if there is a match

#### Parameters

| Name | Type |
| :------ | :------ |
| `other?` | `unknown` |

#### Returns

`boolean`

#### Inherited from

Codec.eq

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:47

___

### toHex

▸ **toHex**(`isLe?`): `string`

**`description`** Returns a hex string representation of the value. isLe returns a LE (number-only) representation

#### Parameters

| Name | Type |
| :------ | :------ |
| `isLe?` | `boolean` |

#### Returns

`string`

#### Inherited from

Codec.toHex

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:51

___

### toHuman

▸ **toHuman**(`isExtended?`): `AnyJson`

**`description`** Converts the Object to to a human-friendly JSON, with additional fields, expansion and formatting of information

#### Parameters

| Name | Type |
| :------ | :------ |
| `isExtended?` | `boolean` |

#### Returns

`AnyJson`

#### Inherited from

Codec.toHuman

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:55

___

### toJSON

▸ **toJSON**(): `AnyJson`

**`description`** Converts the Object to JSON, typically used for RPC transfers

#### Returns

`AnyJson`

#### Inherited from

Codec.toJSON

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:59

___

### toRawType

▸ **toRawType**(): `string`

**`description`** Returns the base runtime type name for this instance

#### Returns

`string`

#### Inherited from

Codec.toRawType

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:63

___

### toString

▸ **toString**(): `string`

**`description`** Returns the string representation of the value

#### Returns

`string`

#### Inherited from

Codec.toString

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:67

___

### toU8a

▸ **toU8a**(`isBare?`): `Uint8Array`

**`description`** Encodes the value as a Uint8Array as per the SCALE specifications

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isBare?` | `BareOpts` | true when the value has none of the type-specific prefixes (internal) |

#### Returns

`Uint8Array`

#### Inherited from

Codec.toU8a

#### Defined in

node_modules/@polkadot/types/types/codec.d.ts:72
