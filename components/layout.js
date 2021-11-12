import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({ children, page }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{page ? `WeCode - ${page}` : 'WeCode'}</title>
        <meta name="description" content="Teach &amp; Learn how to code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
