---
 Attestation
---

The following sections contain the module details. 

 
# Derive queries

- **interface**: api.derive.attestation.function_name
# Module: attestation/getClaim


## Functions

### getClaim

▸ **getClaim**(`holder`: `string`, `issuer`: `string`, `topic`: `string`) => `Observable`<[`Claim`](attestation_types.md#claim)\>

Retrieve a single claim made about a holder by the given issuer on a given topic.


##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `holder` | `string` | The claim holder address |
| `issuer` | `string` | The claim issuer address |
| `topic` | `string` | The claim topic |

##### Returns

`Observable`<[`Claim`](attestation_types.md#claim)\>

#### Defined in

[packages/api/src/derives/attestation/getClaim.ts:33](https://github.com/cennznet/api.js/blob/d167385/packages/api/src/derives/attestation/getClaim.ts#L33)

# Module: attestation/getClaims


## Functions

### getClaims

▸ **getClaims**(`holder`: `string`, `issuers`: `string`[], `topics`: `string`[]) => `Observable`<[`Claim`](attestation_types.md#claim)[]\>

Get all claims made about a holder by the given issuers on the given topics.


| Name | Type | Description |
| :------ | :------ | :------ |
| `holder` | `string` | The claims' holder address |
| `issuers` | `string`[] | A list of claim issuer addresses to include |
| `topics` | `string`[] | A list of claim topics to include |

##### Returns

`Observable`<[`Claim`](attestation_types.md#claim)[]\>

#### Defined in

[packages/api/src/derives/attestation/getClaims.ts:29](https://github.com/cennznet/api.js/blob/d167385/packages/api/src/derives/attestation/getClaims.ts#L29)

# Module: attestation/types


### Type aliases

- [Claim](attestation_types.md#claim)

## Type aliases

### Claim

Ƭ **Claim**: `Object`

A cryptographic claim about a holder address made by another issuing address.
The claim is made on a certain `topic` with some `value`
An alias for `AttestationValue`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `holder` | `string` |
| `issuer` | `string` |
| `topic` | `string` |
| `value` | `AttestationValue` |

#### Defined in

[packages/api/src/derives/attestation/types.ts:22](https://github.com/cennznet/api.js/blob/d167385/packages/api/src/derives/attestation/types.ts#L22)
