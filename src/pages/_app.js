import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import 'katex/dist/katex.min.css'
import '../styles/globals.css'
import '../styles/prism.css'
import 'react-image-gallery/styles/css/image-gallery.css'

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
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
    </>
  )
}

export default MyApp
