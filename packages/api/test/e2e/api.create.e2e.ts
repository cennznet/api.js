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

import {Api} from '../../src/Api';
import staticMetadata from '../../src/staticMetadata';
import initApiPromise from '../../../../jest/initApiPromise';
import config from '../../../../config';
import { Metadata } from '@polkadot/types';

describe('e2e api create', () => {
  let api;
  let incorrectApi;

  it('For Azalea chain - checking if static metadata is same as latest', async () => {
    const provider = 'wss://cennznet.unfrastructure.io/public/ws'; // Use Azalea
    api = await Api.create({provider});
    const meta = staticMetadata[`${api.genesisHash.toHex()}-${api.runtimeVersion.specVersion.toNumber()}`];
    expect(meta).toBeDefined();
    expect(api.runtimeMetadata.toJSON()).toEqual(new Metadata(api.registry, meta).toJSON());
  });

  afterEach(async () => {
    try {
      api.disconnect();
      if (incorrectApi) {
        incorrectApi.disconnect();
      }
      incorrectApi = null;
    } catch (e) {}
  });

  it('should create an Api instance with the timeout option', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    api = await Api.create({provider, timeout: 1000000});

    const hash = await api.rpc.chain.getBlockHash();

    expect(hash).toBeDefined();
  });

  it('should get rejected if the connection fails', async () => {
    const incorrectEndPoint = 'wss://rimu.unfrastructure.io/private/ws';
    await expect(Api.create({provider: incorrectEndPoint})).rejects.toThrow(
      'Connection fail');
  });

  it('should get rejected if it is not resolved in a specific period of time', async () => {
    const provider = config.wsProvider[`${process.env.TEST_TYPE}`];
    await expect(Api.create({provider, timeout: 1})).rejects.toThrow(
      'Timed out in 1 ms.');
  });

  it('Use custom metadata and test it is used when creating API instance', async () => {
    const provider = 'wss://cennznet.unfrastructure.io/public/ws'; // Use Azalea
    const meta = '0x6d6574610b2c1853797374656d011853797374656d3c304163636f756e744e6f6e6365010102244163636f756e74496414496e64657800200000000000000000003845787472696e736963436f756e7400000c7533320400004c416c6c45787472696e7369637357656967687400001857656967687404000040416c6c45787472696e736963734c656e00000c75333204000024426c6f636b486173680101052c426c6f636b4e756d626572104861736800800000000000000000000000000000000000000000000000000000000000000000003445787472696e736963446174610101050c75333214427974657300040000184e756d62657201002c426c6f636b4e756d62657210000000000028506172656e744861736801001048617368800000000000000000000000000000000000000000000000000000000000000000003845787472696e73696373526f6f740100104861736880000000000000000000000000000000000000000000000000000000000000000000184469676573740100204469676573744f66040000184576656e74730100405665633c4576656e745265636f72643e040000284576656e74436f756e740100284576656e74496e6465781000000000002c4576656e74546f706963730101021048617368745665633c28426c6f636b4e756d6265722c4576656e74496e646578293e00040000484c61737452756e74696d65557067726164650000584c61737452756e74696d6555706772616465496e666f04000038457865637574696f6e5068617365000014506861736504000001242866696c6c5f626c6f636b04185f726174696f1c50657262696c6c001872656d61726b041c5f72656d61726b14427974657300387365745f686561705f7061676573041470616765730c75363400207365745f636f64650410636f6465144279746573005c7365745f636f64655f776974686f75745f636865636b730410636f6465144279746573005c7365745f6368616e6765735f747269655f636f6e666967044c6368616e6765735f747269655f636f6e666967804f7074696f6e3c4368616e67657354726965436f6e66696775726174696f6e3e002c7365745f73746f7261676504146974656d73345665633c4b657956616c75653e00306b696c6c5f73746f7261676504106b657973205665633c4b65793e002c6b696c6c5f70726566697804187072656669780c4b657900010c4045787472696e7369635375636365737304304469737061746368496e666f003c45787472696e7369634661696c6564083444697370617463684572726f72304469737061746368496e666f002c436f6465557064617465640000000c3c496e76616c6964537065634e616d6500685370656356657273696f6e4e65656473546f496e63726561736500744661696c6564546f4578747261637452756e74696d6556657273696f6e002454696d657374616d70012454696d657374616d70080c4e6f770100184d6f6d656e742000000000000000000024446964557064617465010010626f6f6c04000001040c736574040c6e6f773c436f6d706163743c4d6f6d656e743e000004344d696e696d756d506572696f64184d6f6d656e7420c4090000000000000000485472616e73616374696f6e5061796d656e7401485472616e73616374696f6e5061796d656e7404444e6578744665654d756c7469706c6965720100284d756c7469706c69657220000000000000000000000008485472616e73616374696f6e426173654665652442616c616e63654f66400010a5d4e8000000000000000000000000485472616e73616374696f6e427974654665652442616c616e63654f664000e40b5402000000000000000000000000003047656e657269634173736574013047656e6572696341737365742034546f74616c49737375616e63650101051c417373657449641c42616c616e6365004000000000000000000000000000000000002c4672656542616c616e63650102051c41737365744964244163636f756e7449641c42616c616e6365024000000000000000000000000000000000003c526573657276656442616c616e63650102051c41737365744964244163636f756e7449641c42616c616e6365024000000000000000000000000000000000002c4e6578744173736574496401001c417373657449641000000000002c5065726d697373696f6e730101051c41737365744964485065726d697373696f6e56657273696f6e7300100000000000144c6f636b73010102244163636f756e744964405665633c42616c616e63654c6f636b3e00040000385374616b696e674173736574496401001c417373657449641000000000003c5370656e64696e674173736574496401001c4173736574496410000000000001181863726561746508146f776e6572244163636f756e7449641c6f7074696f6e733041737365744f7074696f6e7300207472616e736665720c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e7440436f6d706163743c42616c616e63653e00447570646174655f7065726d697373696f6e082061737365745f696440436f6d706163743c417373657449643e386e65775f7065726d697373696f6e405065726d697373696f6e4c617465737400106d696e740c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e741c42616c616e636500106275726e0c2061737365745f696440436f6d706163743c417373657449643e08746f244163636f756e74496418616d6f756e741c42616c616e6365003c6372656174655f7265736572766564082061737365745f69641c417373657449641c6f7074696f6e733041737365744f7074696f6e730001141c437265617465640c1c41737365744964244163636f756e7449643041737365744f7074696f6e73002c5472616e73666572726564101c41737365744964244163636f756e744964244163636f756e7449641c42616c616e636500445065726d697373696f6e55706461746564081c41737365744964405065726d697373696f6e4c617465737400184d696e7465640c1c41737365744964244163636f756e7449641c42616c616e636500184275726e65640c1c41737365744964244163636f756e7449641c42616c616e6365000034344e6f4964417661696c61626c6500285a65726f416d6f756e7400484e6f5570646174655065726d697373696f6e00404e6f4d696e745065726d697373696f6e00404e6f4275726e5065726d697373696f6e0050546f74616c4d696e74696e674f766572666c6f77004c467265654d696e74696e674f766572666c6f770054546f74616c4275726e696e67556e646572666c6f770050467265654275726e696e67556e646572666c6f7700384964416c726561647954616b656e00344964556e617661696c61626c65004c496e73756666696369656e7442616c616e636500544c69717569646974795265737472696374696f6e73002853796c6f47726f757073012853796c6f47726f7570730c1847726f75707301010210486173681447726f7570008c0000000000000000000000000000000000000000000000000000000000000000000000002c4d656d6265727368697073010102244163636f756e744964245665633c486173683e00040000344d656d626572446576696365730101021048617368645665633c284163636f756e7449642c4465766963654964293e000400000124306372656174655f67726f7570102067726f75705f69641048617368106d657461104d6574611c696e76697465732c5665633c496e766974653e2867726f75705f6461746154285661756c744b65792c5661756c7456616c756529002c6c656176655f67726f7570082067726f75705f696410486173682467726f75705f6b6579404f7074696f6e3c5661756c744b65793e00347570646174655f6d656d626572082067726f75705f69641048617368106d657461104d65746100447570736572745f67726f75705f6d657461082067726f75705f69641048617368106d657461104d65746100386372656174655f696e7669746573082067726f75705f696410486173681c696e76697465732c5665633c496e766974653e00346163636570745f696e76697465182067726f75705f696410486173681c7061796c6f6164344163636570745061796c6f616428696e766974655f6b6579104832353620696e626f785f69640c753332247369676e617475726548656432353531393a3a5369676e61747572652867726f75705f6461746154285661756c744b65792c5661756c7456616c75652900387265766f6b655f696e7669746573082067726f75705f696410486173682c696e766974655f6b657973245665633c483235363e00386d6967726174655f67726f757073041467726f75701447726f757000546d6967726174655f67726f75705f64657669636573082067726f75705f69641048617368386d656d6265725f64657669636573645665633c284163636f756e7449642c4465766963654964293e000000002053796c6f45324545012053796c6f4532454504345072654b657942756e646c657301010250284163636f756e7449642c446576696365496429445665633c5072654b657942756e646c653e00040000010c3c72656769737465725f64657669636508246465766963655f696420446576696365496410706b6273445665633c5072654b657942756e646c653e00387265706c656e6973685f706b627308246465766963655f696420446576696365496410706b6273445665633c5072654b657942756e646c653e003477697468647261775f706b62730828726571756573745f696410486173682c77616e7465645f706b6273645665633c284163636f756e7449642c4465766963654964293e000000002853796c6f446576696365012853796c6f446576696365041c44657669636573010102244163636f756e744964345665633c44657669636549643e0004000001043c6d6967726174655f64657669636573081c757365725f6964244163636f756e744964286465766963655f696473345665633c44657669636549643e0000000c4c5573657249644e6f74526567697374657265640038446576696365496445786973747300544d61784465766963654c696d697452656163686564002453796c6f496e626f78012453796c6f496e626f78082c4e657874496e6465786573010102244163636f756e744964244d6573736167654964001000000000001856616c756573010102244163636f756e744964605665633c284d65737361676549642c4d657373616765293e00040000010c246164645f76616c7565081c706565725f6964244163636f756e7449641476616c75651c4d657373616765003464656c6574655f76616c756573042476616c75655f696473385665633c4d65737361676549643e00346d6967726174655f696e626f780c1c757365725f6964244163636f756e744964286e6578745f696e646578244d6573736167654964306e65775f6d65737361676573605665633c284d65737361676549642c4d657373616765293e0000000c404d61784d6573736167654c656e67746800404d617844656c6574654d65737361676500444d65737361676549644f766572666c6f77003053796c6f526573706f6e7365013053796c6f526573706f6e73650424526573706f6e73657301010240284163636f756e7449642c486173682920526573706f6e73650004020001043c72656d6f76655f726573706f6e73650428726571756573745f69641048617368000000002453796c6f5661756c74012453796c6f5661756c7404145661756c74010102244163636f756e744964685665633c285661756c744b65792c5661756c7456616c7565293e00040000010c307570736572745f76616c7565080c6b6579205661756c744b65791476616c7565285661756c7456616c7565003464656c6574655f76616c75657304106b657973345665633c5661756c744b65793e00346d6967726174655f7661756c74081c757365725f6964244163636f756e744964286e65775f7661756c7473685665633c285661756c744b65792c5661756c7456616c7565293e0000000c1c4d61784b65797300384d617856616c75654c656e67746800344d617844656c6574654b657973002843656e6e7a7853706f74012843656e6e7a7853706f74102c436f72654173736574496401001c417373657449641000000000003844656661756c744665655261746501001c4665655261746540000000000000000000000000000000000038546f74616c4c69717569646974790101052c45786368616e67654b65791c42616c616e636500400000000000000000000000000000000000404c697175696469747942616c616e63650102052c45786368616e67654b6579244163636f756e7449641c42616c616e6365024000000000000000000000000000000000000114246275795f61737365741424726563697069656e74444f7074696f6e3c4163636f756e7449643e3461737365745f746f5f73656c6c40436f6d706163743c417373657449643e3061737365745f746f5f62757940436f6d706163743c417373657449643e286275795f616d6f756e7440436f6d706163743c42616c616e63653e306d6178696d756d5f73656c6c40436f6d706163743c42616c616e63653e002873656c6c5f61737365741424726563697069656e74444f7074696f6e3c4163636f756e7449643e3461737365745f746f5f73656c6c40436f6d706163743c417373657449643e3061737365745f746f5f62757940436f6d706163743c417373657449643e2c73656c6c5f616d6f756e7440436f6d706163743c42616c616e63653e2c6d696e696d756d5f62757940436f6d706163743c42616c616e63653e00346164645f6c6971756964697479102061737365745f696440436f6d706163743c417373657449643e346d696e5f6c697175696469747940436f6d706163743c42616c616e63653e406d61785f61737365745f616d6f756e7440436f6d706163743c42616c616e63653e2c636f72655f616d6f756e7440436f6d706163743c42616c616e63653e004072656d6f76655f6c6971756964697479102061737365745f696440436f6d706163743c417373657449643e546c69717569646974795f746f5f776974686472617740436f6d706163743c42616c616e63653e486d696e5f61737365745f776974686472617740436f6d706163743c42616c616e63653e446d696e5f636f72655f776974686472617740436f6d706163743c42616c616e63653e00307365745f6665655f7261746504306e65775f6665655f726174651c4665655261746500010c304164644c697175696469747910244163636f756e7449641c42616c616e63651c417373657449641c42616c616e6365003c52656d6f76654c697175696469747910244163636f756e7449641c42616c616e63651c417373657449641c42616c616e6365003441737365745075726368617365141c417373657449641c41737365744964244163636f756e7449641c42616c616e63651c42616c616e636500004844456d70747945786368616e6765506f6f6c007c496e73756666696369656e7445786368616e6765506f6f6c52657365727665004c496e73756666696369656e7442616c616e63650054496e73756666696369656e744c69717569646974790074496e73756666696369656e745472616465417373657442616c616e63650070496e73756666696369656e74436f7265417373657442616c616e6365003c43616e6e6f7454726164655a65726f006843616e6e6f744164644c6971756964697479576974685a65726f006c4d696e696d756d427579526571756972656d656e744e6f744d657400704d6178696d756d53656c6c526571756972656d656e744e6f744d657400884d696e696d756d54726164654173736574526571756972656d656e744e6f744d657400844d696e696d756d436f72654173736574526571756972656d656e744e6f744d657400844d696e696d756d4c6971756964697479526571756972656d656e744e6f744d657400884d6178696d756d54726164654173736574526571756972656d656e744e6f744d65740060417373657443616e6e6f7453776170466f72497473656c660038496e76616c69644173736574496400204f766572666c6f77003044697669646542795a65726f000420544f7074696f6e5369676e6564457874656e73696f6e30436865636b56657273696f6e30436865636b47656e6573697320436865636b45726128436865636b4e6f6e63652c436865636b576569676874604368617267655472616e73616374696f6e5061796d656e7448436865636b426c6f636b4761734c696d6974';
    const genesisHash_runtimeVersion = '0x0d0971c150a9741b8719b3c6c9c2e96ec5b2e3fb83641af868e6650f3e263ef0-33';
    let metadata = {};
    metadata[genesisHash_runtimeVersion] = meta;
    api = await Api.create({provider, metadata});
    expect(api.runtimeMetadata.toHex()).toEqual(new Metadata(api.registry, meta).toHex());
  });
});
