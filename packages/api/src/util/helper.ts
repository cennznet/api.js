import { Erc20DepositEvent, u64 } from '@cennznet/types';
import { u8aToHex } from '@cennznet/util';
import { KeyringPair } from '@polkadot/keyring/types';
import { EthereumSignature } from '@polkadot/types/interfaces';
import { H256 } from '@polkadot/types/interfaces/runtime';
import { Api } from '@cennznet/api';

// Splits the given Ethereum signatures into r,s,v format
export function extractEthereumSignature(signatures: EthereumSignature[]): { r: string[]; s: string[]; v: number[] } {
  const rPart = [],
    sPart = [],
    vPart = [];
  signatures.forEach((signature) => {
    const sigU8a = signature.toU8a();
    const rSlice = sigU8a.slice(0, 32);
    const r = u8aToHex(rSlice);
    rPart.push(r);
    const sSlice = sigU8a.slice(32, 64);
    const s = u8aToHex(sSlice);
    sPart.push(s);
    let v = sigU8a[64];
    if (v < 27) {
      if (v === 0 || v === 1) {
        v += 27;
      } else {
        console.error('signature invalid v byte', 'signature', signature);
      }
    }
    vPart.push(v);
  });

  return { r: rPart, s: sPart, v: vPart };
}

// Helper function to deposit claim that will return when claim is successfully deposited
export async function awaitDepositClaim(
  api: Api,
  depositTxHash: H256 | string | Uint8Array,
  claim: Erc20DepositEvent,
  signer: KeyringPair
): Promise<ClaimDeposited> {
  const nonce = await api.rpc.system.accountNextIndex(signer.address);
  return new Promise((resolve, reject) => {
    api.tx.erc20Peg
      .depositClaim(depositTxHash, claim)
      .signAndSend(signer, { nonce }, ({ status, events }) => {
        let eventClaimId;
        if (status.isInBlock) {
          for (const {
            event: { method, section, data },
          } of events) {
            if (section === 'erc20Peg' && method === 'Erc20Claim') {
              eventClaimId = data[0];
              break;
            } else if (section === 'system' && method === 'ExtrinsicFailed') {
              reject('Claim already notarized');
            }
          }
        }
        if (eventClaimId) {
          api.query.system
            .events((events) => {
              events.forEach((record) => {
                const { event } = record;
                if (event.section === 'erc20Peg' && event.method === 'Erc20Deposit') {
                  const [claimId] = event.data;
                  if (claimId.toString() === eventClaimId.toString()) {
                    console.debug('Deposit claim on CENNZnet side succeeded..');
                    resolve({
                      claimId: (event.data[0] as u64).toNumber(),
                      assetId: event.data[1].toString(),
                      amount: event.data[2].toString(),
                      beneficiary: event.data[3].toString(),
                    });
                  }
                } else if (event.section === 'erc20Peg' && event.method === 'Erc20DepositFail') {
                  const [claimId] = event.data;
                  if (claimId.toString() === eventClaimId.toString()) {
                    console.error('Deposited claim on CENNZnet side failed..');
                    reject('Claim deposition failed');
                  }
                }
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });
}

export interface ClaimDeposited {
  claimId: number;
  assetId: string;
  amount: string;
  beneficiary: string;
}
