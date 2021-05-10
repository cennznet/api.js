// Copyright 2019-2020 Centrality Investments Limited
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

import { Api } from '../../src/Api';
import staticMetadata from '../../src/staticMetadata';
import config from '../../../../config';
import { Metadata } from '@polkadot/metadata';

describe('e2e api create', () => {
  let api;

  it('Should get rejected if it is not resolved in a specific period of time', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    await expect(Api.create({provider, timeout: 1})).rejects.toThrow(
        'Timed out in 1 ms.');
  });

  it('For local chain - checking if static metadata is same as latest', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    api = await Api.create({provider});
    let targetVersion = api.runtimeVersion.specVersion;
    let matchingVersions = Object.keys(staticMetadata).filter(v => v.includes(targetVersion));
    // only one metadata per protocol version
    expect(matchingVersions.length).toEqual(1);
    let meta = matchingVersions[0];
    expect(meta).toBeDefined();
    expect(new Metadata(api.registry, meta).asLatest).toEqual(api.runtimeMetadata.asLatest);
  });

  afterEach(async () => {
    try {
      if (api.isConnected) {
        await api.disconnect();
      }
    } catch (e) {}
  });

  it('Should create an Api instance with the timeout option', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    api = await Api.create({provider, timeout: 1000000});

    const hash = await api.rpc.chain.getBlockHash();

    expect(hash).toBeDefined();
  });

  it('Creating extrinsic payload via registry with no transaction payment', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    api = await Api.create({provider});
    const payload = {
      address: "5FWnYjJEKK9Kxi34XZBAT1WYNKuRw6mmwD9DsonBu3eaBUp3",
      blockHash: "0x6614a99d9046da1f9588c5766f3eb5d5bf561081cd3a7990fc1e3e269f35367e",
      blockNumber: "0x00000a3b",
      era: "0xb603",
      genesisHash: "0xb492b8652211d9982a7475d1a4dd0c4790d8ba1a55f69515e4270ed94528e5a2",
      method: "0x040105fabe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f419c",
      nonce: "0x0000000000000000",
      signedExtensions: ["CheckSpecVersion", "CheckTxVersion", "CheckGenesis", "CheckMortality", "CheckNonce", "CheckWeight", "ChargeTransactionPayment"],
      specVersion: "0x00000026",
      tip: null,
      transactionPayment: {tip: 0, feeExchange: null},
      transactionVersion: "0x00000005",
      version: 4
    };
    const extPayload = api.registry.createType('ExtrinsicPayload', payload, { version: 4 });
    expect(extPayload.toHuman().transactionPayment).toEqual({tip: '0', feeExchange: null});
  });

  it('Creating extrinsic payload via registry with transaction payment option', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    api = await Api.create({provider});
    const maxPayment = 50_000_000_000;
    const assetId = api.registry.createType('AssetId', 16000);
    const feeExchange = api.registry.createType('FeeExchange', {assetId, maxPayment}, 0);
    const payload = {
      address: "5FWnYjJEKK9Kxi34XZBAT1WYNKuRw6mmwD9DsonBu3eaBUp3",
      blockHash: "0x6614a99d9046da1f9588c5766f3eb5d5bf561081cd3a7990fc1e3e269f35367e",
      blockNumber: "0x00000a3b",
      era: "0xb603",
      genesisHash: "0xb492b8652211d9982a7475d1a4dd0c4790d8ba1a55f69515e4270ed94528e5a2",
      method: "0x040105fabe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f419c",
      nonce: "0x0000000000000000",
      signedExtensions: ["CheckSpecVersion", "CheckTxVersion", "CheckGenesis", "CheckMortality", "CheckNonce", "CheckWeight", "ChargeTransactionPayment"],
      specVersion: "0x00000026",
      tip: null,
      transactionPayment: {tip: 2, feeExchange},
      transactionVersion: "0x00000005",
      version: 4
    };
    const extPayload = api.registry.createType('ExtrinsicPayload', payload, { version: 4 });
    expect(extPayload.toHuman().transactionPayment).toEqual({tip: '2.0000 pUnit', feeExchange:{ FeeExchangeV1: { assetId: '16,000', maxPayment: '50.0000 mUnit' }}});
  });


  it('Should get rejected if the connection fails', async done => {
    const incorrectEndPoint = 'wss://rimu.unfrastructure.io/private/ws';
    await expect(Api.create({ provider: incorrectEndPoint })).rejects.toThrow('Connection fail');
    done();
  });

  // TODO - enable and update this test after runtime upgrade on Azalea
  it.skip('Use custom metadata and test it is used when creating API instance', async () => {
    const provider = 'wss://cennznet.unfrastructure.io/public/ws'; // Use Azalea
    const meta = '0x6d6574610c741853797374656d011853797374656d401c4163636f756e74010102244163636f756e7449642c4163636f756e74496e666f0030000000000000000000000000003845787472696e736963436f756e7400000c7533320400002c426c6f636b57656967687401004045787472696e7369637357656967687440000000000000000000000000000000000040416c6c45787472696e736963734c656e00000c75333204000024426c6f636b486173680101052c426c6f636b4e756d626572104861736800800000000000000000000000000000000000000000000000000000000000000000003445787472696e736963446174610101050c75333214427974657300040000184e756d62657201002c426c6f636b4e756d62657210000000000028506172656e744861736801001048617368800000000000000000000000000000000000000000000000000000000000000000003845787472696e73696373526f6f740100104861736880000000000000000000000000000000000000000000000000000000000000000000184469676573740100204469676573744f66040000184576656e74730100405665633c4576656e745265636f72643e040000284576656e74436f756e740100284576656e74496e6465781000000000002c4576656e74546f706963730101021048617368745665633c28426c6f636b4e756d6265722c4576656e74496e646578293e00040000484c61737452756e74696d65557067726164650000584c61737452756e74696d6555706772616465496e666f040000545570677261646564546f553332526566436f756e74010010626f6f6c04000038457865637574696f6e5068617365000014506861736504000001282866696c6c5f626c6f636b04185f726174696f1c50657262696c6c001872656d61726b041c5f72656d61726b14427974657300387365745f686561705f7061676573041470616765730c75363400207365745f636f64650410636f6465144279746573005c7365745f636f64655f776974686f75745f636865636b730410636f6465144279746573005c7365745f6368616e6765735f747269655f636f6e666967044c6368616e6765735f747269655f636f6e666967804f7074696f6e3c4368616e67657354726965436f6e66696775726174696f6e3e002c7365745f73746f7261676504146974656d73345665633c4b657956616c75653e00306b696c6c5f73746f7261676504106b657973205665633c4b65793e002c6b696c6c5f70726566697808187072656669780c4b6579205f7375626b6579730c753332001c73756963696465000000000000245363686564756c6572000118207363686564756c6510107768656e2c426c6f636b4e756d626572386d617962655f706572696f646963384f7074696f6e3c506572696f643e207072696f72697479205072696f726974791063616c6c1043616c6c001863616e63656c08107768656e2c426c6f636b4e756d62657214696e6465780c75333200387363686564756c655f6e616d656414086964144279746573107768656e2c426c6f636b4e756d626572386d617962655f706572696f646963384f7074696f6e3c506572696f643e207072696f72697479205072696f726974791063616c6c1043616c6c003063616e63656c5f6e616d65640408696414427974657300387363686564756c655f6166746572101461667465722c426c6f636b4e756d626572386d617962655f706572696f646963384f7074696f6e3c506572696f643e207072696f72697479205072696f726974791063616c6c1043616c6c00507363686564756c655f6e616d65645f6166746572140869641442797465731461667465722c426c6f636b4e756d626572386d617962655f706572696f646963384f7074696f6e3c506572696f643e207072696f72697479205072696f726974791063616c6c1043616c6c000000000110426162650001084c7265706f72745f65717569766f636174696f6e084865717569766f636174696f6e5f70726f6f66544261626545717569766f636174696f6e50726f6f663c6b65795f6f776e65725f70726f6f66344b65794f776e657250726f6f6600707265706f72745f65717569766f636174696f6e5f756e7369676e6564084865717569766f636174696f6e5f70726f6f66544261626545717569766f636174696f6e50726f6f663c6b65795f6f776e65725f70726f6f66344b65794f776e657250726f6f6600000000022454696d657374616d70012454696d657374616d70080c4e6f770100184d6f6d656e742000000000000000000024446964557064617465010010626f6f6c04000001040c736574040c6e6f773c436f6d706163743c4d6f6d656e743e00000000033047656e657269634173736574013047656e6572696341737365742434546f74616c49737375616e63650101051c417373657449641c42616c616e6365004000000000000000000000000000000000002c4672656542616c616e63650102051c41737365744964244163636f756e7449641c42616c616e6365024000000000000000000000000000000000003c526573657276656442616c616e63650102051c41737365744964244163636f756e7449641c42616c616e6365024000000000000000000000000000000000002c4e6578744173736574496401001c417373657449641000000000002c5065726d697373696f6e730101051c41737365744964485065726d697373696f6e56657273696f6e7300100000000000144c6f636b73010102244163636f756e744964405665633c42616c616e63654c6f636b3e00040000385374616b696e674173736574496401001c417373657449641000000000003c5370656e64696e674173736574496401001c417373657449641000000000002441737365744d6574610101051c41737365744964244173736574496e666f0008000400011c186372656174650c146f776e6572244163636f756e7449641c6f7074696f6e733041737365744f7074696f6e7310696e666f244173736574496e666f00207472616e736665720c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e7440436f6d706163743c42616c616e63653e00447570646174655f7065726d697373696f6e082061737365745f696440436f6d706163743c417373657449643e386e65775f7065726d697373696f6e405065726d697373696f6e4c617465737400447570646174655f61737365745f696e666f082061737365745f696440436f6d706163743c417373657449643e10696e666f244173736574496e666f00106d696e740c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e741c42616c616e636500106275726e0c2061737365745f696440436f6d706163743c417373657449643e18746172676574244163636f756e74496418616d6f756e741c42616c616e6365003c6372656174655f72657365727665640c2061737365745f69641c417373657449641c6f7074696f6e733041737365744f7074696f6e7310696e666f244173736574496e666f000000000428417574686f7273686970000104287365745f756e636c657304286e65775f756e636c65732c5665633c4865616465723e00000000051c5374616b696e6700015c10626f6e640c28636f6e74726f6c6c6572244163636f756e7449641476616c756548436f6d706163743c42616c616e63654f663e1470617965654452657761726444657374696e6174696f6e0028626f6e645f657874726104386d61785f6164646974696f6e616c48436f6d706163743c42616c616e63654f663e0018756e626f6e64041476616c756548436f6d706163743c42616c616e63654f663e004477697468647261775f756e626f6e64656400002076616c6964617465041470726566733856616c696461746f72507265667300206e6f6d696e617465041c74617267657473385665633c4163636f756e7449643e00146368696c6c0000247365745f7061796565041470617965654452657761726444657374696e6174696f6e00387365745f636f6e74726f6c6c65720428636f6e74726f6c6c6572244163636f756e744964004c7365745f76616c696461746f725f636f756e74040c6e657730436f6d706163743c7533323e0060696e6372656173655f76616c696461746f725f636f756e7404286164646974696f6e616c30436f6d706163743c7533323e0034666f7263655f6e6f5f65726173000034666f7263655f6e65775f6572610000407365745f6d696e696d756d5f626f6e64041476616c75652442616c616e63654f6600447365745f696e76756c6e657261626c6573042876616c696461746f7273385665633c4163636f756e7449643e0034666f7263655f756e7374616b6504147374617368244163636f756e7449640050666f7263655f6e65775f6572615f616c7761797300005463616e63656c5f64656665727265645f736c617368080c65726120457261496e64657834736c6173685f696e6469636573205665633c7533323e00187265626f6e64041476616c756548436f6d706163743c42616c616e63654f663e00447365745f686973746f72795f646570746808446e65775f686973746f72795f646570746844436f6d706163743c457261496e6465783e485f6572615f6974656d735f64656c6574656430436f6d706163743c7533323e0028726561705f737461736804147374617368244163636f756e74496400607375626d69745f656c656374696f6e5f736f6c7574696f6e141c77696e6e6572734c5665633c56616c696461746f72496e6465783e1c636f6d7061637448436f6d7061637441737369676e6d656e74731473636f726534456c656374696f6e53636f72650c65726120457261496e6465781073697a6530456c656374696f6e53697a6500847375626d69745f656c656374696f6e5f736f6c7574696f6e5f756e7369676e6564141c77696e6e6572734c5665633c56616c696461746f72496e6465783e1c636f6d7061637448436f6d7061637441737369676e6d656e74731473636f726534456c656374696f6e53636f72650c65726120457261496e6465781073697a6530456c656374696f6e53697a650000000006204f6666656e636573000100000000071c53657373696f6e000108207365745f6b65797308106b657973104b6579731470726f6f66144279746573002870757267655f6b6579730000000000081c4772616e64706100010c4c7265706f72745f65717569766f636174696f6e084865717569766f636174696f6e5f70726f6f66604772616e64706145717569766f636174696f6e50726f6f663c6b65795f6f776e65725f70726f6f66344b65794f776e657250726f6f6600707265706f72745f65717569766f636174696f6e5f756e7369676e6564084865717569766f636174696f6e5f70726f6f66604772616e64706145717569766f636174696f6e50726f6f663c6b65795f6f776e65725f70726f6f66344b65794f776e657250726f6f6600306e6f74655f7374616c6c6564081464656c61792c426c6f636b4e756d6265726c626573745f66696e616c697a65645f626c6f636b5f6e756d6265722c426c6f636b4e756d626572000000000a20496d4f6e6c696e6500010424686561727462656174082468656172746265617424486561727462656174285f7369676e6174757265245369676e6174757265000000000b48417574686f72697479446973636f766572790001000000000c105375646f000110107375646f041063616c6c1043616c6c00547375646f5f756e636865636b65645f776569676874081063616c6c1043616c6c1c5f77656967687418576569676874001c7365745f6b6579040c6e6577304c6f6f6b7570536f75726365001c7375646f5f6173080c77686f304c6f6f6b7570536f757263651063616c6c1043616c6c000000000d2054726561737572790001443470726f706f73655f7370656e64081476616c756548436f6d706163743c42616c616e63654f663e2c62656e6566696369617279304c6f6f6b7570536f75726365003c72656a6563745f70726f706f73616c042c70726f706f73616c5f696458436f6d706163743c50726f706f73616c496e6465783e0040617070726f76655f70726f706f73616c042c70726f706f73616c5f696458436f6d706163743c50726f706f73616c496e6465783e00387265706f72745f617765736f6d650818726561736f6e1442797465730c77686f244163636f756e744964002c726574726163745f7469700410686173681048617368001c7469705f6e65770c18726561736f6e1442797465730c77686f244163636f756e744964247469705f76616c756548436f6d706163743c42616c616e63654f663e000c7469700810686173681048617368247469705f76616c756548436f6d706163743c42616c616e63654f663e0024636c6f73655f7469700410686173681048617368003870726f706f73655f626f756e7479081476616c756548436f6d706163743c42616c616e63654f663e2c6465736372697074696f6e1442797465730038617070726f76655f626f756e74790424626f756e74795f696458436f6d706163743c50726f706f73616c496e6465783e003c70726f706f73655f63757261746f720c24626f756e74795f696458436f6d706163743c50726f706f73616c496e6465783e1c63757261746f72304c6f6f6b7570536f757263650c66656548436f6d706163743c42616c616e63654f663e0040756e61737369676e5f63757261746f720424626f756e74795f696458436f6d706163743c50726f706f73616c496e6465783e00386163636570745f63757261746f720424626f756e74795f696458436f6d706163743c50726f706f73616c496e6465783e003061776172645f626f756e74790824626f756e74795f696458436f6d706163743c50726f706f73616c496e6465783e2c62656e6566696369617279304c6f6f6b7570536f757263650030636c61696d5f626f756e74790424626f756e74795f696450436f6d706163743c426f756e7479496e6465783e0030636c6f73655f626f756e74790424626f756e74795f696450436f6d706163743c426f756e7479496e6465783e0050657874656e645f626f756e74795f6578706972790824626f756e74795f696450436f6d706163743c426f756e7479496e6465783e1c5f72656d61726b144279746573000000000e1c5574696c697479000108146261746368041463616c6c73245665633c43616c6c3e003461735f646572697661746976650814696e6465780c7531361063616c6c1043616c6c000000000f204964656e7469747900013c346164645f726567697374726172041c6163636f756e74244163636f756e74496400307365745f6964656e746974790410696e666f304964656e74697479496e666f00207365745f73756273041073756273545665633c284163636f756e7449642c44617461293e0038636c6561725f6964656e74697479000044726571756573745f6a756467656d656e7408247265675f696e6465785c436f6d706163743c526567697374726172496e6465783e1c6d61785f66656548436f6d706163743c42616c616e63654f663e003863616e63656c5f7265717565737404247265675f696e64657838526567697374726172496e646578001c7365745f6665650814696e6465785c436f6d706163743c526567697374726172496e6465783e0c66656548436f6d706163743c42616c616e63654f663e00387365745f6163636f756e745f69640814696e6465785c436f6d706163743c526567697374726172496e6465783e0c6e6577244163636f756e74496400287365745f6669656c64730814696e6465785c436f6d706163743c526567697374726172496e6465783e186669656c6473384964656e746974794669656c6473004470726f766964655f6a756467656d656e740c247265675f696e6465785c436f6d706163743c526567697374726172496e6465783e18746172676574304c6f6f6b7570536f75726365246a756467656d656e74444964656e746974794a756467656d656e7400346b696c6c5f6964656e746974790418746172676574304c6f6f6b7570536f75726365001c6164645f737562080c737562304c6f6f6b7570536f7572636510646174611044617461002872656e616d655f737562080c737562304c6f6f6b7570536f7572636510646174611044617461002872656d6f76655f737562040c737562304c6f6f6b7570536f757263650020717569745f737562000000000010485472616e73616374696f6e5061796d656e7401485472616e73616374696f6e5061796d656e7408444e6578744665654d756c7469706c6965720100284d756c7469706c69657240000064a7b3b6e00d0000000000000000003853746f7261676556657273696f6e01002052656c65617365730400000000000011204d756c74697369670001105061735f6d756c74695f7468726573686f6c645f3108446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e1063616c6c1043616c6c002061735f6d756c746918247468726573686f6c640c753136446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e3c6d617962655f74696d65706f696e74444f7074696f6e3c54696d65706f696e743e1063616c6c284f706171756543616c6c2873746f72655f63616c6c10626f6f6c286d61785f776569676874185765696768740040617070726f76655f61735f6d756c746914247468726573686f6c640c753136446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e3c6d617962655f74696d65706f696e74444f7074696f6e3c54696d65706f696e743e2463616c6c5f686173681c5b75383b33325d286d61785f77656967687418576569676874003c63616e63656c5f61735f6d756c746910247468726573686f6c640c753136446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e2474696d65706f696e742454696d65706f696e742463616c6c5f686173681c5b75383b33325d00000000126052616e646f6d6e657373436f6c6c656374697665466c697000000000001328486973746f726963616c0000000000141843656e6e7a78011843656e6e7a78102c436f72654173736574496401001c417373657449641000000000003844656661756c744665655261746501001c4665655261746540000000000000000000000000000000000038546f74616c4c69717569646974790101052c45786368616e67654b65792442616c616e63654f6600400000000000000000000000000000000000404c697175696469747942616c616e63650102052c45786368616e67654b6579244163636f756e7449642442616c616e63654f66024000000000000000000000000000000000000114246275795f61737365741424726563697069656e74444f7074696f6e3c4163636f756e7449643e3461737365745f746f5f73656c6c40436f6d706163743c417373657449643e3061737365745f746f5f62757940436f6d706163743c417373657449643e286275795f616d6f756e7448436f6d706163743c42616c616e63654f663e306d6178696d756d5f73656c6c48436f6d706163743c42616c616e63654f663e002873656c6c5f61737365741424726563697069656e74444f7074696f6e3c4163636f756e7449643e3461737365745f746f5f73656c6c40436f6d706163743c417373657449643e3061737365745f746f5f62757940436f6d706163743c417373657449643e2c73656c6c5f616d6f756e7448436f6d706163743c42616c616e63654f663e2c6d696e696d756d5f62757948436f6d706163743c42616c616e63654f663e00346164645f6c6971756964697479102061737365745f696440436f6d706163743c417373657449643e346d696e5f6c697175696469747948436f6d706163743c42616c616e63654f663e406d61785f61737365745f616d6f756e7448436f6d706163743c42616c616e63654f663e2c636f72655f616d6f756e7448436f6d706163743c42616c616e63654f663e004072656d6f76655f6c6971756964697479102061737365745f696440436f6d706163743c417373657449643e546c69717569646974795f746f5f776974686472617748436f6d706163743c42616c616e63654f663e486d696e5f61737365745f776974686472617748436f6d706163743c42616c616e63654f663e446d696e5f636f72655f776974686472617748436f6d706163743c42616c616e63654f663e00307365745f6665655f7261746504306e65775f6665655f726174651c4665655261746500000000152853796c6f47726f757073000100000000162053796c6f45324545000100000000172853796c6f446576696365000100000000182453796c6f496e626f78000100000000193053796c6f526573706f6e73650001000000001a2453796c6f5661756c740001000000001b2c4174746573746174696f6e000108247365745f636c61696d0c18686f6c646572244163636f756e74496414746f706963404174746573746174696f6e546f7069631476616c7565404174746573746174696f6e56616c7565003072656d6f76655f636c61696d0818686f6c646572244163636f756e74496414746f706963404174746573746174696f6e546f706963000000001c1c5265776172647300010c487365745f696e666c6174696f6e5f7261746508246e756d657261746f720c7536342c64656e6f6d696e61746f720c75363400647365745f646576656c6f706d656e745f66756e645f74616b6504406e65775f74616b655f70657263656e740c7533320050666f7263655f6e65775f66697363616c5f65726100000000001d041c40436865636b5370656356657273696f6e38436865636b547856657273696f6e30436865636b47656e6573697338436865636b4d6f7274616c69747928436865636b4e6f6e63652c436865636b576569676874604368617267655472616e73616374696f6e5061796d656e74';
    const genesisHash_runtimeVersion = '0x0d0971c150a9741b8719b3c6c9c2e96ec5b2e3fb83641af868e6650f3e263ef0-39';
    let metadata = {};
    metadata[genesisHash_runtimeVersion] = meta;
    api = await Api.create({provider, metadata});
    // expect(api.runtimeMetadata.toHex()).toEqual(new Metadata(api.registry, meta).toHex());
    console.log('API query::', api.query.genericAsset);
    console.log('API tx::', api.tx.genericAsset);
  });
});
