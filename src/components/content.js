import Link from 'next/link'

import { toKebabCase } from '../lib'

import style from './content.module.css'

export default function Content({ children, title, author, date, tags }) {
  return (
    <div className={style.post}>
      <div className={style.postContent}>
        {title ? <h1 className={style.title}>{title}</h1> : null}
        {date || author || tags.length ? (
          <div className={style.meta}>
            {date} {author && <>— Written by {author}</>}
            {tags ? (
              <div className={style.tags}>
                {tags.map((tag) => (
                  <Link
                    href={`/blog/tags/${toKebabCase(tag)}`}
                    key={toKebabCase(tag)}
                  >
                    <a>
                      <span className={style.tag}>#{tag}</span>
                    </a>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  )
}

Content.defaultProps = {
  title: '',
  author: null,
  date: null,
  tags: [],
}
