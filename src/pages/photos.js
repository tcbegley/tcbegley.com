import { useMemo, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Gallery } from 'react-grid-gallery'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

import Content from '../components/content'
import Layout from '../components/layout'
import siteConfig from '../config'
import callFlickr from '../lib/flickr'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import styles from './photos.module.css'

export async function getStaticProps() {
  const options = { api_key: process.env.FLICKR_API_KEY, ...siteConfig.flickr }
  const images = await callFlickr(options)

  return {
    props: {
      images:
        images &&
        images.map((photo) => ({
          src: photo.url_m,
          srcBlur: photo.url_t,
          width: photo.width_m,
          height: photo.height_m,
          original: {
            description: photo.description._content,
            src: photo.url_o,
            width: photo.width_o,
            height: photo.height_o,
          },
        })),
    },
  }
}

function GalleryImage({
  imageProps: {
    style: { width, height, maxWidth, ...style },
    ...imageProps
  },
  item: { srcBlur },
}) {
  return (
    <Image
      {...imageProps}
      style={style}
      layout="fill"
      objectFit="cover"
      loading="lazy"
      placeholder="blur"
      blurDataURL={srcBlur}
    />
  )
}

function Slide(image, offset, rect) {
  const width = Math.round(
    Math.min(rect.width, (rect.height / image.height) * image.width),
  )
  const height = Math.round(
    Math.min(rect.height, (rect.width / image.width) * image.height),
  )

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        src={image}
        blurDataURL={image.srcBlur}
        layout="fill"
        loading="eager"
        placeholder="blur"
        objectFit="contain"
        alt={'alt' in image ? image.alt : ''}
        sizes={
          typeof window !== 'undefined'
            ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
            : `${width}px`
        }
      />
    </div>
  )
}

export default function Photos({ images }) {
  const [index, setIndex] = useState(-1)
  const slides = useMemo(
    () => images.map((image) => ({ ...image.original, srcBlur: image.src })),
    [images],
  )

  const handleClick = (index, item) => setIndex(index)

  return (
    <>
      <Head>
        <title>{`Photos :: ${siteConfig.title}`}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Content title="Photos">
          <div className={styles.imageGallery}>
            <p>
              I&apos;m a keen amateur photographer. On this page you can find a
              few of the photos I&apos;ve taken over the years. Click on the
              fullscreen button to see any of them in more detail.
            </p>
            <p>
              All of these photos are also available on my{' '}
              <a href="https://flickr.com/photos/149210668@N06/">Flickr</a>{' '}
              account.
            </p>
            <Gallery
              images={images}
              thumbnailImageComponent={GalleryImage}
              onClick={handleClick}
              enableImageSelection={false}
            />
            <Lightbox
              slides={slides}
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              plugins={[Captions]}
              render={{ slide: Slide }}
            />
          </div>
        </Content>
      </Layout>
    </>
  )
}
