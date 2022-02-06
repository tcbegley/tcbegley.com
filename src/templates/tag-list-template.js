import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import ContentPreview from '../components/content-preview'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Navigation from '../components/navigation'

import { infoBanner } from './list-template.module.css'

const Index = ({
  data,
  pageContext: { nextPagePath, previousPagePath, tag },
}) => {
  const {
    allMdx: { edges: posts },
  } = data

  const previews = posts.map(({ node }) => {
    const {
      id,
      excerpt: autoExcerpt,
      frontmatter: { title, date, author, excerpt, tags },
      slug,
    } = node

    return (
      <ContentPreview
        key={id}
        title={title}
        date={date}
        path={slug}
        author={author}
        tags={tags}
        excerpt={excerpt || autoExcerpt}
      />
    )
  })

  return (
    <>
      <Seo />
      <Layout>
        <div className={infoBanner}>
          Posts with tag: <span>#{tag}</span>
        </div>
        {previews}
        <Navigation
          previousPath={previousPagePath}
          previousLabel="Newer posts"
          nextPath={nextPagePath}
          nextLabel="Older posts"
        />
      </Layout>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const tagsQuery = graphql`
  query ($limit: Int!, $skip: Int!, $tag: String!) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "//blog//" }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            author
            date(formatString: "DD MMMM YYYY")
            excerpt
            tags
            title
          }
          slug
        }
      }
    }
  }
`

export default Index
