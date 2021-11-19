import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import useAddress from '../hooks/useAddress';
import Profile from './profile';
import Login from './login';
import styles from './layout.module.css';
import { getTokenContract, getTokenByOwner, createToken } from '../lukso/token';
import web3 from '../lukso/web3';

export default function Layout({
  children,
  page,
  back,
  publish = true,
  stats = true,
}) {
  const { address, setAddress } = useAddress();
  const [balance, setBalance] = useState({
    amount: 0,
    symbol: '',
  });

  useEffect(() => {
    async function fetchToken() {
      try {
        if (!address) return;
        // allocate token for a contributor if needed
        let tokenAddress = await getTokenByOwner(address);
        if (!tokenAddress) {
          const suffix = address.substr(address.length - 4);
          await createToken({
            name: `WeCode ${suffix}`,
            symbol: `WCD-${suffix}`,
            contributor: address,
          });
          tokenAddress = await getTokenByOwner(address);
        }
        // huh?!
        if (!tokenAddress) {
          return;
        }
        const tokenContract = await getTokenContract(tokenAddress);
        const symbol = await tokenContract.methods.symbol().call();
        const amount = parseFloat(web3.utils.fromWei(await tokenContract.methods.balanceOf(address).call()));
        setBalance({ amount, symbol });
      } catch (e) {
        console.error(e);
      }
    }
    fetchToken();
  }, [address]);

  const handleSignOut = useCallback(() => {
    setAddress(null);
  }, [setAddress]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{page ? `WeCode - ${page}` : 'WeCode'}</title>
        <meta name="description" content="Teach &amp; Learn how to code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address && (
        <div className={styles.header}>
          {address && back ? (
            <div>
              <Link href="/">
                <a>
                  <h2>&larr;</h2>
                </a>
              </Link>
            </div>
          ) : address ? (
            <div>
              <FontAwesomeIcon
                title="Sign Out"
                icon={faSignOutAlt}
                className={styles.signout}
                onClick={handleSignOut} />
            </div>
          ) : (
            <div />
          )}
          <div className={styles.actions}>
            {address && stats && (
              <Link href="/stats">
                <a className={styles.stats}>
                  Stats &rarr;
                </a>
              </Link>
            )}
            {address && publish && (
              <Link href="/publish">
                <a className={styles.publish}>
                  Publish &rarr;
                </a>
              </Link>
            )}
            <div className={styles.profile}>
              <Profile address={address} />
              <div className={styles.balance}>
                {`${balance.amount} ${balance.symbol}`}
              </div>
            </div>
          </div>
        </div>
      )}
      <main className={styles.main}>
        {address ? children : <Login />}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://lukso.network/"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by{' '}
          <span className={styles.logo}>
            <Image src="/lukso_token_logo.png" alt="Lukso Token Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
