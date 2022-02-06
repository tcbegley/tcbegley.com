import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { toKebabCase } from "../helpers";

import * as style from "./content.module.css";
import { readMore } from "./content-preview.module.css";

const ContentPreview = ({ title, author, date, path, tags, excerpt }) => (
  <div className={style.post}>
    <div className={style.postContent}>
      <h1 className={style.title}>
        <Link to={path}>{title}</Link>
      </h1>
      <div className={style.meta}>
        {date} {author && <>— Written by {author}</>}
        {tags ? (
          <div className={style.tags}>
            {tags.map((tag) => (
              <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
                <span className={style.tag}>#{tag}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      <p>{excerpt}</p>
      <Link to={path} className={readMore}>
        Read more →
      </Link>
    </div>
  </div>
);

ContentPreview.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  author: PropTypes.string,
  excerpt: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

ContentPreview.defaultProps = {
  title: "",
  author: null,
  date: null,
  tags: [],
  excerpt: null,
};

export default ContentPreview;
