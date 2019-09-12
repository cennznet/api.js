// Copyright 2019 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { Api } = require('@cennznet/api');
const { Attestation } = require('../dist');

const { SimpleKeyring, Wallet } = require('@cennznet/wallet');
const { stringToU8a } = require('@cennznet/util');
const simpleKeyring = new SimpleKeyring();
const wallet = new Wallet();

const issuer = {
  address: '5FPCjwLUkeg48EDYcW5i4b45HLzmCn4aUbx5rsCsdtPbTsKT',
  seed: stringToU8a('cennznetjstest'.padEnd(32, ' ')),
};

const holder = {
  address: '5EfqejHV2xUUTdmUVBH7PrQL3edtMm1NQVtvCgoYd8RumaP3',
  seed: stringToU8a('cennznetjstest2'.padEnd(32, ' ')),
};

async function main() {
  simpleKeyring.addFromSeed(issuer.seed);
  const api = await Api.create({
    provider: 'wss://cennznet-node-0.centrality.me:9944',
  });
  const passphrase = '<insert issuer passphrase here>';
  await wallet.createNewVault(passphrase);
  await wallet.addKeyring(simpleKeyring);
  api.setSigner(wallet);
  const attestation = new Attestation(api);

  const topic = 'test';
  const value = '1234';
  const claim = await attestation.setClaim(holder.address, topic, value);

  await claim.signAndSend(issuer.address, async result => {
    if (result.type === 'Finalised' && result.events !== undefined) {
      const { data } = result.events[0].event.toJSON();
      console.log(data);
    }
  });
}
main();
