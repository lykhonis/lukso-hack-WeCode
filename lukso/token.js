// import { LSPFactory } from "@lukso/lsp-factory.js";
// import LSP7 from '@lukso/universalprofile-smart-contracts/build/artifacts/LSP7.json';
import web3 from './web3';
import { getWallet } from './wallet';
import { getTokenFactoryContract } from './tokenFactory';
import TokenAbi from './token.abi.json';

export const TokenKeys = {
  Name: web3.utils.keccak256('LSP4TokenName'),
  Symbol: web3.utils.keccak256('LSP4TokenSymbol'),
};

export async function createToken({
  name,
  symbol,
  contributor,
}) {
  console.log(`Creating token: ${name} (${symbol})`);
  const factory = await getTokenFactoryContract();
  const createToken = factory.methods.createToken(name, symbol, contributor);
  const gas = web3.utils.toBN(await createToken.estimateGas()).mul(web3.utils.toBN(110)).divRound(web3.utils.toBN(100));
  const token = await createToken.send({ gas });
  console.log(token);

  // const lspFactory = new LSPFactory(process.env.NEXT_PUBLIC_LUKSO_PROVIDER_URL, {
  //   deployKey: wallet.privateKey,
  //   chainId: process.env.NEXT_PUBLIC_LUKSO_CHAIN_ID,
  // });
  // const token = await lspFactory.DigitalAsset.deployLSP7DigitalAsset({
  //   name,
  //   symbol,
  //   ownerAddress: contributor,
  //   isNFT: false,
  // });
  //   console.log(token);

  // return token.LSP7DigitalAsset.address;
}

export async function getTokenContract(address) {
  const wallet = await getWallet();
  return new web3.eth.Contract(TokenAbi, address, { from: wallet });
}

export async function awardToken(address, { student }) {
  console.log(`Awarding to ${student}`);
  const contract = await getTokenContract(address);
  const award = contract.methods.award(student);
  const gas = web3.utils.toBN(await award.estimateGas()).mul(web3.utils.toBN(110)).divRound(web3.utils.toBN(100));
  // const result = await award.send({ gas });
  console.log(gas.toString());
}

export async function getTokenMetadata(address) {
  const contract = await getTokenContract(address);
  const data = await contract.methods.getData([
    TokenKeys.Name,
    TokenKeys.Symbol,
  ]).call();
  return {
    name: web3.utils.toUtf8(data[0]),
    symbol: web3.utils.toUtf8(data[1]),
  };
}

export async function getTokenByOwner(address) {
  const logs = await web3.eth.getPastLogs({
    fromBlock: 0,
    toBlock: 'latest',
    address: process.env.NEXT_PUBLIC_WEB3_TOKEN_FACTORY_ADDRESS,
    topics: [
      web3.utils.keccak256('WeCodeTokenCreated(address,address)'),
      `0x000000000000000000000000${web3.utils.stripHexPrefix(address)}`,
    ],
  });
  // console.log(logs);
  if (logs.length) {
    const tokenAddress = web3.eth.abi.decodeParameter('address', logs[logs.length - 1].data);
    console.log(`Found token contract ${tokenAddress} by ${address}`);
    return tokenAddress;
  } else {
    return null;
  }
}
