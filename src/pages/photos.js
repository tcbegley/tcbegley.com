import React from "react";
import { graphql } from "gatsby";
import Gallery from "react-grid-gallery";

import Layout from "../components/layout";
import Seo from "../components/seo";

const Photos = ({ data }) => {
  const images = data.allFlickrPhoto.nodes.map((node) => ({
    src: node.url_l,
    thumbnail: node.url_s,
    thumbnailWidth: node.width_s,
    thumbnailHeight: node.height_s,
    caption: node.description,
  }));
  return (
    <>
      <Seo title={"Photos"} />
      <Layout title="Photos">
        <p>
          I'm a keen amateur photographer. On this page you can find a few of
          the photos I've taken over the years. Click on any of them to see a
          higher resolution version.
        </p>
        <p>
          All of these photos are also available on my{" "}
          <a href="https://flickr.com/photos/149210668@N06/">Flickr</a> account.
        </p>
        <Gallery
          id="photo-gallery"
          enableImageSelection={false}
          images={images}
        />
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    allFlickrPhoto {
      nodes {
        id
        width_s
        height_s
        url_s
        url_l
        description
      }
    }
  }
`;

export default Photos;
