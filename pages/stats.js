import { useEffect, useState } from 'react';
import { getTokenContract } from '../lukso/token';
import web3 from '../lukso/web3';
import Layout from '../components/layout';
import styles from './stats.module.css'
import useAddress from '../hooks/useAddress';

export default function Stats() {
  const { address } = useAddress();
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        if (!address) return;

        let mockData = [{
          contributor: '0x74738d3b6B27018f3836EA990d715BdAB21615C6',
          token: '0x394903A15296cD44408B068F89FC4E80F10D64df',
        }];

        const tokens = (await Promise.all(mockData.map(async (data) => {
          const tokenContract = await getTokenContract(data.token);
          const symbol = await tokenContract.methods.symbol().call();
          const amount = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(address).call()));
          return {
            contributor: data.contributor,
            symbol,
            amount,
          };
        }))).map((token, index) => (
          <div
            key={index}
            className={styles.token}
          >
            {token.amount} {token.symbol}
          </div>
        ));
        setTokens(tokens);
      } catch (e) {
        console.error(e);
      }
    }
    fetchTokens();
  }, [address]);

  return (
    <Layout page="Statistics" back stats={false}>
      <div className={styles.tokens}>
        {tokens}
      </div>
    </Layout>
  );
}
