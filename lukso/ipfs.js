export const config = {
  ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
};

export function resolveUrl(url) {
  const uurl = new URL(url);
  if (uurl.protocol !== 'ipfs:') {
    return null;
  }
  return config.ipfsGateway + uurl.pathname.replaceAll('/', '');
}
