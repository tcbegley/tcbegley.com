const config = {
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
  flickr: {
    method: 'flickr.photosets.getPhotos',
    photoset_id: '72157708283484644',
    user_id: '149210668@N06',
  },
}

export default config
