---
 Attestation
---

The following sections contain the module details. 

- **[Storage](#Storage)**

- **[Extrinsic](#Extrinsic)**

- **[Errors](#Error)**

- **[Events](#Events)**

 
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
 
# Events
 
### ClaimCreated(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)
 
### ClaimRemoved(`AccountId`, `AccountId`, `AttestationTopic`)
 
### ClaimUpdated(`AccountId`, `AccountId`, `AttestationTopic`, `AttestationValue`)
 
# RPC
