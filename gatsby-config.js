require('dotenv').config()

const postCSSPresetEnv = require('postcss-preset-env')
const esmRequire = require('./src/helpers/esmRequire')

module.exports = {
  siteMetadata: {
    title: `Tom Begley`,
    description: `Personal website of Tom Begley`,
    siteUrl: 'https://tcbegley.com',
    author: `@tcbegley`,
    logoText: 'tcbegley',
    defaultTheme: 'dark',
    postsPerPage: 5,
    showMenuItems: 2,
    menuMoreText: 'More',
    mainMenu: [
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'Blog',
        path: '/blog',
      },
      {
        title: 'Code',
        path: '/code',
      },
      {
        title: 'Photos',
        path: '/photos',
      },
      {
        title: 'Maths',
        path: '/maths',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-flickr',
      options: {
        api_key: process.env.FLICKR_API_KEY,
        method: 'flickr.photosets.getPhotos',
        photoset_id: '72157708283484644',
        user_id: '149210668@N06',
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('postcss-url'),
          require('postcss-import'),
          require('postcss-nested'),
          require('postcss-custom-media'),
          postCSSPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 1,
          }),
          // require("cssnano"),
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-remark-images',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/content/pages`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/content`,
        ignore: ['pages'],
      },
      __key: 'posts',
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/content/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          pages: require.resolve(`${__dirname}/src/components/page-layout.js`),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
              wrapperStyle:
                'border:8px solid white;border-radius:8px;background:white;box-sizing:content-box;',
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
        ],
        remarkPlugins: [esmRequire('remark-math')],
      },
    },
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        // REQUIRED! https://[my_code].goatcounter.com
        code: 'tcbegley',
      },
    },
  ],
}
