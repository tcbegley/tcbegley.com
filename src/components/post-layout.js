import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'

import Layout from './layout'
import Navigation from './navigation'
import Seo from './seo'

const shortcodes = { Link } // Provide common components here
const PostLayout = ({
  data: {
    mdx: { frontmatter, body },
  },
  pageContext: {
    nextPost: { path: nextPostPath, label: nextPostLabel },
    previousPost: { path: previousPostPath, label: previousPostLabel },
  },
}) => (
  <>
    <Seo title={frontmatter.title} />
    <Layout
      title={frontmatter.title}
      author={frontmatter.author}
      date={frontmatter.date}
      tags={frontmatter.tags}
      excerpt={frontmatter.excerpt}
    >
      <MDXProvider components={shortcodes}>
        <MDXRenderer frontmatter={frontmatter}>{body}</MDXRenderer>
      </MDXProvider>
      <Navigation
        previousPath={previousPostPath}
        previousLabel={previousPostLabel}
        nextPath={nextPostPath}
        nextLabel={nextPostLabel}
      />
    </Layout>
  </>
)

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        author
        date(formatString: "DD MMMM YYYY")
        tags
        excerpt
        title
      }
      body
    }
  }
`

export default PostLayout
