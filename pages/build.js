import Link from 'next/link'
import Layout from '../components/layout'

export default function Build() {
  return (
    <Layout page="Build">
      <h1>Build</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
