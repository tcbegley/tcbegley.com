import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useRouter } from 'next/router'
import { flatMap, uniq } from 'lodash'

import { toKebabCase } from '../../lib'
import siteConfig from '../../config'
import ContentPreview from '../../components/content-preview'
import Layout from '../../components/layout'
import Navigation from '../../components/navigation'

const pagesDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

function getPosts() {
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
  return posts
}

export async function getStaticPaths() {
  const posts = getPosts()
  const paths = uniq(
    flatMap(
      posts.filter((post) => post.tags?.length > 0).map((post) => post.tags),
    ),
  ).map((tag) => ({ params: { tag: toKebabCase(tag) } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { tag } }) {
  const posts = getPosts()

  return {
    props: {
      posts: posts.filter(
        (post) => post.tags?.map((tag) => toKebabCase(tag)).indexOf(tag) !== -1,
      ),
    },
  }
}

export default function BlogIndex({ posts }) {
  const router = useRouter()
  let { page } = router.query
  page = Number(page) || 1
  const { postsPerPage } = siteConfig
  const nextPagePath =
    page < posts.length / postsPerPage ? `/blog?page=${page + 1}` : null
  const previousPagePath = page > 1 ? `/blog?page=${page - 1}` : null
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
        previousPath={previousPagePath}
        previousLabel="Newer posts"
        nextPath={nextPagePath}
        nextLabel="Older posts"
      />
    </Layout>
  )
}
