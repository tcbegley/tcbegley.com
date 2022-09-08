import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeImgSize from 'rehype-img-size'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import markdown from 'remark-parse'
import remarkPrism from 'remark-prism'

import siteConfig from '../../../config'
import Content from '../../../components/content'
import Layout from '../../../components/layout'
import Navigation from '../../../components/navigation'

const components = {
  BilliardsContainer: dynamic(() =>
    import('../../../components/blog/billiards-container'),
  ),
  img: (props) => <Image {...props} layout="responsive" loading="lazy" />,
}

const pagesDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

export async function getStaticProps({ params: { slug } }) {
  // mix of .md and .mdx files. This isn't 100% robust, but the failure case is
  // when a directory contains file and sub-directory with same name which for
  // the purposes of my personal blog I'm comfortable ignoring
  // const fileName = fs
  //   .readdirSync(pagesDirectory)
  //   .find((path) => path.startsWith(slug))
  // const fullPath = path.join(pagesDirectory, fileName)
  // const fileContents = fs.readFileSync(fullPath, 'utf8')

  let posts = fs.readdirSync(pagesDirectory).map((fileName) => {
    const fileContents = fs.readFileSync(
      path.join(pagesDirectory, fileName),
      'utf8',
    )
    const { data, content } = matter(fileContents)
    return { slug: fileName.replace(/.mdx?$/, ''), ...data, content }
  })
  // sort in reverse chronological order
  posts = posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  posts.forEach((post, idx) => {
    if (idx < posts.length - 1) {
      post.prev = posts[idx + 1].slug
      post.prevLabel = posts[idx + 1].title
    }
    if (idx > 0) {
      post.next = posts[idx - 1].slug
      post.nextLabel = posts[idx - 1].title
    }
  })

  const { content, ...data } = posts.find((post) => post.slug === slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [markdown, remarkMath, remarkPrism],
      rehypePlugins: [rehypeKatex, [rehypeImgSize, { dir: 'public' }]],
    },
    scope: data,
  })

  data.date = new Date(data.date).toLocaleString('en-gb', {
    dateStyle: 'long',
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
      <Layout>
        <Content
          title={meta.title}
          author={meta.author}
          date={meta.date}
          tags={meta.tags}
          excerpt={meta.excerpt}
          path={`/${slug}`}
        >
          <MDXRemote {...source} components={components} />
          <Navigation
            nextPath={meta.next && `/blog/posts/${meta.next}`}
            nextLabel={meta.nextLabel}
            previousPath={meta.prev && `/blog/posts/${meta.prev}`}
            previousLabel={meta.prevLabel}
          />
        </Content>
      </Layout>
    </>
  )
}
