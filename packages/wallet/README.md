# `cennznet-wallet`

> a wallet implement to use with cennznet-js

## Usage

```
import {Wallet} from 'cennznet-wallet';

const wallet = new Wallet();
await wallet.createNewVault('a passphrase');

const TEST_ACCOUNT = {
    seed: '0x3cf2ec6ffd26587529ab06c82ba9b33110198085f5c6b8d882653d056bf9e0d3',
    address: '5DHzypfuQH7FPhCsrqMxpxkBaPHe8QNhc5s1PwEMDc5p5Nb7',
    publicKey: '0x366010e706af618a6037731b07663d4b6f10eac201c7fdd5fb0bd4727742524d',
    mnemonic: 'insane push cradle toilet token gate chair trim spare blush rebuild top',
};

await wallet.addFromSeed(hexToU8a(TEST_ACCOUNT.seed));
//or
await wallet.addFromMnemonic(TEST_ACCOUNT.mnemonic);
```

check API Document for more details.
