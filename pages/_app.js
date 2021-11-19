import '../styles/globals.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSignOutAlt);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
