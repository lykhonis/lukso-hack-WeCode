import { LSPFactory, LSP3UniversalProfile } from '@lukso/lsp-factory.js';
import { getWallet } from './wallet';

export async function createProfile({
  name,
  description,
  profileImage,
}) {
  const wallet = await getWallet();
  const data = {
    name,
    description,
    profileImage,
    tags: ['WeCode'],
    links: [{ title: 'WeCode', url: 'https://lukso-hack-we-code.vercel.app/' }],
  };

  const lspFactory = new LSPFactory(process.env.NEXT_PUBLIC_LUKSO_PROVIDER_URL, {
    deployKey: wallet.privateKey,
    chainId: process.env.NEXT_PUBLIC_LUKSO_CHAIN_ID,
  });

  const uploadedData = await LSP3UniversalProfile.uploadProfileData({
    ...data
  });
  console.log(`Profile Url: ${uploadedData.url}`);

  const contracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [wallet.address],
    lsp3Profile: uploadedData,
  });
  console.log(contracts);

  return contracts;
}
