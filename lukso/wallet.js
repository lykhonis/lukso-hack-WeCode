import web3 from './web3';

export async function getWallet() {
  web3.eth.accounts.wallet.load(process.env.NEXT_PUBLIC_WEB3_WALLET_PASSWORD);

  if (!web3.eth.accounts.wallet.length) {
    web3.eth.accounts.wallet.add({
      address: process.env.NEXT_PUBLIC_WEB3_WALLET_ADDRESS,
      privateKey: process.env.NEXT_PUBLIC_WEB3_WALLET_PRIVATE_KEY,
    });
    // web3.eth.accounts.wallet.create(1);
    // console.log(web3.eth.accounts.wallet[0].privateKey);
    web3.eth.accounts.wallet.save(process.env.NEXT_PUBLIC_WEB3_WALLET_PASSWORD);
    console.log('Initialized wallet');
  }

  const address = web3.eth.accounts.wallet[0].address;
  console.log('Loaded existing wallet ', address);
  console.log('Balance ', web3.utils.fromWei(await web3.eth.getBalance(address), 'ether'), 'LYX');
  
  return {
    address,
    privateKey: web3.eth.accounts.wallet[0].privateKey,
  };
}
