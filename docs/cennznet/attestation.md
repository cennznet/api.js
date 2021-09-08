---
 Attestation
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

- **[Derive queries](#derive-queries)**

 
# Storage
 
### issuers(`AccountId`): `Vec<AccountId>`
- **interface**: `api.query.attestation.issuers`
- **summary**:   A map from holders to all their attesting issuers 
 
### topics(`(AccountId,AccountId)`): `Vec<AttestationTopic>`
- **interface**: `api.query.attestation.topics`
- **summary**:   A map from (holder, issuer) to attested topics 
 
### values(`(AccountId,AccountId,AttestationTopic)`): `AttestationValue`
- **interface**: `api.query.attestation.values`
- **summary**:   A map from (holder, issuer, topic) to attested values 
 
# Extrinsic
 
### removeClaim(holder: `AccountId`, topic: `AttestationTopic`)
- **interface**: `api.tx.attestation.removeClaim`
- **summary**:   Remove a claim, only the original issuer can remove a claim If the `issuer` has not yet issued a claim of `topic`, this function will return error. 
 
### setClaim(holder: `AccountId`, topic: `AttestationTopic`, value: `AttestationValue`)
- **interface**: `api.tx.attestation.setClaim`
- **summary**:   Create or update an existing claim The `issuer` of the claim comes from the extrinsic `origin` The `topic` and `value` are both U256 which can hold any 32-byte encoded data. 
 
# Error
 
### TopicNotRegistered
 
# Events
 
### ClaimCreated(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)
 
### ClaimRemoved(`AccountId`, `AccountId`, `AttestationTopic`)
 
### ClaimUpdated(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)
 
# RPC
 
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

[packages/api/src/derives/attestation/getClaim.ts:33](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/attestation/getClaim.ts#L33)

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

[packages/api/src/derives/attestation/getClaims.ts:29](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/attestation/getClaims.ts#L29)

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

[packages/api/src/derives/attestation/types.ts:22](https://github.com/cennznet/api.js/blob/476c3e9/packages/api/src/derives/attestation/types.ts#L22)
