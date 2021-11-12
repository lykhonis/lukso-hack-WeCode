import Link from 'next/link'
import Layout from '../components/layout'

export default function Learn() {
  return (
    <Layout page="Learn">
      <h1>Learn</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
