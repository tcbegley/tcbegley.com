import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useRouter } from 'next/router'

import siteConfig from '../../config'
import ContentPreview from '../../components/content-preview'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'

const pagesDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

export async function getStaticProps() {
  let posts = fs.readdirSync(pagesDirectory).map((fileName) => {
    const fileContents = fs.readFileSync(
      path.join(pagesDirectory, fileName),
      'utf8',
    )
    const { data } = matter(fileContents)
    return { slug: fileName.replace(/.mdx?$/, ''), ...data }
  })
  // sort in reverse chronological order
  posts = posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  posts.forEach((post) => {
    post.date = new Date(post.date).toLocaleString('en-gb', {
      dateStyle: 'long',
    })
  })
  return {
    props: { posts: posts },
  }
}

export default function BlogIndex({ posts }) {
  const router = useRouter()
  let { page } = router.query
  page = Number(page) || 1
  const { postsPerPage } = siteConfig
  const onNextClick =
    page < posts.length / postsPerPage
      ? () => router.push({ query: { page: page + 1 } })
      : null
  const onPreviousClick =
    page > 1 ? () => router.push({ query: { page: page - 1 } }) : null
  return (
    <Layout>
      {posts
        .slice((page - 1) * postsPerPage, page * postsPerPage)
        .map(({ slug, title, date, author, tags, excerpt }) => (
          <ContentPreview
            key={slug}
            title={title}
            date={date}
            path={`/blog/${slug}`}
            tags={tags}
            author={author}
            excerpt={excerpt}
          />
        ))}
      <Navigation
        onPreviousClick={onPreviousClick}
        previousLabel="Newer posts"
        onNextClick={onNextClick}
        nextLabel="Older posts"
      />
    </Layout>
  )
}
