import Link from 'next/link'
import Layout from '../components/layout'
import styles from './home.module.css'

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to WeCode
      </h1>

      <p className={styles.description}>
        Join communities by learning, building, and earning together.
      </p>

      <div className={styles.container}>
        <div className={styles.grid}>
          <Link href="/learn">
            <a className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Find lessons for beginners and experts</p>
            </a>
          </Link>

          <Link href="/build">
            <a className={styles.card}>
              <h2>Build &rarr;</h2>
              <p>Create lessons and build community</p>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
