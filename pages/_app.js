// pages/_app.js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // You can add global layouts or context providers here.
  return <Component {...pageProps} />
}

export default MyApp
