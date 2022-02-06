import React from "react";

import Seo from "./seo";
import Layout from "./layout";

const PageLayout = ({
  children,
  pageContext: {
    frontmatter: { title },
  },
  path,
}) => (
  <>
    <Seo title={title} />
    <Layout title={title} path={path}>
      {children}
    </Layout>
  </>
  // <Layout>
  //   <Seo title={title} description={excerpt} />
  //   <Post
  //     key={id}
  //     title={title}
  //     path={path}
  //     coverImage={coverImage}
  //     body={body}
  //     tags={tags}
  //   />
  // </Layout>
);

export default PageLayout;
