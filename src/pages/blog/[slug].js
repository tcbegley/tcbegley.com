import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import markdown from 'remark-parse'
import rehypeKatex from 'rehype-katex'

import siteConfig from '../../config'
import Layout from '../../components/layout'

const components = {
  BilliardsContainer: dynamic(() =>
    import('../../components/blog/billiards-container'),
  ),
}

const pagesDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

export async function getStaticProps({ params: { slug } }) {
  // mix of .md and .mdx files. This isn't 100% robust, but the failure case is
  // when a directory contains file and sub-directory with same name which for
  // the purposes of my personal blog I'm comfortable ignoring
  const fileName = fs
    .readdirSync(pagesDirectory)
    .find((path) => path.startsWith(slug))
  const fullPath = path.join(pagesDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { content, data } = matter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [markdown, remarkMath],
      rehypePlugins: [rehypeKatex],
    },
    scope: data,
  })

  return { props: { slug, source: mdxSource, meta: data } }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(pagesDirectory)
  const paths = fileNames
    .map((filename) => filename.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))
  return { paths, fallback: false }
}

export default function Page({ slug, source, meta }) {
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
      <Layout
        title={meta.title}
        author={meta.author}
        date={meta.date}
        tags={meta.tags}
        excerpt={meta.excerpt}
        path={`/${slug}`}
      >
        <MDXRemote components={components} {...source} />
      </Layout>
    </>
  )
}
