import Head from 'next/head'

import siteConfig from '../config'
import Content from '../components/content'
import Layout from '../components/layout'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const pagesDirectory = path.join(process.cwd(), 'src', 'content', 'pages')

export async function getStaticProps({ params: { slug } }) {
  // mix of .md and .mdx files. This isn't 100% robust, but the failure case is
  // when a directory contains file and sub-directory with same name which for
  // the purposes of my personal blog I'm comfortable ignoring
  const fileName = fs
    .readdirSync(pagesDirectory)
    .find((path) => path.startsWith(slug))
  const fullPath = path.join(pagesDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const content = processedContent.toString()
  return { props: { slug, content, meta: matterResult.data } }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(pagesDirectory)
  const paths = fileNames
    .map((filename) => filename.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))
  return { paths, fallback: false }
}

export default function Page({ slug, content, meta }) {
  const title = meta.title
    ? `${meta.title} :: ${siteConfig.title}`
    : siteConfig.title
  const description = meta.description || siteConfig.description
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Layout>
        <Content title={meta.title} path={`/${slug}`}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Content>
      </Layout>
    </>
  )
}
