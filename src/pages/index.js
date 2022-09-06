import Head from 'next/head'
import Image from 'next/image'

import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'

import Content from '../components/content'
import Layout from '../components/layout'
import siteConfig from '../config'

import styles from './index.module.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default function Index() {
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Content>
          <div className={styles.indexContainer}>
            <div className={styles.indexRow}>
              <div className={styles.textCol}>
                <h1 className={styles.heading}>Hello, I&#39;m Tom.</h1>
                <p className={styles.summary}>
                  I am a software engineer, data scientist, and mathematician.
                  I&#39;m currently a Machine Learning engineer at{' '}
                  <a href="https://about.facebook.com/">Meta</a>.
                </p>
              </div>
              <div className={styles.imgCol}>
                <Image
                  src="/images/me.jpg"
                  alt="tom"
                  width={200}
                  height={200}
                  style={{ borderRadius: 8 }}
                />
              </div>
            </div>
            <p className={styles.text}>
              You&#39;ve found my website. It has some information about me, and
              things I&#39;ve worked on both professionally and in my spare
              time. I&#39;ve also aspirationally set up a blog that I
              occasionally get around to writing things for. I&#39;m interested
              in many things including, but not limited to Bayesian inference,
              machine learning, web development, and programming with Python.
            </p>
            <span className={styles.social}>
              <a href="https://github.com/tcbegley">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
              <a href="https://linkedin.com/in/tcbegley">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
              <a href="https://twitter.com/tcbegley">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </span>
          </div>
        </Content>
      </Layout>
    </>
  )
}
