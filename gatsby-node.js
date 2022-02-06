const path = require('path')
const { flatMap, uniq } = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

const { toKebabCase } = require('./src/helpers')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            postsPerPage
          }
        }
        allMdx(
          filter: { fileAbsolutePath: { regex: "//blog//" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
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
    `,
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create blog-list pages
  const posts = result.data.allMdx.edges
  const postsPerPage = result.data.site.siteMetadata.postsPerPage
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list-template.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        previousPagePath: i === 0 ? null : i === 1 ? `/blog` : `/blog/${i}`,
        nextPagePath: i === numPages - 1 ? null : `/blog/${i + 2}`,
      },
    })
  })

  posts.forEach(({ node }, i) => {
    const previousPost = i < posts.length - 1 ? posts[i + 1].node : undefined
    const nextPost = i > 0 ? posts[i - 1].node : undefined
    createPage({
      path: `/${node.slug}`,
      component: path.resolve(`./src/components/post-layout.js`),
      context: {
        id: node.id,
        frontmatter: node.frontmatter,
        nextPost: {
          path: nextPost && `/${nextPost.slug}`,
          label: nextPost && nextPost.frontmatter.title,
        },
        previousPost: {
          path: previousPost && `/${previousPost.slug}`,
          label: previousPost && previousPost.frontmatter.title,
        },
      },
    })
  })

  // get array of all tags from all posts
  const tags = uniq(
    flatMap(
      result.data.allMdx.edges
        .filter((edge) => edge.node.frontmatter.tags?.length > 0)
        .map((edge) => edge.node.frontmatter.tags),
    ),
  )

  tags.forEach((tag) => {
    const postsWithTag = posts.filter(
      (post) => post.node.frontmatter.tags?.indexOf(tag) !== -1,
    )

    const numPagesForTag = Math.ceil(postsWithTag.length / postsPerPage)
    const kebabbedTag = toKebabCase(tag)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tag/${kebabbedTag}` : `/tag/${kebabbedTag}/${i + 1}`,
        component: path.resolve('./src/templates/tag-list-template.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          tag,
          numPages: numPagesForTag,
          currentPage: i + 1,
          previousPagePath:
            i === 0
              ? null
              : i === 1
              ? `/tag/${kebabbedTag}`
              : `/tag/${kebabbedTag}/${i}`,
          nextPagePath:
            i === numPagesForTag - 1 ? null : `/tag/${kebabbedTag}/${i + 2}`,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
