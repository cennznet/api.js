# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.20.0](https://github.com/cennznet/api.js) (2019-09-13)
* Upgrade to `@plugnet/api@0.90.x`


### Breaking Change
* Sdk doesn't strip zeros for AttestationValue any more
* AttestationValue is H256, not suggesting passing a shorten hex since the direction of filling zeros might not be what you expected.
* api.attestation.getClaims is marked as @deprecated and will be removed in the following releases, use api.attestation.getClaimList instead
* setClaim() is not going to fail if value is not hex string.
