import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import useAddress from '../hooks/useAddress'
import Profile from './profile'
import styles from './layout.module.css'

export default function Layout({ children, page, back, publish = true }) {
  const { address } = useAddress();

  return (
    <div className={styles.container}>
      <Head>
        <title>{page ? `WeCode - ${page}` : 'WeCode'}</title>
        <meta name="description" content="Teach &amp; Learn how to code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address && (
        <div className={styles.header}>
          {back ? (
            <div>
              <Link href="/">
                <a>
                  <h2>&larr;</h2>
                </a>
              </Link>
            </div>
          ) : (
            <div />
          )}
          <div className={styles.actions}>
            {publish && (
              <Link href="/publish">
                <a className={styles.publish}>
                  Publish &rarr;
                </a>
              </Link>
            )}
            <Profile address={address} />
          </div>
        </div>
      )}
      <main className={styles.main}>
        {address ? children : (
          <div className={styles.login}>
            Please login by passing your UP profile address as a query parameter
            http://localhost/?address=0x74738d3b6B27018f3836EA990d715BdAB21615C6
          </div>
        )}
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
