import Web3 from 'web3';

const web3 = new Web3(process.env.NEXT_PUBLIC_LUKSO_PROVIDER_URL);

export default web3;
