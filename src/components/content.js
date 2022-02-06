import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { toKebabCase } from "../helpers";

import * as style from "./content.module.css";

const Content = ({ children, title, author, date, tags }) => {
  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h1 className={style.title}>{title}</h1>
        {(date || author || tags) && (
          <div className={style.meta}>
            {date} {author && <>— Written by {author}</>}
            {tags ? (
              <div className={style.tags}>
                {tags.map((tag) => (
                  <Link to={`/tag/${toKebabCase(tag)}`} key={toKebabCase(tag)}>
                    <span className={style.tag}>#{tag}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  children: PropTypes.any,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Content.defaultProps = {
  title: "",
  author: null,
  date: null,
  tags: [],
};

export default Content;
