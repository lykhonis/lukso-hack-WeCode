import { getWallet } from './wallet';
import web3 from './web3';

export const TokenFactoryAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract WeCodeToken",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      }
    ],
    "name": "WeCodeTokenCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      }
    ],
    "name": "createToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenAddresses",
    "outputs": [
      {
        "internalType": "contract WeCodeToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokens",
    "outputs": [
      {
        "internalType": "contract WeCodeToken[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export async function getTokenFactoryContract() {
  const wallet = await getWallet();
  return new web3.eth.Contract(TokenFactoryAbi, process.env.NEXT_PUBLIC_WEB3_TOKEN_FACTORY_ADDRESS, { from: wallet });
}
