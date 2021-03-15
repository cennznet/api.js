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
    const meta = staticMetadata[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`];
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
    const meta = '0x6d6574610b7c1853797374656d011853797374656d3c304163636f756e744e6f6e6365010102244163636f756e74496414496e64657800200000000000000000003845787472696e736963436f756e7400000c7533320400004c416c6c45787472696e7369637357656967687400001857656967687404000040416c6c45787472696e736963734c656e00000c75333204000024426c6f636b486173680101052c426c6f636b4e756d626572104861736800800000000000000000000000000000000000000000000000000000000000000000003445787472696e736963446174610101050c75333214427974657300040000184e756d62657201002c426c6f636b4e756d62657210000000000028506172656e744861736801001048617368800000000000000000000000000000000000000000000000000000000000000000003845787472696e73696373526f6f740100104861736880000000000000000000000000000000000000000000000000000000000000000000184469676573740100204469676573744f66040000184576656e74730100405665633c4576656e745265636f72643e040000284576656e74436f756e740100284576656e74496e6465781000000000002c4576656e74546f706963730101021048617368745665633c28426c6f636b4e756d6265722c4576656e74496e646578293e00040000484c61737452756e74696d65557067726164650000584c61737452756e74696d6555706772616465496e666f04000038457865637574696f6e5068617365000014506861736504000001242866696c6c5f626c6f636b04185f726174696f1c50657262696c6c001872656d61726b041c5f72656d61726b14427974657300387365745f686561705f7061676573041470616765730c75363400207365745f636f64650410636f6465144279746573005c7365745f636f64655f776974686f75745f636865636b730410636f6465144279746573005c7365745f6368616e6765735f747269655f636f6e666967044c6368616e6765735f747269655f636f6e666967804f7074696f6e3c4368616e67657354726965436f6e66696775726174696f6e3e002c7365745f73746f7261676504146974656d73345665633c4b657956616c75653e00306b696c6c5f73746f7261676504106b657973205665633c4b65793e002c6b696c6c5f70726566697804187072656669780c4b657900010c4045787472696e7369635375636365737304304469737061746368496e666f003c45787472696e7369634661696c6564083444697370617463684572726f72304469737061746368496e666f002c436f6465557064617465640000000c3c496e76616c6964537065634e616d6500685370656356657273696f6e4e65656473546f496e63726561736500744661696c6564546f4578747261637452756e74696d6556657273696f6e001c5574696c697479000114146261746368041463616c6c73245665633c43616c6c3e001861735f7375620814696e6465780c7531361063616c6c1043616c6c002061735f6d756c746910247468726573686f6c640c753136446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e3c6d617962655f74696d65706f696e74444f7074696f6e3c54696d65706f696e743e1063616c6c1043616c6c0040617070726f76655f61735f6d756c746910247468726573686f6c640c753136446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e3c6d617962655f74696d65706f696e74444f7074696f6e3c54696d65706f696e743e2463616c6c5f686173681c5b75383b33325d003c63616e63656c5f61735f6d756c746910247468726573686f6c640c753136446f746865725f7369676e61746f72696573385665633c4163636f756e7449643e2474696d65706f696e742454696d65706f696e742463616c6c5f686173681c5b75383b33325d000118404261746368496e746572727570746564080c7533323444697370617463684572726f7200384261746368436f6d706c6574656400002c4e65774d756c746973696708244163636f756e744964244163636f756e74496400404d756c7469736967417070726f76616c0c244163636f756e7449642454696d65706f696e74244163636f756e74496400404d756c7469736967457865637574656410244163636f756e7449642454696d65706f696e74244163636f756e744964384469737061746368526573756c7400444d756c746973696743616e63656c6c65640c244163636f756e7449642454696d65706f696e74244163636f756e74496400000010426162650001000000002454696d657374616d70012454696d657374616d70080c4e6f770100184d6f6d656e742000000000000000000024446964557064617465010010626f6f6c04000001040c736574040c6e6f773c436f6d706163743c4d6f6d656e743e000004344d696e696d756d506572696f64184d6f6d656e7420c40900000000000000002c4174746573746174696f6e000108247365745f636c61696d0c18686f6c646572244163636f756e74496414746f706963404174746573746174696f6e546f7069631476616c7565404174746573746174696f6e56616c7565003072656d6f76655f636c61696d0818686f6c646572244163636f756e74496414746f706963404174746573746174696f6e546f70696300010c30436c61696d4372656174656410244163636f756e744964244163636f756e744964404174746573746174696f6e546f706963404174746573746174696f6e56616c75650030436c61696d52656d6f7665640c244163636f756e744964244163636f756e744964404174746573746174696f6e546f7069630030436c61696d5570646174656410244163636f756e744964244163636f756e744964404174746573746174696f6e546f706963404174746573746174696f6e56616c7565000000485472616e73616374696f6e5061796d656e7401485472616e73616374696f6e5061796d656e7404444e6578744665654d756c7469706c6965720100284d756c7469706c69657220000000000000000000000008485472616e73616374696f6e426173654665652442616c616e63654f66400010a5d4e8000000000000000000000000485472616e73616374696f6e427974654665652442616c616e63654f664000e40b5402000000000000000000000000003047656e657269634173736574013047656e6572696341737365742434546f74616c49737375616e63650101051c417373657449641c42616c616e6365004000000000000000000000000000000000002c4672656542616c616e63650102051c41737365744964244163636f756e7449641c42616c616e6365024000000000000000000000000000000000003c526573657276656442616c616e63650102051c41737365744964244163636f756e7449641c42616c616e6365024000000000000000000000000000000000002c4e6578744173736574496401001c417373657449641000000000002c5065726d697373696f6e730101051c41737365744964485065726d697373696f6e56657273696f6e7300100000000000144c6f636b73010102244163636f756e744964405665633c42616c616e63654c6f636b3e00040000385374616b696e674173736574496401001c417373657449641000000000003c5370656e64696e674173736574496401001c417373657449641000000000002441737365744d6574610101051c41737365744964244173736574496e666f0008000400011c186372656174650c146f776e6572244163636f756e7449641c6f7074696f6e733041737365744f7074696f6e7310696e666f244173736574496e666f00207472616e736665720c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e7440436f6d706163743c42616c616e63653e00447570646174655f7065726d697373696f6e082061737365745f696440436f6d706163743c417373657449643e386e65775f7065726d697373696f6e405065726d697373696f6e4c617465737400447570646174655f61737365745f696e666f082061737365745f696440436f6d706163743c417373657449643e10696e666f244173736574496e666f00106d696e740c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e741c42616c616e636500106275726e0c2061737365745f696440436f6d706163743c417373657449643e18746172676574244163636f756e74496418616d6f756e741c42616c616e6365003c6372656174655f72657365727665640c2061737365745f69641c417373657449641c6f7074696f6e733041737365744f7074696f6e7310696e666f244173736574496e666f0001181c437265617465640c1c41737365744964244163636f756e7449643041737365744f7074696f6e73002c5472616e73666572726564101c41737365744964244163636f756e744964244163636f756e7449641c42616c616e636500445065726d697373696f6e55706461746564081c41737365744964405065726d697373696f6e4c617465737400404173736574496e666f55706461746564081c41737365744964244173736574496e666f00184d696e7465640c1c41737365744964244163636f756e7449641c42616c616e636500184275726e65640c1c41737365744964244163636f756e7449641c42616c616e6365000038404173736574496445786861757374656400285a65726f416d6f756e7400484e6f5570646174655065726d697373696f6e00404e6f4d696e745065726d697373696f6e00404e6f4275726e5065726d697373696f6e0050546f74616c4d696e74696e674f766572666c6f77004c467265654d696e74696e674f766572666c6f770054546f74616c4275726e696e67556e646572666c6f770050467265654275726e696e67556e646572666c6f77003441737365744964457869737473003c417373657449644e6f744578697374004c496e73756666696369656e7442616c616e636500405472616e736665724f766572666c6f7700544c69717569646974795265737472696374696f6e73001c5374616b696e6700014810626f6e640c28636f6e74726f6c6c6572304c6f6f6b7570536f757263651476616c756548436f6d706163743c42616c616e63654f663e1470617965654452657761726444657374696e6174696f6e0028626f6e645f657874726104386d61785f6164646974696f6e616c48436f6d706163743c42616c616e63654f663e0018756e626f6e64041476616c756548436f6d706163743c42616c616e63654f663e004477697468647261775f756e626f6e64656400002076616c6964617465041470726566733856616c696461746f72507265667300206e6f6d696e617465041c74617267657473445665633c4c6f6f6b7570536f757263653e00146368696c6c0000247365745f7061796565041470617965654452657761726444657374696e6174696f6e00387365745f636f6e74726f6c6c65720428636f6e74726f6c6c6572304c6f6f6b7570536f75726365004c7365745f76616c696461746f725f636f756e74040c6e657730436f6d706163743c7533323e0034666f7263655f6e6f5f65726173000034666f7263655f6e65775f6572610000407365745f6d696e696d756d5f626f6e64041476616c75652442616c616e63654f6600447365745f696e76756c6e657261626c6573042876616c696461746f7273385665633c4163636f756e7449643e0034666f7263655f756e7374616b6504147374617368244163636f756e7449640050666f7263655f6e65775f6572615f616c7761797300005463616e63656c5f64656665727265645f736c617368080c65726120457261496e64657834736c6173685f696e6469636573205665633c7533323e00187265626f6e64041476616c756548436f6d706163743c42616c616e63654f663e00011c18526577617264083452657761726442616c616e63653452657761726442616c616e6365002852657761726446656573083452657761726442616c616e63650c7533320014536c61736808244163636f756e7449641c42616c616e63650058496e76756c6e657261626c654e6f74536c617368656408244163636f756e7449641c50657262696c6c00684f6c64536c617368696e675265706f7274446973636172646564043053657373696f6e496e6465780040536574496e76756c6e657261626c657304385665633c4163636f756e7449643e00385365744d696e696d756d426f6e64041c42616c616e63650000001c53657373696f6e000108207365745f6b65797308106b657973104b6579731470726f6f66144279746573002870757267655f6b65797300000104284e657753657373696f6e043053657373696f6e496e64657800000028417574686f7273686970000104287365745f756e636c657304286e65775f756e636c65732c5665633c4865616465723e000000001c436f756e63696c0001142c7365745f6d656d62657273082c6e65775f6d656d62657273385665633c4163636f756e7449643e147072696d65444f7074696f6e3c4163636f756e7449643e001c65786563757465042070726f706f73616c2050726f706f73616c001c70726f706f736508247468726573686f6c6450436f6d706163743c4d656d626572436f756e743e2070726f706f73616c2050726f706f73616c0010766f74650c2070726f706f73616c104861736814696e64657858436f6d706163743c50726f706f73616c496e6465783e1c617070726f766510626f6f6c0014636c6f7365082070726f706f73616c104861736814696e64657858436f6d706163743c50726f706f73616c496e6465783e00011c2050726f706f73656410244163636f756e7449643450726f706f73616c496e64657810486173682c4d656d626572436f756e740014566f74656414244163636f756e744964104861736810626f6f6c2c4d656d626572436f756e742c4d656d626572436f756e740020417070726f766564041048617368002c446973617070726f7665640410486173680020457865637574656408104861736810626f6f6c00384d656d626572457865637574656408104861736810626f6f6c0018436c6f7365640c10486173682c4d656d626572436f756e742c4d656d626572436f756e7400000048546563686e6963616c436f6d6d69747465650001142c7365745f6d656d62657273082c6e65775f6d656d62657273385665633c4163636f756e7449643e147072696d65444f7074696f6e3c4163636f756e7449643e001c65786563757465042070726f706f73616c2050726f706f73616c001c70726f706f736508247468726573686f6c6450436f6d706163743c4d656d626572436f756e743e2070726f706f73616c2050726f706f73616c0010766f74650c2070726f706f73616c104861736814696e64657858436f6d706163743c50726f706f73616c496e6465783e1c617070726f766510626f6f6c0014636c6f7365082070726f706f73616c104861736814696e64657858436f6d706163743c50726f706f73616c496e6465783e00011c2050726f706f73656410244163636f756e7449643450726f706f73616c496e64657810486173682c4d656d626572436f756e740014566f74656414244163636f756e744964104861736810626f6f6c2c4d656d626572436f756e742c4d656d626572436f756e740020417070726f766564041048617368002c446973617070726f7665640410486173680020457865637574656408104861736810626f6f6c00384d656d626572457865637574656408104861736810626f6f6c0018436c6f7365640c10486173682c4d656d626572436f756e742c4d656d626572436f756e7400000024456c656374696f6e7300011810766f74650814766f746573385665633c4163636f756e7449643e1476616c756548436f6d706163743c42616c616e63654f663e003072656d6f76655f766f7465720000507265706f72745f646566756e63745f766f7465720418746172676574304c6f6f6b7570536f7572636500407375626d69745f63616e64696461637900004872656e6f756e63655f63616e64696461637900003472656d6f76655f6d656d626572040c77686f304c6f6f6b7570536f757263650001141c4e65775465726d04605665633c284163636f756e7449642c42616c616e6365293e0024456d7074795465726d0000304d656d6265724b69636b656404244163636f756e744964003c4d656d62657252656e6f756e63656404244163636f756e7449640034566f7465725265706f727465640c244163636f756e744964244163636f756e74496410626f6f6c0000004c546563686e6963616c4d656d6265727368697000011c286164645f6d656d626572040c77686f244163636f756e744964003472656d6f76655f6d656d626572040c77686f244163636f756e744964002c737761705f6d656d626572081872656d6f7665244163636f756e7449640c616464244163636f756e744964003472657365745f6d656d62657273041c6d656d62657273385665633c4163636f756e7449643e00286368616e67655f6b6579040c6e6577244163636f756e74496400247365745f7072696d65040c77686f244163636f756e744964002c636c6561725f7072696d65000001182c4d656d62657241646465640000344d656d62657252656d6f7665640000384d656d62657273537761707065640000304d656d6265727352657365740000284b65794368616e67656400001444756d6d79042c5068616e746f6d446174610000003c46696e616c697479547261636b65720001042866696e616c5f68696e74041068696e7450436f6d706163743c426c6f636b4e756d6265723e000000001c4772616e647061000104487265706f72745f6d69736265686176696f72041c5f7265706f727414427974657300010c384e6577417574686f7269746965730434417574686f726974794c697374001850617573656400001c526573756d6564000000002054726561737572790001203470726f706f73655f7370656e64081476616c756548436f6d706163743c42616c616e63654f663e2c62656e6566696369617279304c6f6f6b7570536f75726365003c72656a6563745f70726f706f73616c042c70726f706f73616c5f696458436f6d706163743c50726f706f73616c496e6465783e0040617070726f76655f70726f706f73616c042c70726f706f73616c5f696458436f6d706163743c50726f706f73616c496e6465783e00387265706f72745f617765736f6d650818726561736f6e1442797465730c77686f244163636f756e744964002c726574726163745f7469700410686173681048617368001c7469705f6e65770c18726561736f6e1442797465730c77686f244163636f756e744964247469705f76616c75652442616c616e63654f66000c7469700810686173681048617368247469705f76616c75652442616c616e63654f660024636c6f73655f746970041068617368104861736800012c2050726f706f736564043450726f706f73616c496e64657800205370656e64696e67041c42616c616e6365001c417761726465640c3450726f706f73616c496e6465781c42616c616e6365244163636f756e744964002052656a6563746564083450726f706f73616c496e6465781c42616c616e636500144275726e74041c42616c616e63650020526f6c6c6f766572041c42616c616e6365001c4465706f736974041c42616c616e636500184e65775469700410486173680028546970436c6f73696e670410486173680024546970436c6f7365640c1048617368244163636f756e7449641c42616c616e6365003054697052657472616374656404104861736800000024436f6e7472616374730001143c7570646174655f7363686564756c6504207363686564756c65205363686564756c6500207075745f636f646508246761735f6c696d697430436f6d706163743c4761733e10636f6465144279746573001063616c6c101064657374304c6f6f6b7570536f757263651476616c756548436f6d706163743c42616c616e63654f663e246761735f6c696d697430436f6d706163743c4761733e1064617461144279746573002c696e7374616e74696174651024656e646f776d656e7448436f6d706163743c42616c616e63654f663e246761735f6c696d697430436f6d706163743c4761733e24636f64655f6861736820436f6465486173681064617461144279746573003c636c61696d5f737572636861726765081064657374244163636f756e744964286175785f73656e646572444f7074696f6e3c4163636f756e7449643e000124205472616e736665720c244163636f756e744964244163636f756e7449641c42616c616e63650030496e7374616e74696174656408244163636f756e744964244163636f756e744964001c4576696374656408244163636f756e74496410626f6f6c0020526573746f72656414244163636f756e744964244163636f756e74496410486173681c42616c616e636510626f6f6c0028436f646553746f726564041048617368003c5363686564756c6555706461746564040c753332004c44656c656761746564446973706174636865640c244163636f756e74496420446f7567686e757410626f6f6c00284469737061746368656408244163636f756e74496410626f6f6c0044436f6e7472616374457865637574696f6e08244163636f756e744964144279746573000000105375646f00010c107375646f041063616c6c1043616c6c001c7365745f6b6579040c6e6577304c6f6f6b7570536f75726365001c7375646f5f6173080c77686f304c6f6f6b7570536f757263651063616c6c1043616c6c00010c1453756469640410626f6f6c00284b65794368616e67656404244163636f756e74496400285375646f4173446f6e650410626f6f6c00000020496d4f6e6c696e6500010424686561727462656174082468656172746265617424486561727462656174285f7369676e6174757265245369676e617475726500010c444865617274626561745265636569766564042c417574686f726974794964001c416c6c476f6f6400002c536f6d654f66666c696e6504605665633c4964656e74696669636174696f6e5475706c653e00000048417574686f72697479446973636f76657279000100000000204f6666656e63657300010001041c4f6666656e636508104b696e64384f706171756554696d65536c6f740000006052616e646f6d6e657373436f6c6c656374697665466c69700001000000002853796c6f47726f757073012853796c6f47726f7570730c1847726f75707301010210486173681447726f7570008c0000000000000000000000000000000000000000000000000000000000000000000000002c4d656d6265727368697073010102244163636f756e744964245665633c486173683e00040000344d656d626572446576696365730101021048617368645665633c284163636f756e7449642c4465766963654964293e00040000011c306372656174655f67726f7570102067726f75705f69641048617368106d657461104d6574611c696e76697465732c5665633c496e766974653e2867726f75705f6461746154285661756c744b65792c5661756c7456616c756529002c6c656176655f67726f7570082067726f75705f696410486173682467726f75705f6b6579404f7074696f6e3c5661756c744b65793e00347570646174655f6d656d626572082067726f75705f69641048617368106d657461104d65746100447570736572745f67726f75705f6d657461082067726f75705f69641048617368106d657461104d65746100386372656174655f696e7669746573082067726f75705f696410486173681c696e76697465732c5665633c496e766974653e00346163636570745f696e76697465182067726f75705f696410486173681c7061796c6f6164344163636570745061796c6f616428696e766974655f6b6579104832353620696e626f785f69640c753332247369676e617475726548656432353531393a3a5369676e61747572652867726f75705f6461746154285661756c744b65792c5661756c7456616c75652900387265766f6b655f696e7669746573082067726f75705f696410486173682c696e766974655f6b657973245665633c483235363e000000002053796c6f45324545012053796c6f4532454504345072654b657942756e646c657301010250284163636f756e7449642c446576696365496429445665633c5072654b657942756e646c653e00040000010c3c72656769737465725f64657669636508246465766963655f696420446576696365496410706b6273445665633c5072654b657942756e646c653e00387265706c656e6973685f706b627308246465766963655f696420446576696365496410706b6273445665633c5072654b657942756e646c653e003477697468647261775f706b62730828726571756573745f696410486173682c77616e7465645f706b6273645665633c284163636f756e7449642c4465766963654964293e000000002853796c6f446576696365012853796c6f446576696365041c44657669636573010102244163636f756e744964345665633c44657669636549643e00040000010000000c4c5573657249644e6f74526567697374657265640038446576696365496445786973747300544d61784465766963654c696d697452656163686564002453796c6f496e626f78012453796c6f496e626f78082c4e657874496e6465786573010102244163636f756e744964244d6573736167654964001000000000001856616c756573010102244163636f756e744964605665633c284d65737361676549642c4d657373616765293e000400000108246164645f76616c7565081c706565725f6964244163636f756e7449641476616c75651c4d657373616765003464656c6574655f76616c756573042476616c75655f696473385665633c4d65737361676549643e0000000c404d61784d6573736167654c656e67746800404d617844656c6574654d65737361676500444d65737361676549644f766572666c6f77003053796c6f526573706f6e7365013053796c6f526573706f6e73650424526573706f6e73657301010240284163636f756e7449642c486173682920526573706f6e73650004020001043c72656d6f76655f726573706f6e73650428726571756573745f69641048617368000000002453796c6f5661756c74012453796c6f5661756c7404145661756c74010102244163636f756e744964685665633c285661756c744b65792c5661756c7456616c7565293e000400000108307570736572745f76616c7565080c6b6579205661756c744b65791476616c7565285661756c7456616c7565003464656c6574655f76616c75657304106b657973345665633c5661756c744b65793e0000000c1c4d61784b65797300384d617856616c75654c656e67746800344d617844656c6574654b657973002843656e6e7a7853706f74012843656e6e7a7853706f74102c436f72654173736574496401001c417373657449641000000000003844656661756c744665655261746501001c4665655261746540000000000000000000000000000000000038546f74616c4c69717569646974790101052c45786368616e67654b65791c42616c616e636500400000000000000000000000000000000000404c697175696469747942616c616e63650102052c45786368616e67654b6579244163636f756e7449641c42616c616e6365024000000000000000000000000000000000000114246275795f61737365741424726563697069656e74444f7074696f6e3c4163636f756e7449643e3461737365745f746f5f73656c6c40436f6d706163743c417373657449643e3061737365745f746f5f62757940436f6d706163743c417373657449643e286275795f616d6f756e7440436f6d706163743c42616c616e63653e306d6178696d756d5f73656c6c40436f6d706163743c42616c616e63653e002873656c6c5f61737365741424726563697069656e74444f7074696f6e3c4163636f756e7449643e3461737365745f746f5f73656c6c40436f6d706163743c417373657449643e3061737365745f746f5f62757940436f6d706163743c417373657449643e2c73656c6c5f616d6f756e7440436f6d706163743c42616c616e63653e2c6d696e696d756d5f62757940436f6d706163743c42616c616e63653e00346164645f6c6971756964697479102061737365745f696440436f6d706163743c417373657449643e346d696e5f6c697175696469747940436f6d706163743c42616c616e63653e406d61785f61737365745f616d6f756e7440436f6d706163743c42616c616e63653e2c636f72655f616d6f756e7440436f6d706163743c42616c616e63653e004072656d6f76655f6c6971756964697479102061737365745f696440436f6d706163743c417373657449643e546c69717569646974795f746f5f776974686472617740436f6d706163743c42616c616e63653e486d696e5f61737365745f776974686472617740436f6d706163743c42616c616e63653e446d696e5f636f72655f776974686472617740436f6d706163743c42616c616e63653e00307365745f6665655f7261746504306e65775f6665655f726174651c4665655261746500010c304164644c697175696469747910244163636f756e7449641c42616c616e63651c417373657449641c42616c616e6365003c52656d6f76654c697175696469747910244163636f756e7449641c42616c616e63651c417373657449641c42616c616e6365003441737365745075726368617365141c417373657449641c41737365744964244163636f756e7449641c42616c616e63651c42616c616e636500004844456d70747945786368616e6765506f6f6c007c496e73756666696369656e7445786368616e6765506f6f6c52657365727665004c496e73756666696369656e7442616c616e63650054496e73756666696369656e744c69717569646974790074496e73756666696369656e745472616465417373657442616c616e63650070496e73756666696369656e74436f7265417373657442616c616e6365003c43616e6e6f7454726164655a65726f006843616e6e6f744164644c6971756964697479576974685a65726f006c4d696e696d756d427579526571756972656d656e744e6f744d657400704d6178696d756d53656c6c526571756972656d656e744e6f744d657400884d696e696d756d54726164654173736574526571756972656d656e744e6f744d657400844d696e696d756d436f72654173736574526571756972656d656e744e6f744d657400844d696e696d756d4c6971756964697479526571756972656d656e744e6f744d657400884d6178696d756d54726164654173736574526571756972656d656e744e6f744d65740060417373657443616e6e6f7453776170466f72497473656c660038496e76616c69644173736574496400204f766572666c6f77003044697669646542795a65726f001c5363616c696e6700000000000420544f7074696f6e5369676e6564457874656e73696f6e30436865636b56657273696f6e30436865636b47656e6573697320436865636b45726128436865636b4e6f6e63652c436865636b576569676874604368617267655472616e73616374696f6e5061796d656e7448436865636b426c6f636b4761734c696d6974';
    const genesisHash_runtimeVersion = '0x0d0971c150a9741b8719b3c6c9c2e96ec5b2e3fb83641af868e6650f3e263ef0-36';
    let metadata = {};
    metadata[genesisHash_runtimeVersion] = meta;
    api = await Api.create({provider, metadata});
    expect(api.runtimeMetadata.toHex()).toEqual(new Metadata(api.registry, meta).toHex());
  });
});
