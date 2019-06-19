# CENNZNet Util

Utils for CENNZNet

### Functions

* [formatUnits](_cennznet_util.md#formatunits)
* [isSafeInteger](_cennznet_util.md#issafeinteger)
* [parseUnits](_cennznet_util.md#parseunits)
* [stripEndZero](_cennznet_util.md#stripendzero)
* [toFixed](_cennznet_util.md#tofixed)

---

## Variables

<a id="integer"></a>

### `<Const>` INTEGER

**● INTEGER**: *`RegExp`* =  /^\d+$/

*Defined in [packages/util/src/is/integer.ts:15](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/is/integer.ts#L15)*

___
<a id="strip_zero"></a>

### `<Const>` STRIP_ZERO

**● STRIP_ZERO**: *`RegExp`* =  /^(.*?)(0*)$/

*Defined in [packages/util/src/format/stripEndZero.ts:17](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/format/stripEndZero.ts#L17)*

___

## Functions

<a id="formatunits"></a>

###  formatUnits

▸ **formatUnits**(unValue: *`BN` \| `number` \| `string`*, decimals: *`number`*): `string`

*Defined in [packages/util/src/unit/formatUnits.ts:25](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/unit/formatUnits.ts#L25)*

format a amount from unit `un` to decimals passed in.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| unValue | `BN` \| `number` \| `string` |  \- |
| decimals | `number` |   |

**Returns:** `string`

___
<a id="issafeinteger"></a>

###  isSafeInteger

▸ **isSafeInteger**(value: *`any`*): `boolean`

*Defined in [packages/util/src/is/integer.ts:30](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/is/integer.ts#L30)*

Check if the input is a integer

*__example__*:   

```javascript
import { isInteger } from '@cennznet/util';

console.log('isInteger', isInteger(123)); // => true
console.log('isInteger', isInteger(123456789012345678)); // => false
console.log('isInteger', isInteger('123')); // => true
console.log('isInteger', isInteger('12.3')); // => false
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="parseunits"></a>

###  parseUnits

▸ **parseUnits**(value: *`string` \| `number`*, decimals: *`number`*): `BN`

*Defined in [packages/util/src/unit/parseUnits.ts:27](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/unit/parseUnits.ts#L27)*

format a amount from unit `un` to decimals passed in.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `string` \| `number` |
| decimals | `number` |   |

**Returns:** `BN`

___
<a id="stripendzero"></a>

###  stripEndZero

▸ **stripEndZero**(value: *`string`*): `string`

*Defined in [packages/util/src/format/stripEndZero.ts:23](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/format/stripEndZero.ts#L23)*

trim all trailing zeros. return '' if only zero is passed in.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `string` |   |

**Returns:** `string`

___
<a id="tofixed"></a>

###  toFixed

▸ **toFixed**(x: *`number`*): `string`

*Defined in [packages/util/src/number/toFixed.ts:19](https://github.com/cennznet/api.js/blob/2ff9821/packages/util/src/number/toFixed.ts#L19)*

convert number to string, without science notion

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| x | `number` |   |

**Returns:** `string`

___

