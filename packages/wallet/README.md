# `cennznet-wallet`

**a wallet and a payload signer for cennznet**

## Usage

### Create a Wallet with HD-Keyring

```
const {Wallet} = require('@cennznet/wallet');

const wallet = new Wallet();
await wallet.createNewVault('a passphrase');
//By default it comes with a HD Keyring
```

### Backup your wallet

```
const backup = await wallet.export('a passphrase');
// [{mnemonic, numberOfAccounts，hdPath}]
```

### Reload your wallet
```
vault = wallet.vault;
wallet2 = new Wallet({vault});
//add keyringTypes: [HDKeyring, SimpleKeyring] if SimpleKeyring is used
await wallet2.unlock(<same passphrase>)
```

### Restore wallet and reset password
```
mnemonic='ready whisper vapor penalty load gesture elite brick select light caution clever';
hdKeyring=new HDKeyring({mnemonic});
wallet = new Wallet();
wallet.createNewVaultAndRestore('newpass', [hdKeyring]);
```

### Backup an account

```
const json = await wallet.exportAccount(address, passphrase);
```

### Import single account

```
const TEST_ACCOUNT = {
    seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
    address: '5DHzypfuQH7FPhCsrqMxpxkBaPHe8QNhc5s1PwEMDc5p5Nb7',
    publicKey: '0x366010e706af618a6037731b07663d4b6f10eac201c7fdd5fb0bd4727742524d',
    mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};
const keyring = new SimpleKeyring();
await keyring.addPair(alice);
//or
keyring.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
//or
keyring.addFromMnemonic(TEST_ACCOUNT.mnemonic);
await wallet.addKeyring(keyring);
```

### lock/unlock

```
await wallet.lock();
// methods marked as @requireUnlocked such as sign, addAccount and etc will fail
await wallet.unlock(passphrase);
```

### generate random account via the default keyring

```
const address = await wallet.addAccount();
```

## assigned as @cennznet/api's payload signer
```
api.setSigner(wallet);
```

check API Document for more details.
