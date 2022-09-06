import Head from 'next/head'

import Layout from '../components/layout'
import Content from '../components/content'
import siteConfig from '../config'

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>{`${siteConfig.title} - 404`}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... :-(</p>
      </Content>
    </Layout>
  )
}
