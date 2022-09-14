import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import 'katex/dist/katex.min.css'
import '../styles/globals.css'
import '../styles/prism.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (path) => {
      window?.goatcounter?.count?.({ path })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Component {...pageProps} />
      <Script
        async
        data-goatcounter="https://tcbegley.goatcounter.com/count"
        src="/scripts/count.js"
        strategy="afterInteractive"
      />
    </>
  )
}

export default MyApp
