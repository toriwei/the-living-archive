// pages/_app.js
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // You can add global layouts or context providers here.
  return (
    <>
      <Head>
        <link rel='icon' href='/tla-icon.png' />
        <title>The Living Archive</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
