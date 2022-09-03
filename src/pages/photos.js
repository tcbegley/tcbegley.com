import Head from 'next/head'
import ImageGallery from 'react-image-gallery'

import Layout from '../components/layout'
import PhotoGalleryItem from '../components/photo-gallery-item'
import siteConfig from '../config'
import callFlickr from '../lib/flickr'

export async function getStaticProps() {
  const options = { api_key: process.env.FLICKR_API_KEY, ...siteConfig.flickr }
  const images = await callFlickr(options)

  return {
    props: {
      images: images && images.map((photo) => ({
        thumbnail: photo.url_s,
        original: photo.url_o,
        description: photo.description._content,
        originalWidth: photo.width_o,
        originalHeight: photo.height_o,
      })),
    },
  }
}

export default function Photos({ images }) {
  return (
    <>
      <Head>
        <title>{`Photos :: ${siteConfig.title}`}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Photos">
        <p>
          I&apos;m a keen amateur photographer. On this page you can find a few
          of the photos I&apos;ve taken over the years. Click on the fullscreen
          button to see any of them in more detail.
        </p>
        <p>
          All of these photos are also available on my{' '}
          <a href="https://flickr.com/photos/149210668@N06/">Flickr</a> account.
        </p>
        <ImageGallery
          items={images}
          showPlayButton={false}
          renderItem={PhotoGalleryItem}
        />
      </Layout>
    </>
  )
}
