const postCssPresetEnv = require(`postcss-preset-env`);
const postCSSNested = require("postcss-nested");
const postCSSUrl = require("postcss-url");
const postCSSImports = require("postcss-import");
const cssnano = require("cssnano");
const postCSSMixins = require("postcss-mixins");

module.exports = {
  siteMetadata: {
    title: `Tom Begley`,
    description: `Personal website of Tom Begley`,
    copyrights: "",
    author: `@tcbegley`,
    logo: {
      src: "",
      alt: "",
    },
    logoText: "tcbegley",
    defaultTheme: "dark",
    postsPerPage: 5,
    showMenuItems: 2,
    menuMoreText: "More",
    mainMenu: [
      {
        title: "About",
        path: "/about",
      },
      {
        title: "Blog",
        path: "/blog",
      },
      {
        title: "Code",
        path: "/code",
      },
      {
        title: "Photos",
        path: "/photos",
      },
      {
        title: "Maths",
        path: "/maths",
      },
    ],
  },
  plugins: [
    `babel-preset-gatsby`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: "src/styles/variables.css",
            stage: 1,
            preserve: false,
          }),
          cssnano({
            preset: "default",
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tcbegley.com`,
        short_name: `tcbegley.com`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `minimal-ui`,
        icon: `src/images/hello-icon.png`,
      },
    },
  ],
};
