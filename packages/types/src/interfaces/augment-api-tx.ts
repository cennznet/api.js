// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Data } from '@polkadot/types';
import type { Bytes, Compact, Option, U256, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256, Perbill, Permill } from '@polkadot/types/interfaces/runtime';
import type { CennznetPrimitivesEthCryptoAppCryptoSignature, CennznetRuntimeOriginCaller, CennznetRuntimeSessionKeys, CrmlErc20PegErc20DepositEvent, CrmlEthBridgeNotarizationPayload, CrmlEthWalletEthereumEthereumSignature, CrmlGenericAssetAssetInfo, CrmlGenericAssetAssetOptions, CrmlGenericAssetPermissionsV1, CrmlNftMetadataScheme, CrmlNftRoyaltiesSchedule, CrmlStakingCompactAssignments, CrmlStakingElectionSize, CrmlStakingRewardDestination, CrmlStakingValidatorPrefs, EthereumTransactionTransactionV2, PalletIdentityBitFlags, PalletIdentityIdentityInfo, PalletIdentityJudgement, PalletImOnlineHeartbeat, PalletImOnlineSr25519AppSr25519Signature, SpConsensusBabeDigestsNextConfigDescriptor, SpConsensusSlotsEquivocationProof, SpFinalityGrandpaEquivocationProof, SpRuntimeHeader, SpSessionMembershipProof } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/submittable' {
  export interface AugmentedSubmittables<ApiType extends ApiTypes> {
    authorship: {
      /**
       * Provide a set of uncles.
       **/
      setUncles: AugmentedSubmittable<(newUncles: Vec<SpRuntimeHeader> | (SpRuntimeHeader | { parentHash?: any; number?: any; stateRoot?: any; extrinsicsRoot?: any; digest?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<SpRuntimeHeader>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    babe: {
      /**
       * Plan an epoch config change. The epoch config change is recorded and will be enacted on
       * the next call to `enact_epoch_change`. The config will be activated one epoch after.
       * Multiple calls to this method will replace any existing planned config change that had
       * not been enacted yet.
       **/
      planConfigChange: AugmentedSubmittable<(config: SpConsensusBabeDigestsNextConfigDescriptor | { V1: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpConsensusBabeDigestsNextConfigDescriptor]>;
      /**
       * Report authority equivocation/misbehavior. This method will verify
       * the equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence will
       * be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpConsensusSlotsEquivocationProof | { offender?: any; slot?: any; firstHeader?: any; secondHeader?: any } | string | Uint8Array, keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpConsensusSlotsEquivocationProof, SpSessionMembershipProof]>;
      /**
       * Report authority equivocation/misbehavior. This method will verify
       * the equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence will
       * be reported.
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpConsensusSlotsEquivocationProof | { offender?: any; slot?: any; firstHeader?: any; secondHeader?: any } | string | Uint8Array, keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpConsensusSlotsEquivocationProof, SpSessionMembershipProof]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    baseFee: {
      setBaseFeePerGas: AugmentedSubmittable<(fee: U256 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [U256]>;
      setElasticity: AugmentedSubmittable<(elasticity: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Permill]>;
      setIsActive: AugmentedSubmittable<(isActive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cennzx: {
      /**
       * Deposit core asset and trade asset at current ratio to mint liquidity
       * Returns amount of liquidity minted.
       * 
       * `origin`
       * `asset_id` - The trade asset ID
       * `min_liquidity` - The minimum liquidity to add
       * `asset_amount` - Amount of trade asset to add
       * `core_amount` - Amount of core asset to add
       **/
      addLiquidity: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, minLiquidity: Compact<u128> | AnyNumber | Uint8Array, maxAssetAmount: Compact<u128> | AnyNumber | Uint8Array, coreAmount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u128>, Compact<u128>, Compact<u128>]>;
      /**
       * Buy `asset_to_buy` with `asset_to_sell`.
       * Caller specifies an exact `buy_amount` and a `maximum_sell` amount to pay.
       * 
       * `recipient` - Account to receive assets, defaults to `origin` if None
       * `asset_to_sell` - asset ID to sell
       * `asset_to_buy` - asset ID to buy
       * `buy_amount` - The amount of `asset_to_buy` to receive
       * `maximum_sell` - Maximum `asset_to_sell` caller should pay
       **/
      buyAsset: AugmentedSubmittable<(recipient: Option<AccountId32> | null | object | string | Uint8Array, assetToSell: Compact<u32> | AnyNumber | Uint8Array, assetToBuy: Compact<u32> | AnyNumber | Uint8Array, buyAmount: Compact<u128> | AnyNumber | Uint8Array, maximumSell: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Option<AccountId32>, Compact<u32>, Compact<u32>, Compact<u128>, Compact<u128>]>;
      /**
       * Burn exchange assets to withdraw core asset and trade asset at current ratio
       * 
       * `asset_id` - The trade asset ID
       * `liquidity_to_withdraw` - Amount of user's liquidity to withdraw
       * `min_asset_withdraw` - The minimum trade asset withdrawn
       * `min_core_withdraw` -  The minimum core asset withdrawn
       **/
      removeLiquidity: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, liquidityToWithdraw: Compact<u128> | AnyNumber | Uint8Array, minAssetWithdraw: Compact<u128> | AnyNumber | Uint8Array, minCoreWithdraw: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u128>, Compact<u128>, Compact<u128>]>;
      /**
       * Sell `asset_to_sell` for `asset_to_buy`.
       * Caller specifies an exact `sell_amount` and a `minimum_buy` amount to receive.
       * 
       * `recipient` - Account to receive assets, defaults to `origin` if None
       * `asset_to_sell` - asset ID to sell
       * `asset_to_buy` - asset ID to buy
       * `sell_amount` - The amount of `asset_to_sell` the caller should pay
       * `minimum_buy` - The minimum `asset_to_buy` to receive
       **/
      sellAsset: AugmentedSubmittable<(recipient: Option<AccountId32> | null | object | string | Uint8Array, assetToSell: Compact<u32> | AnyNumber | Uint8Array, assetToBuy: Compact<u32> | AnyNumber | Uint8Array, sellAmount: Compact<u128> | AnyNumber | Uint8Array, minimumBuy: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Option<AccountId32>, Compact<u32>, Compact<u32>, Compact<u128>, Compact<u128>]>;
      /**
       * Set the spot exchange wide fee rate (root only)
       **/
      setFeeRate: AugmentedSubmittable<(newFeeRate: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    erc20Peg: {
      activateCennzDeposits: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Activate/deactivate deposits (root only)
       **/
      activateDeposits: AugmentedSubmittable<(activate: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [bool]>;
      /**
       * Activate/deactivate withdrawals (root only)
       **/
      activateWithdrawals: AugmentedSubmittable<(activate: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [bool]>;
      depositClaim: AugmentedSubmittable<(txHash: H256 | string | Uint8Array, claim: CrmlErc20PegErc20DepositEvent | { tokenAddress?: any; amount?: any; beneficiary?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, CrmlErc20PegErc20DepositEvent]>;
      setContractAddress: AugmentedSubmittable<(ethAddress: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160]>;
      setErc20Meta: AugmentedSubmittable<(details: Vec<ITuple<[H160, Bytes, u8]>> | ([H160 | string | Uint8Array, Bytes | string | Uint8Array, u8 | AnyNumber | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[H160, Bytes, u8]>>]>;
      withdraw: AugmentedSubmittable<(assetId: u32 | AnyNumber | Uint8Array, amount: u128 | AnyNumber | Uint8Array, beneficiary: H160 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u128, H160]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ethBridge: {
      setEventConfirmations: AugmentedSubmittable<(confirmations: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      setEventDeadline: AugmentedSubmittable<(seconds: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      submitNotarization: AugmentedSubmittable<(payload: CrmlEthBridgeNotarizationPayload | { eventClaimId?: any; authorityIndex?: any; result?: any } | string | Uint8Array, signature: CennznetPrimitivesEthCryptoAppCryptoSignature | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CrmlEthBridgeNotarizationPayload, CennznetPrimitivesEthCryptoAppCryptoSignature]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ethereum: {
      /**
       * Transact an Ethereum transaction.
       **/
      transact: AugmentedSubmittable<(transaction: EthereumTransactionTransactionV2 | { Legacy: any } | { EIP2930: any } | { EIP1559: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [EthereumTransactionTransactionV2]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ethWallet: {
      call: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array, ethAddress: H160 | string | Uint8Array, signature: CrmlEthWalletEthereumEthereumSignature | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, H160, CrmlEthWalletEthereumEthereumSignature]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    evm: {
      /**
       * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
       **/
      call: AugmentedSubmittable<(source: H160 | string | Uint8Array, target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | object | string | Uint8Array, nonce: Option<U256> | null | object | string | Uint8Array, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Issue an EVM create operation. This is similar to a contract creation transaction in
       * Ethereum.
       **/
      create: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | object | string | Uint8Array, nonce: Option<U256> | null | object | string | Uint8Array, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Issue an EVM create2 operation.
       **/
      create2: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, salt: H256 | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | object | string | Uint8Array, nonce: Option<U256> | null | object | string | Uint8Array, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, H256, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Withdraw balance from EVM into currency/balances pallet.
       **/
      withdraw: AugmentedSubmittable<(address: H160 | string | Uint8Array, value: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    genericAsset: {
      /**
       * Burns an asset, decreases its total issuance. Deduct the money from target account
       * The `origin` must have `burn` permissions.
       * 
       * Weights:
       * O(1) Limited number of reads/writes.
       **/
      burn: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, target: AccountId32 | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, AccountId32, u128]>;
      /**
       * Create a new kind of asset and nominates the owner of this asset.
       * The asset_id will be the next unoccupied asset_id
       * Accounts who will have the permissions to mint/burn/change permission are passed in via 'options'
       * origin of this call must be root.
       * 
       * Weights:
       * O(1) Limited number of read and writes.
       * Should not be called often.
       **/
      create: AugmentedSubmittable<(owner: AccountId32 | string | Uint8Array, options: CrmlGenericAssetAssetOptions | { initialIssuance?: any; permissions?: any } | string | Uint8Array, info: CrmlGenericAssetAssetInfo | { symbol?: any; decimalPlaces?: any; existentialDeposit?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, CrmlGenericAssetAssetOptions, CrmlGenericAssetAssetInfo]>;
      /**
       * Create a new asset with reserved asset_id.
       * Internally calls create_asset with an asset_id
       * Requires Root call.
       * 
       * Weights:
       * O(1) Limited read/writes
       **/
      createReserved: AugmentedSubmittable<(assetId: u32 | AnyNumber | Uint8Array, options: CrmlGenericAssetAssetOptions | { initialIssuance?: any; permissions?: any } | string | Uint8Array, info: CrmlGenericAssetAssetInfo | { symbol?: any; decimalPlaces?: any; existentialDeposit?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, CrmlGenericAssetAssetOptions, CrmlGenericAssetAssetInfo]>;
      /**
       * Mints an asset, increases its total issuance. Deposits the newly minted currency into target account
       * The origin must have `mint` permissions.
       * 
       * Weights:
       * O(1) limited number of read/writes
       **/
      mint: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, to: AccountId32 | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, AccountId32, u128]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the `TransferFee`.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for
       * input config types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex computation.
       * 
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, to: AccountId32 | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, AccountId32, Compact<u128>]>;
      /**
       * Transfer all of the free balance of `asset_id` to another account.
       **/
      transferAll: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, to: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, AccountId32]>;
      /**
       * Updates asset info for a given `asset_id`.
       * 
       * The `origin` must have `update` permission.
       * 
       * weights:
       * O(1) limited number of read and writes
       * Expected to not be called frequently
       **/
      updateAssetInfo: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, info: CrmlGenericAssetAssetInfo | { symbol?: any; decimalPlaces?: any; existentialDeposit?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, CrmlGenericAssetAssetInfo]>;
      /**
       * Updates permissions(mint/burn/change permission) for a given `asset_id` and an account.
       * 
       * The `origin` must have `update` permission.
       * 
       * weights:
       * O(1) limited number of read and writes
       * Expected to not be called frequently
       **/
      updatePermission: AugmentedSubmittable<(assetId: Compact<u32> | AnyNumber | Uint8Array, newPermission: CrmlGenericAssetPermissionsV1 | { update?: any; mint?: any; burn?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, CrmlGenericAssetPermissionsV1]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    governance: {
      /**
       * Add a member to the council
       * This must be submitted like any other proposal
       **/
      addCouncilMember: AugmentedSubmittable<(newMember: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Cancel a proposal queued for enactment.
       **/
      cancelEnactment: AugmentedSubmittable<(proposalId: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Execute a proposal transaction
       **/
      enactReferendum: AugmentedSubmittable<(proposalId: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Remove a member from the council
       * This must be submitted like any other proposal
       **/
      removeCouncilMember: AugmentedSubmittable<(removeMember: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Adjust the minimum stake required for new council members
       **/
      setMinimumCouncilStake: AugmentedSubmittable<(newMinimumCouncilStake: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Adjust the minimum staked amount
       * This must be submitted like any other proposal
       **/
      setMinimumVoterStakedAmount: AugmentedSubmittable<(newMinimumStakedAmount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Adjust the proposal bond
       * This must be submitted like any other proposal
       **/
      setProposalBond: AugmentedSubmittable<(newProposalBond: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Adjust the referendum veto threshold
       * This must be submitted like any other proposal
       **/
      setReferendumThreshold: AugmentedSubmittable<(newReferendumThreshold: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Permill]>;
      submitProposal: AugmentedSubmittable<(call: Bytes | string | Uint8Array, justificationUri: Bytes | string | Uint8Array, enactmentDelay: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes, u32]>;
      /**
       * Submit a veto for a referendum
       **/
      voteAgainstReferendum: AugmentedSubmittable<(proposalId: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      voteOnProposal: AugmentedSubmittable<(proposalId: u64 | AnyNumber | Uint8Array, vote: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, bool]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * Note that the current authority set of the GRANDPA finality gadget has
       * stalled. This will trigger a forced authority set change at the beginning
       * of the next session, to be enacted `delay` blocks after that. The delay
       * should be high enough to safely assume that the block signalling the
       * forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
       * will start the new authority set using the given finalized block as base.
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<(delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpSessionMembershipProof]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       * 
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpFinalityGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [SpFinalityGrandpaEquivocationProof, SpSessionMembershipProof]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    identity: {
      /**
       * Add a registrar to the system.
       * 
       * The dispatch origin for this call must be `T::RegistrarOrigin`.
       * 
       * - `account`: the account of the registrar.
       * 
       * Emits `RegistrarAdded` if successful.
       * 
       * # <weight>
       * - `O(R)` where `R` registrar-count (governance-bounded and code-bounded).
       * - One storage mutation (codec `O(R)`).
       * - One event.
       * # </weight>
       **/
      addRegistrar: AugmentedSubmittable<(account: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Add the given account to the sender's subs.
       * 
       * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
       * to the sender.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a registered
       * sub identity of `sub`.
       **/
      addSub: AugmentedSubmittable<(sub: AccountId32 | string | Uint8Array, data: Data | { None: any } | { Raw: any } | { BlakeTwo256: any } | { Sha256: any } | { Keccak256: any } | { ShaThree256: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Data]>;
      /**
       * Cancel a previous request.
       * 
       * Payment: A previously reserved deposit is returned on success.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a
       * registered identity.
       * 
       * - `reg_index`: The index of the registrar whose judgement is no longer requested.
       * 
       * Emits `JudgementUnrequested` if successful.
       * 
       * # <weight>
       * - `O(R + X)`.
       * - One balance-reserve operation.
       * - One storage mutation `O(R + X)`.
       * - One event
       * # </weight>
       **/
      cancelRequest: AugmentedSubmittable<(regIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Clear an account's identity info and all sub-accounts and return all deposits.
       * 
       * Payment: All reserved balances on the account are returned.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a registered
       * identity.
       * 
       * Emits `IdentityCleared` if successful.
       * 
       * # <weight>
       * - `O(R + S + X)`
       * - where `R` registrar-count (governance-bounded).
       * - where `S` subs-count (hard- and deposit-bounded).
       * - where `X` additional-field-count (deposit-bounded and code-bounded).
       * - One balance-unreserve operation.
       * - `2` storage reads and `S + 2` storage deletions.
       * - One event.
       * # </weight>
       **/
      clearIdentity: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Remove an account's identity and sub-account information and slash the deposits.
       * 
       * Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
       * `Slash`. Verification request deposits are not returned; they should be cancelled
       * manually using `cancel_request`.
       * 
       * The dispatch origin for this call must match `T::ForceOrigin`.
       * 
       * - `target`: the account whose identity the judgement is upon. This must be an account
       * with a registered identity.
       * 
       * Emits `IdentityKilled` if successful.
       * 
       * # <weight>
       * - `O(R + S + X)`.
       * - One balance-reserve operation.
       * - `S + 2` storage mutations.
       * - One event.
       * # </weight>
       **/
      killIdentity: AugmentedSubmittable<(target: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Provide a judgement for an account's identity.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must be the account
       * of the registrar whose index is `reg_index`.
       * 
       * - `reg_index`: the index of the registrar whose judgement is being made.
       * - `target`: the account whose identity the judgement is upon. This must be an account
       * with a registered identity.
       * - `judgement`: the judgement of the registrar of index `reg_index` about `target`.
       * 
       * Emits `JudgementGiven` if successful.
       * 
       * # <weight>
       * - `O(R + X)`.
       * - One balance-transfer operation.
       * - Up to one account-lookup operation.
       * - Storage: 1 read `O(R)`, 1 mutate `O(R + X)`.
       * - One event.
       * # </weight>
       **/
      provideJudgement: AugmentedSubmittable<(regIndex: Compact<u32> | AnyNumber | Uint8Array, target: AccountId32 | string | Uint8Array, judgement: PalletIdentityJudgement | { Unknown: any } | { FeePaid: any } | { Reasonable: any } | { KnownGood: any } | { OutOfDate: any } | { LowQuality: any } | { Erroneous: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, AccountId32, PalletIdentityJudgement]>;
      /**
       * Remove the sender as a sub-account.
       * 
       * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
       * to the sender (*not* the original depositor).
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a registered
       * super-identity.
       * 
       * NOTE: This should not normally be used, but is provided in the case that the non-
       * controller of an account is maliciously registered as a sub-account.
       **/
      quitSub: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Remove the given account from the sender's subs.
       * 
       * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
       * to the sender.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a registered
       * sub identity of `sub`.
       **/
      removeSub: AugmentedSubmittable<(sub: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Alter the associated name of the given sub-account.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a registered
       * sub identity of `sub`.
       **/
      renameSub: AugmentedSubmittable<(sub: AccountId32 | string | Uint8Array, data: Data | { None: any } | { Raw: any } | { BlakeTwo256: any } | { Sha256: any } | { Keccak256: any } | { ShaThree256: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Data]>;
      /**
       * Request a judgement from a registrar.
       * 
       * Payment: At most `max_fee` will be reserved for payment to the registrar if judgement
       * given.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a
       * registered identity.
       * 
       * - `reg_index`: The index of the registrar whose judgement is requested.
       * - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:
       * 
       * ```nocompile
       * Self::registrars().get(reg_index).unwrap().fee
       * ```
       * 
       * Emits `JudgementRequested` if successful.
       * 
       * # <weight>
       * - `O(R + X)`.
       * - One balance-reserve operation.
       * - Storage: 1 read `O(R)`, 1 mutate `O(X + R)`.
       * - One event.
       * # </weight>
       **/
      requestJudgement: AugmentedSubmittable<(regIndex: Compact<u32> | AnyNumber | Uint8Array, maxFee: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u128>]>;
      /**
       * Change the account associated with a registrar.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must be the account
       * of the registrar whose index is `index`.
       * 
       * - `index`: the index of the registrar whose fee is to be set.
       * - `new`: the new account ID.
       * 
       * # <weight>
       * - `O(R)`.
       * - One storage mutation `O(R)`.
       * - Benchmark: 8.823 + R * 0.32 µs (min squares analysis)
       * # </weight>
       **/
      setAccountId: AugmentedSubmittable<(index: Compact<u32> | AnyNumber | Uint8Array, updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, AccountId32]>;
      /**
       * Set the fee required for a judgement to be requested from a registrar.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must be the account
       * of the registrar whose index is `index`.
       * 
       * - `index`: the index of the registrar whose fee is to be set.
       * - `fee`: the new fee.
       * 
       * # <weight>
       * - `O(R)`.
       * - One storage mutation `O(R)`.
       * - Benchmark: 7.315 + R * 0.329 µs (min squares analysis)
       * # </weight>
       **/
      setFee: AugmentedSubmittable<(index: Compact<u32> | AnyNumber | Uint8Array, fee: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u128>]>;
      /**
       * Set the field information for a registrar.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must be the account
       * of the registrar whose index is `index`.
       * 
       * - `index`: the index of the registrar whose fee is to be set.
       * - `fields`: the fields that the registrar concerns themselves with.
       * 
       * # <weight>
       * - `O(R)`.
       * - One storage mutation `O(R)`.
       * - Benchmark: 7.464 + R * 0.325 µs (min squares analysis)
       * # </weight>
       **/
      setFields: AugmentedSubmittable<(index: Compact<u32> | AnyNumber | Uint8Array, fields: PalletIdentityBitFlags) => SubmittableExtrinsic<ApiType>, [Compact<u32>, PalletIdentityBitFlags]>;
      /**
       * Set an account's identity information and reserve the appropriate deposit.
       * 
       * If the account already has identity information, the deposit is taken as part payment
       * for the new deposit.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * - `info`: The identity information.
       * 
       * Emits `IdentitySet` if successful.
       * 
       * # <weight>
       * - `O(X + X' + R)`
       * - where `X` additional-field-count (deposit-bounded and code-bounded)
       * - where `R` judgements-count (registrar-count-bounded)
       * - One balance reserve operation.
       * - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
       * - One event.
       * # </weight>
       **/
      setIdentity: AugmentedSubmittable<(info: PalletIdentityIdentityInfo | { additional?: any; legal?: any; web?: any; discord?: any; email?: any; pgpFingerprint?: any; image?: any; twitter?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletIdentityIdentityInfo]>;
      /**
       * Set the sub-accounts of the sender.
       * 
       * Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned
       * and an amount `SubAccountDeposit` will be reserved for each item in `subs`.
       * 
       * The dispatch origin for this call must be _Signed_ and the sender must have a registered
       * identity.
       * 
       * - `subs`: The identity's (new) sub-accounts.
       * 
       * # <weight>
       * - `O(P + S)`
       * - where `P` old-subs-count (hard- and deposit-bounded).
       * - where `S` subs-count (hard- and deposit-bounded).
       * - At most one balance operations.
       * - DB:
       * - `P + S` storage mutations (codec complexity `O(1)`)
       * - One storage read (codec complexity `O(P)`).
       * - One storage write (codec complexity `O(S)`).
       * - One storage-exists (`IdentityOf::contains_key`).
       * # </weight>
       **/
      setSubs: AugmentedSubmittable<(subs: Vec<ITuple<[AccountId32, Data]>> | ([AccountId32 | string | Uint8Array, Data | { None: any } | { Raw: any } | { BlakeTwo256: any } | { Sha256: any } | { Keccak256: any } | { ShaThree256: any } | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[AccountId32, Data]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    imOnline: {
      /**
       * # <weight>
       * - Complexity: `O(K + E)` where K is length of `Keys` (heartbeat.validators_len) and E is
       * length of `heartbeat.network_state.external_address`
       * - `O(K)`: decoding of length `K`
       * - `O(E)`: decoding/encoding of length `E`
       * - DbReads: pallet_session `Validators`, pallet_session `CurrentIndex`, `Keys`,
       * `ReceivedHeartbeats`
       * - DbWrites: `ReceivedHeartbeats`
       * # </weight>
       **/
      heartbeat: AugmentedSubmittable<(heartbeat: PalletImOnlineHeartbeat | { blockNumber?: any; networkState?: any; sessionIndex?: any; authorityIndex?: any; validatorsLen?: any } | string | Uint8Array, signature: PalletImOnlineSr25519AppSr25519Signature | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletImOnlineHeartbeat, PalletImOnlineSr25519AppSr25519Signature]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    nft: {
      /**
       * Auction a token on the open market to the highest bidder
       * 
       * Caller must be the token owner
       * - `payment_asset` fungible asset Id to receive payment with
       * - `reserve_price` winning bid must be over this threshold
       * - `duration` length of the auction (in blocks), uses default duration if unspecified
       **/
      auction: AugmentedSubmittable<(tokenId: ITuple<[u32, u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], paymentAsset: u32 | AnyNumber | Uint8Array, reservePrice: u128 | AnyNumber | Uint8Array, duration: Option<u32> | null | object | string | Uint8Array, marketplaceId: Option<u32> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ITuple<[u32, u32, u32]>, u32, u128, Option<u32>, Option<u32>]>;
      /**
       * Auction a bundle of tokens on the open market to the highest bidder
       * - Tokens must be from the same series
       * - Tokens with individual royalties schedules cannot be sold in bundles
       * 
       * Caller must be the token owner
       * - `payment_asset` fungible asset Id to receive payment with
       * - `reserve_price` winning bid must be over this threshold
       * - `duration` length of the auction (in blocks), uses default duration if unspecified
       **/
      auctionBundle: AugmentedSubmittable<(tokens: Vec<ITuple<[u32, u32, u32]>> | ([u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array])[], paymentAsset: u32 | AnyNumber | Uint8Array, reservePrice: u128 | AnyNumber | Uint8Array, duration: Option<u32> | null | object | string | Uint8Array, marketplaceId: Option<u32> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[u32, u32, u32]>>, u32, u128, Option<u32>, Option<u32>]>;
      /**
       * Place a bid on an open auction
       * - `amount` to bid (in the seller's requested payment asset)
       **/
      bid: AugmentedSubmittable<(listingId: u128 | AnyNumber | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128, u128]>;
      /**
       * Burn a token 🔥
       * 
       * Caller must be the token owner
       **/
      burn: AugmentedSubmittable<(tokenId: ITuple<[u32, u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array]) => SubmittableExtrinsic<ApiType>, [ITuple<[u32, u32, u32]>]>;
      /**
       * Burn some tokens 🔥
       * Tokens must be from the same series
       * 
       * Caller must be the token owner
       * Fails on duplicate serials
       **/
      burnBatch: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, seriesId: u32 | AnyNumber | Uint8Array, serialNumbers: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u32, u32, Vec<u32>]>;
      /**
       * Buy a token listing for its specified price
       **/
      buy: AugmentedSubmittable<(listingId: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Close a sale or auction returning tokens
       * Requires no successful bids have been made for an auction.
       * Caller must be the listed seller
       **/
      cancelSale: AugmentedSubmittable<(listingId: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * Create a new token collection
       * 
       * The caller will become the collection owner
       * `collection_id`- 32 byte utf-8 string
       * `metadata_base_uri` - Base URI for off-chain metadata for tokens in this collection
       * `royalties_schedule` - defacto royalties plan for secondary sales, this will apply to all tokens in the collection by default.
       **/
      createCollection: AugmentedSubmittable<(name: Bytes | string | Uint8Array, royaltiesSchedule: Option<CrmlNftRoyaltiesSchedule> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Option<CrmlNftRoyaltiesSchedule>]>;
      /**
       * Set the owner of a collection
       * Caller must be the current collection owner
       **/
      migrateToMetadataScheme: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, seriesId: u32 | AnyNumber | Uint8Array, scheme: CrmlNftMetadataScheme | { Https: any } | { Http: any } | { IpfsDir: any } | { IpfsShared: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, CrmlNftMetadataScheme]>;
      /**
       * Mint tokens for an existing series
       * 
       * `quantity` - how many tokens to mint
       * `owner` - the token owner, defaults to the caller if unspecified
       * Caller must be the collection owner
       * -----------
       * Weight is O(N) where N is `quantity`
       **/
      mintAdditional: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, seriesId: u32 | AnyNumber | Uint8Array, quantity: u32 | AnyNumber | Uint8Array, owner: Option<AccountId32> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, Option<AccountId32>]>;
      /**
       * Create a new series
       * Additional tokens can be minted via `mint_additional`
       * 
       * `quantity` - number of tokens to mint now
       * `owner` - the token owner, defaults to the caller
       * `metadata_scheme` - The off-chain metadata referencing scheme for tokens in this series
       * Caller must be the collection owner
       **/
      mintSeries: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, quantity: u32 | AnyNumber | Uint8Array, owner: Option<AccountId32> | null | object | string | Uint8Array, metadataScheme: CrmlNftMetadataScheme | { Https: any } | { Http: any } | { IpfsDir: any } | { IpfsShared: any } | string | Uint8Array, royaltiesSchedule: Option<CrmlNftRoyaltiesSchedule> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Option<AccountId32>, CrmlNftMetadataScheme, Option<CrmlNftRoyaltiesSchedule>]>;
      /**
       * Flag an account as a marketplace
       * 
       * `marketplace_account` - if specified, this account will be registered
       * `entitlement` - Permill, percentage of sales to go to the marketplace
       * If no marketplace is specified the caller will be registered
       **/
      registerMarketplace: AugmentedSubmittable<(marketplaceAccount: Option<AccountId32> | null | object | string | Uint8Array, entitlement: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Option<AccountId32>, Permill]>;
      /**
       * Sell a single token at a fixed price
       * 
       * `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase
       * `asset_id` fungible asset Id to receive as payment for the NFT
       * `fixed_price` ask price
       * `duration` listing duration time in blocks from now
       * `marketplace` optionally, the marketplace that the NFT is being sold on
       * Caller must be the token owner
       **/
      sell: AugmentedSubmittable<(tokenId: ITuple<[u32, u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], buyer: Option<AccountId32> | null | object | string | Uint8Array, paymentAsset: u32 | AnyNumber | Uint8Array, fixedPrice: u128 | AnyNumber | Uint8Array, duration: Option<u32> | null | object | string | Uint8Array, marketplaceId: Option<u32> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ITuple<[u32, u32, u32]>, Option<AccountId32>, u32, u128, Option<u32>, Option<u32>]>;
      /**
       * Sell a bundle of tokens at a fixed price
       * - Tokens must be from the same series
       * - Tokens with individual royalties schedules cannot be sold with this method
       * 
       * `buyer` optionally, the account to receive the NFT. If unspecified, then any account may purchase
       * `asset_id` fungible asset Id to receive as payment for the NFT
       * `fixed_price` ask price
       * `duration` listing duration time in blocks from now
       * Caller must be the token owner
       **/
      sellBundle: AugmentedSubmittable<(tokens: Vec<ITuple<[u32, u32, u32]>> | ([u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array])[], buyer: Option<AccountId32> | null | object | string | Uint8Array, paymentAsset: u32 | AnyNumber | Uint8Array, fixedPrice: u128 | AnyNumber | Uint8Array, duration: Option<u32> | null | object | string | Uint8Array, marketplaceId: Option<u32> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[u32, u32, u32]>>, Option<AccountId32>, u32, u128, Option<u32>, Option<u32>]>;
      /**
       * Set the owner of a collection
       * Caller must be the current collection owner
       **/
      setOwner: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, newOwner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, AccountId32]>;
      /**
       * Set the name of a series
       * Caller must be the current collection owner
       **/
      setSeriesName: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, seriesId: u32 | AnyNumber | Uint8Array, name: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Bytes]>;
      /**
       * Transfer ownership of an NFT
       * Caller must be the token owner
       **/
      transfer: AugmentedSubmittable<(tokenId: ITuple<[u32, u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], newOwner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [ITuple<[u32, u32, u32]>, AccountId32]>;
      /**
       * Transfer ownership of a batch of NFTs (atomic)
       * Tokens must be from the same series
       * Caller must be the token owner
       **/
      transferBatch: AugmentedSubmittable<(collectionId: u32 | AnyNumber | Uint8Array, seriesId: u32 | AnyNumber | Uint8Array, serialNumbers: Vec<u32> | (u32 | AnyNumber | Uint8Array)[], newOwner: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Vec<u32>, AccountId32]>;
      /**
       * Update fixed price for a single token sale
       * 
       * `listing_id` id of the fixed price listing
       * `new_price` new fixed price
       * Caller must be the token owner
       **/
      updateFixedPrice: AugmentedSubmittable<(listingId: u128 | AnyNumber | Uint8Array, newPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128, u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    rewards: {
      /**
       * Force a new fiscal era to start as soon as the next staking era.
       **/
      forceNewFiscalEra: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Set the development fund take %, capped at 100%.
       **/
      setDevelopmentFundTake: AugmentedSubmittable<(newTakePercent: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Set the per payout inflation rate (`numerator` / `denominator`) (it may be negative)
       * Please be advised that a newly set inflation rate would only affect the next fiscal year.
       **/
      setInflationRate: AugmentedSubmittable<(numerator: u64 | AnyNumber | Uint8Array, denominator: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    scheduler: {
      /**
       * Cancel an anonymously scheduled task.
       **/
      cancel: AugmentedSubmittable<(when: u32 | AnyNumber | Uint8Array, index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Cancel a named scheduled task.
       **/
      cancelNamed: AugmentedSubmittable<(id: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Anonymously schedule a task.
       **/
      schedule: AugmentedSubmittable<(when: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | object | string | Uint8Array, priority: u8 | AnyNumber | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<ITuple<[u32, u32]>>, u8, Call]>;
      /**
       * Anonymously schedule a task after a delay.
       * 
       * # <weight>
       * Same as [`schedule`].
       * # </weight>
       **/
      scheduleAfter: AugmentedSubmittable<(after: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | object | string | Uint8Array, priority: u8 | AnyNumber | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<ITuple<[u32, u32]>>, u8, Call]>;
      /**
       * Schedule a named task.
       **/
      scheduleNamed: AugmentedSubmittable<(id: Bytes | string | Uint8Array, when: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | object | string | Uint8Array, priority: u8 | AnyNumber | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32, Option<ITuple<[u32, u32]>>, u8, Call]>;
      /**
       * Schedule a named task after a delay.
       * 
       * # <weight>
       * Same as [`schedule_named`](Self::schedule_named).
       * # </weight>
       **/
      scheduleNamedAfter: AugmentedSubmittable<(id: Bytes | string | Uint8Array, after: u32 | AnyNumber | Uint8Array, maybePeriodic: Option<ITuple<[u32, u32]>> | null | object | string | Uint8Array, priority: u8 | AnyNumber | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32, Option<ITuple<[u32, u32]>>, u8, Call]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    session: {
      /**
       * Removes any session key(s) of the function caller.
       * 
       * This doesn't take effect until the next session.
       * 
       * The dispatch origin of this function must be Signed and the account must be either be
       * convertible to a validator ID using the chain's typical addressing system (this usually
       * means being a controller account) or directly convertible into a validator ID (which
       * usually means being a stash account).
       * 
       * # <weight>
       * - Complexity: `O(1)` in number of key types. Actual cost depends on the number of length
       * of `T::Keys::key_ids()` which is fixed.
       * - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
       * - DbWrites: `NextKeys`, `origin account`
       * - DbWrites per key id: `KeyOwner`
       * # </weight>
       **/
      purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Sets the session key(s) of the function caller to `keys`.
       * Allows an account to set its session key prior to becoming a validator.
       * This doesn't take effect until the next session.
       * 
       * The dispatch origin of this function must be signed.
       * 
       * # <weight>
       * - Complexity: `O(1)`. Actual cost depends on the number of length of
       * `T::Keys::key_ids()` which is fixed.
       * - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
       * - DbWrites: `origin account`, `NextKeys`
       * - DbReads per key id: `KeyOwner`
       * - DbWrites per key id: `KeyOwner`
       * # </weight>
       **/
      setKeys: AugmentedSubmittable<(keys: CennznetRuntimeSessionKeys | { grandpa?: any; babe?: any; imOnline?: any; authorityDiscovery?: any; ethBridge?: any } | string | Uint8Array, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CennznetRuntimeSessionKeys, Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    staking: {
      /**
       * Take the origin account as a stash and lock up `value` of its balance. `controller` will
       * be the account that controls it.
       * 
       * `value` must be more than the `minimum_bond` specified in genesis config.
       * 
       * The dispatch origin for this call must be _Signed_ by the stash account.
       * 
       * Emits `Bonded`.
       * 
       * # <weight>
       * - Independent of the arguments. Moderate complexity.
       * - O(1).
       * - Three extra DB entries.
       * 
       * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
       * unless the `origin` falls below _existential deposit_ and gets removed as dust.
       * ------------------
       * Weight: O(1)
       * DB Weight:
       * - Read: Bonded, Ledger, [Origin Account], Locks
       * - Write: Bonded, Payee, [Origin Account], Locks, Ledger
       * # </weight>
       **/
      bond: AugmentedSubmittable<(controller: AccountId32 | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array, payee: CrmlStakingRewardDestination | { Stash: any } | { Controller: any } | { Account: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Compact<u128>, CrmlStakingRewardDestination]>;
      /**
       * Add some extra amount that have appeared in the stash `free_balance` into the balance up
       * for staking.
       * 
       * Use this if there are additional funds in your stash account that you wish to bond.
       * Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
       * that can be added.
       * 
       * The dispatch origin for this call must be _Signed_ by the stash, not the controller and
       * it can be only called when [`EraElectionStatus`] is `Closed`.
       * 
       * Emits `Bonded`.
       * 
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - O(1).
       * - One DB entry.
       * ------------
       * DB Weight:
       * - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
       * - Write: [Origin Account], Locks, Ledger
       * # </weight>
       **/
      bondExtra: AugmentedSubmittable<(maxAdditional: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Cancel enactment of a deferred slash.
       * 
       * Parameters: era and indices of the slashes for that era to kill.
       * 
       * # <weight>
       * Complexity: O(U + S)
       * with U unapplied slashes weighted with U=1000
       * and S is the number of slash indices to be canceled.
       * - Read: Unapplied Slashes
       * - Write: Unapplied Slashes
       * # </weight>
       **/
      cancelDeferredSlash: AugmentedSubmittable<(era: u32 | AnyNumber | Uint8Array, slashIndices: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u32, Vec<u32>]>;
      /**
       * Declare no desire to either validate or nominate.
       * 
       * Effects will be felt at the beginning of the next era.
       * 
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * And, it can be only called when [`EraElectionStatus`] is `Closed`.
       * 
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains one read.
       * - Writes are limited to the `origin` account key.
       * --------
       * Weight: O(1)
       * DB Weight:
       * - Read: EraElectionStatus, Ledger
       * - Write: Validators, Nominators
       * # </weight>
       **/
      chill: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Force there to be a new era at the end of the next session. After this, it will be
       * reset to normal (non-forced) behaviour.
       * 
       * # <weight>
       * - No arguments.
       * # </weight>
       **/
      forceNewEra: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Force there to be a new era at the end of sessions indefinitely.
       * 
       * The dispatch origin must be Root.
       * 
       * # <weight>
       * - Weight: O(1)
       * - Write: ForceEra
       * # </weight>
       **/
      forceNewEraAlways: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Force there to be no new eras indefinitely.
       * 
       * # <weight>
       * - No arguments.
       * # </weight>
       **/
      forceNoEras: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Force a current staker to become completely unstaked, immediately.
       * 
       * The dispatch origin must be Root.
       * 
       * # <weight>
       * O(S) where S is the number of slashing spans to be removed
       * Reads: Bonded, Slashing Spans, Account, Locks
       * Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Account, Locks
       * Writes Each: SpanSlash * S
       * # </weight>
       **/
      forceUnstake: AugmentedSubmittable<(stash: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Increments the ideal number of validators.
       * 
       * The dispatch origin must be Root.
       * 
       * # <weight>
       * Same as [`set_validator_count`].
       * # </weight>
       **/
      increaseValidatorCount: AugmentedSubmittable<(additional: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Declare the desire to nominate `targets` for the origin controller.
       * 
       * Effects will be felt at the beginning of the next era. This can only be called when
       * [`EraElectionStatus`] is `Closed`.
       * 
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * And, it can be only called when [`EraElectionStatus`] is `Closed`.
       * 
       * # <weight>
       * - The transaction's complexity is proportional to the size of `targets` (N)
       * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
       * - Both the reads and writes follow a similar pattern.
       * ---------
       * Weight: O(N)
       * where N is the number of targets
       * DB Weight:
       * - Reads: Era Election Status, Ledger, Current Era
       * - Writes: Validators, Nominators
       * # </weight>
       **/
      nominate: AugmentedSubmittable<(targets: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Remove all data structure concerning a staker/stash once its balance is zero.
       * This is essentially equivalent to `withdraw_unbonded` except it can be called by anyone
       * and the target `stash` must have no funds left.
       * 
       * This can be called from any origin.
       * 
       * - `stash`: The stash account to reap. Its balance must be zero.
       * 
       * # <weight>
       * Complexity: O(S) where S is the number of slashing spans on the account.
       * DB Weight:
       * - Reads: Stash Account, Bonded, Slashing Spans, Locks
       * - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Stash Account, Locks
       * - Writes Each: SpanSlash * S
       * # </weight>
       **/
      reapStash: AugmentedSubmittable<(stash: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Rebond a portion of the stash scheduled to be unlocked.
       * 
       * The dispatch origin must be signed by the controller, and it can be only called when
       * [`EraElectionStatus`] is `Closed`.
       * 
       * # <weight>
       * - Time complexity: O(L), where L is unlocking chunks
       * - Bounded by `MAX_UNLOCKING_CHUNKS`.
       * - Storage changes: Can't increase storage, only decrease it.
       * ---------------
       * - DB Weight:
       * - Reads: EraElectionStatus, Ledger, Locks, [Origin Account]
       * - Writes: [Origin Account], Locks, Ledger
       * # </weight>
       **/
      rebond: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * (Re-)set the controller of a stash.
       * 
       * Effects will be felt at the beginning of the next era.
       * 
       * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
       * 
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains a limited number of reads.
       * - Writes are limited to the `origin` account key.
       * # </weight>
       **/
      setController: AugmentedSubmittable<(controller: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Set `HistoryDepth` value. This function will delete any history information
       * when `HistoryDepth` is reduced.
       * 
       * Parameters:
       * - `new_history_depth`: The new history depth you would like to set.
       * - `era_items_deleted`: The number of items that will be deleted by this dispatch.
       * This should report all the storage items that will be deleted by clearing old
       * era history. Needed to report an accurate weight for the dispatch. Trusted by
       * `Root` to report an accurate number.
       * 
       * Origin must be root.
       * 
       * # <weight>
       * - E: Number of history depths removed, i.e. 10 -> 7 = 3
       * - Weight: O(E)
       * - DB Weight:
       * - Reads: Current Era, History Depth
       * - Writes: History Depth
       * - Clear Prefix Each: Era Stakers, EraStakersClipped, ErasValidatorPrefs
       * - Writes Each: ErasTotalStake, ErasStartSessionIndex
       * # </weight>
       **/
      setHistoryDepth: AugmentedSubmittable<(newHistoryDepth: Compact<u32> | AnyNumber | Uint8Array, eraItemsDeleted: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>, Compact<u32>]>;
      /**
       * Set the validators who cannot be slashed (if any).
       **/
      setInvulnerables: AugmentedSubmittable<(validators: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Set the minimum bond amount.
       **/
      setMinimumBond: AugmentedSubmittable<(value: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
      /**
       * (Re-)set the payment target for a controller.
       * 
       * Effects will be felt at the beginning of the next era.
       * 
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * 
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains a limited number of reads.
       * - Writes are limited to the `origin` account key.
       * ---------
       * - Weight: O(1)
       * - DB Weight:
       * - Read: Ledger
       * - Write: Payee
       * # </weight>
       **/
      setPayee: AugmentedSubmittable<(payee: CrmlStakingRewardDestination | { Stash: any } | { Controller: any } | { Account: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CrmlStakingRewardDestination]>;
      /**
       * Sets the ideal number of validators.
       * 
       * The dispatch origin must be Root.
       * 
       * # <weight>
       * Weight: O(1)
       * Write: Validator Count
       * # </weight>
       **/
      setValidatorCount: AugmentedSubmittable<(updated: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Submit an election result to the chain. If the solution:
       * 
       * 1. is valid.
       * 2. has a better score than a potentially existing solution on chain.
       * 
       * then, it will be _put_ on chain.
       * 
       * A solution consists of two pieces of data:
       * 
       * 1. `winners`: a flat vector of all the winners of the round.
       * 2. `assignments`: the compact version of an assignment vector that encodes the edge
       * weights.
       * 
       * Both of which may be computed using _phragmen_, or any other algorithm.
       * 
       * Additionally, the submitter must provide:
       * 
       * - The `score` that they claim their solution has.
       * 
       * Both validators and nominators will be represented by indices in the solution. The
       * indices should respect the corresponding types ([`ValidatorIndex`] and
       * [`NominatorIndex`]). Moreover, they should be valid when used to index into
       * [`SnapshotValidators`] and [`SnapshotNominators`]. Any invalid index will cause the
       * solution to be rejected. These two storage items are set during the election window and
       * may be used to determine the indices.
       * 
       * A solution is valid if:
       * 
       * 0. It is submitted when [`EraElectionStatus`] is `Open`.
       * 1. Its claimed score is equal to the score computed on-chain.
       * 2. Presents the correct number of winners.
       * 3. All indexes must be value according to the snapshot vectors. All edge values must
       * also be correct and should not overflow the granularity of the ratio type (i.e. 256
       * or billion).
       * 4. For each edge, all targets are actually nominated by the voter.
       * 5. Has correct self-votes.
       * 
       * A solutions score is consisted of 3 parameters:
       * 
       * 1. `min { support.total }` for each support of a winner. This value should be maximized.
       * 2. `sum { support.total }` for each support of a winner. This value should be minimized.
       * 3. `sum { support.total^2 }` for each support of a winner. This value should be
       * minimized (to ensure less variance)
       * 
       * # <weight>
       * The transaction is assumed to be the longest path, a better solution.
       * - Initial solution is almost the same.
       * - Worse solution is retraced in pre-dispatch-checks which sets its own weight.
       * # </weight>
       **/
      submitElectionSolution: AugmentedSubmittable<(winners: Vec<u16> | (u16 | AnyNumber | Uint8Array)[], compact: CrmlStakingCompactAssignments | { votes1?: any; votes2?: any; votes3?: any; votes4?: any; votes5?: any; votes6?: any; votes7?: any; votes8?: any; votes9?: any; votes10?: any; votes11?: any; votes12?: any; votes13?: any; votes14?: any; votes15?: any; votes16?: any } | string | Uint8Array, score: Vec<u128>, era: u32 | AnyNumber | Uint8Array, size: CrmlStakingElectionSize | { validators?: any; nominators?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<u16>, CrmlStakingCompactAssignments, Vec<u128>, u32, CrmlStakingElectionSize]>;
      /**
       * Unsigned version of `submit_election_solution`.
       * 
       * Note that this must pass the [`ValidateUnsigned`] check which only allows transactions
       * from the local node to be included. In other words, only the block author can include a
       * transaction in the block.
       * 
       * # <weight>
       * See `crate::weight` module.
       * # </weight>
       **/
      submitElectionSolutionUnsigned: AugmentedSubmittable<(winners: Vec<u16> | (u16 | AnyNumber | Uint8Array)[], compact: CrmlStakingCompactAssignments | { votes1?: any; votes2?: any; votes3?: any; votes4?: any; votes5?: any; votes6?: any; votes7?: any; votes8?: any; votes9?: any; votes10?: any; votes11?: any; votes12?: any; votes13?: any; votes14?: any; votes15?: any; votes16?: any } | string | Uint8Array, score: Vec<u128>, era: u32 | AnyNumber | Uint8Array, size: CrmlStakingElectionSize | { validators?: any; nominators?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<u16>, CrmlStakingCompactAssignments, Vec<u128>, u32, CrmlStakingElectionSize]>;
      /**
       * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
       * period ends. If this leaves an amount actively bonded less than
       * T::Currency::minimum_balance(), then it is increased to the full amount.
       * 
       * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
       * the funds out of management ready for transfer.
       * 
       * No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
       * can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
       * to be called first to remove some of the chunks (if possible).
       * 
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * And, it can be only called when [`EraElectionStatus`] is `Closed`.
       * 
       * Emits `Unbonded`.
       * 
       * See also [`Call::withdraw_unbonded`].
       * 
       * # <weight>
       * - Independent of the arguments. Limited but potentially exploitable complexity.
       * - Contains a limited number of reads.
       * - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
       * will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
       * The only way to clean the aforementioned storage item is also user-controlled via
       * `withdraw_unbonded`.
       * - One DB entry.
       * ----------
       * Weight: O(1)
       * DB Weight:
       * - Read: EraElectionStatus, Ledger, CurrentEra, Locks, BalanceOf Stash,
       * - Write: Locks, Ledger, BalanceOf Stash,
       * </weight>
       **/
      unbond: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>]>;
      /**
       * Declare the desire to validate for the origin controller.
       * 
       * Effects will be felt at the beginning of the next era.
       * 
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * And, it can be only called when [`EraElectionStatus`] is `Closed`.
       * 
       * # <weight>
       * - Independent of the arguments. Insignificant complexity.
       * - Contains a limited number of reads.
       * - Writes are limited to the `origin` account key.
       * -----------
       * Weight: O(1)
       * DB Weight:
       * - Read: Era Election Status, Ledger
       * - Write: Nominators, Validators
       * # </weight>
       **/
      validate: AugmentedSubmittable<(prefs: CrmlStakingValidatorPrefs | { commission?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CrmlStakingValidatorPrefs]>;
      /**
       * Remove any unlocked chunks from the `unlocking` queue from our management.
       * 
       * This essentially frees up that balance to be used by the stash account to do
       * whatever it wants.
       * 
       * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
       * And, it can be only called when [`EraElectionStatus`] is `Closed`.
       * 
       * Emits `Withdrawn`.
       * 
       * See also [`Call::unbond`].
       * 
       * # <weight>
       * - Could be dependent on the `origin` argument and how much `unlocking` chunks exist.
       * It implies `consolidate_unlocked` which loops over `Ledger.unlocking`, which is
       * indirectly user-controlled. See [`unbond`] for more detail.
       * - Contains a limited number of reads, yet the size of which could be large based on `ledger`.
       * - Writes are limited to the `origin` account key.
       * ---------------
       * Complexity O(S) where S is the number of slashing spans to remove
       * Update:
       * - Reads: EraElectionStatus, Ledger, Current Era, Locks, [Origin Account]
       * - Writes: [Origin Account], Locks, Ledger
       * Kill:
       * - Reads: EraElectionStatus, Ledger, Current Era, Bonded, Slashing Spans, [Origin
       * Account], Locks, BalanceOf stash
       * - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators,
       * [Origin Account], Locks, BalanceOf stash.
       * - Writes Each: SpanSlash * S
       * NOTE: Weight annotation is the kill scenario, we refund otherwise.
       * # </weight>
       **/
      withdrawUnbonded: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: AccountId32 | string | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32, Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - The weight of this call is defined by the caller.
       * # </weight>
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array, weight: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Perbill]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * # <weight>
       * - `O(1)`
       * # </weight>
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       * 
       * # <weight>
       * - `O(b)` where b is the length of the remark.
       * - 1 event.
       * # </weight>
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       * 
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
       * expensive).
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very
       * expensive. We will treat this as a full block.
       * # </weight>
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * # <weight>
       * - `O(C)` where `C` length of `code`
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full
       * block. # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * 
       * The dispatch origin for this call must be `Inherent`.
       * 
       * # <weight>
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    tokenApprovals: {
      /**
       * Set approval for an account to transfer an amount of tokens on behalf of the caller
       * Mapping from caller to spender and amount
       * mapping(address => mapping(address => uint256)) private _allowances;
       **/
      erc20Approval: AugmentedSubmittable<(caller: H160 | string | Uint8Array, spender: H160 | string | Uint8Array, assetId: u32 | AnyNumber | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, H160, u32, u128]>;
      /**
       * Removes an approval over an account and asset_id
       **/
      erc20RemoveApproval: AugmentedSubmittable<(caller: H160 | string | Uint8Array, spender: H160 | string | Uint8Array, assetId: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, H160, u32]>;
      /**
       * Set approval for a single NFT
       * Mapping from token_id to operator
       * clears approval on transfer
       **/
      erc721Approval: AugmentedSubmittable<(caller: H160 | string | Uint8Array, operatorAccount: H160 | string | Uint8Array, tokenId: ITuple<[u32, u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array]) => SubmittableExtrinsic<ApiType>, [H160, H160, ITuple<[u32, u32, u32]>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    treasury: {
      /**
       * Approve a proposal. At a later time, the proposal will be allocated to the beneficiary
       * and the original deposit will be returned.
       * 
       * May only be called from `T::ApproveOrigin`.
       * 
       * # <weight>
       * - Complexity: O(1).
       * - DbReads: `Proposals`, `Approvals`
       * - DbWrite: `Approvals`
       * # </weight>
       **/
      approveProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Put forward a suggestion for spending. A deposit proportional to the value
       * is reserved and slashed if the proposal is rejected. It is returned once the
       * proposal is awarded.
       * 
       * # <weight>
       * - Complexity: O(1)
       * - DbReads: `ProposalCount`, `origin account`
       * - DbWrites: `ProposalCount`, `Proposals`, `origin account`
       * # </weight>
       **/
      proposeSpend: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, beneficiary: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, AccountId32]>;
      /**
       * Reject a proposed spend. The original deposit will be slashed.
       * 
       * May only be called from `T::RejectOrigin`.
       * 
       * # <weight>
       * - Complexity: O(1)
       * - DbReads: `Proposals`, `rejected proposer account`
       * - DbWrites: `Proposals`, `rejected proposer account`
       * # </weight>
       **/
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      /**
       * Send a call through an indexed pseudonym of the sender.
       * 
       * Filter from origin are passed along. The call will be dispatched with an origin which
       * use the same filter as the origin of this call.
       * 
       * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
       * because you expect `proxy` to have been used prior in the call stack and you do not want
       * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
       * in the Multisig pallet instead.
       * 
       * NOTE: Prior to version *12, this was called `as_limited_sub`.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      asDerivative: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Call]>;
      /**
       * Send a batch of dispatch calls.
       * 
       * May be called from any origin.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * # <weight>
       * - Complexity: O(C) where C is the number of calls to be batched.
       * # </weight>
       * 
       * This will return `Ok` in all circumstances. To determine the success of the batch, an
       * event is deposited. If a call failed and the batch was interrupted, then the
       * `BatchInterrupted` event is deposited, along with the number of successful calls made
       * and the error of the failed call. If all were successful, then the `BatchCompleted`
       * event is deposited.
       **/
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | { callIndex?: any; args?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Send a batch of dispatch calls and atomically execute them.
       * The whole transaction will rollback and fail if any of the calls failed.
       * 
       * May be called from any origin.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * # <weight>
       * - Complexity: O(C) where C is the number of calls to be batched.
       * # </weight>
       **/
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | { callIndex?: any; args?: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatches a function call with a provided origin.
       * 
       * The dispatch origin for this call must be _Root_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
       * # </weight>
       **/
      dispatchAs: AugmentedSubmittable<(asOrigin: CennznetRuntimeOriginCaller | { system: any } | { Void: any } | { Ethereum: any } | string | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CennznetRuntimeOriginCaller, Call]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
