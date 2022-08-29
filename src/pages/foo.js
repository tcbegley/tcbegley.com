import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

// import Test from '../components/test'

const Test = (props) => (
  <>
    <h1>Hello {props.name}!</h1>
    <p>Hopefully this will work...</p>
  </>
)

const components = { Test }

export default function TestPage({ mdxSource }) {
  return (
    <div className="wrapper">
      <h1>{mdxSource.frontmatter.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = `---
title: Test
---

Some **mdx** text, with a component <Test name={"title"}/>
  `

  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return { props: { mdxSource } }
}
