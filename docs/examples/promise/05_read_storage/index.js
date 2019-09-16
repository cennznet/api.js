// @ts-check
// Import the API
const { Api } = require('@cennznet/api');

// Our address for Alice on the dev chain
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

const STAKING_ASSET = 16000;

async function main () {
  // Create our API with a default connection to the local node
  const api = await Api.create();

  // Make our basic chain state/storage queries, all in one go
  const [accountNonce, now, validators] = await Promise.all([
    api.query.system.accountNonce(ALICE),
    api.query.timestamp.now(),
    api.query.session.validators()
  ]);

  console.log(`accountNonce(${ALICE}) ${accountNonce}`);
  console.log(`last block timestamp ${now.toNumber()}`);

  if (validators && validators.length > 0) {
    // Retrieve the balances for all validators
    const validatorBalances = await Promise.all(
        validators.map(authorityId =>
            api.query.genericAsset.freeBalance(STAKING_ASSET, authorityId)
        )
    );

    // Print out the authorityIds and balances of all validators
    console.log('validators', validators.map((authorityId, index) => ({
      address: authorityId.toString(),
      balance: validatorBalances[index].toString()
    })));
  }
}

main().catch(console.error).finally(_ => process.exit());
