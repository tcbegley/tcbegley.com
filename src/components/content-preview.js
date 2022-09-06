import Link from 'next/link'

import { toKebabCase } from '../lib'

import styles from './content.module.css'
import { readMore } from './content-preview.module.css'

export default function ContentPreview({
  title,
  author,
  date,
  path,
  tags,
  excerpt,
}) {
  return (
    <div className={styles.post}>
      <div className={styles.postContent}>
        <h1 className={styles.title}>
          <Link href={path}>{title}</Link>
        </h1>
        <div className={styles.meta}>
          {date} {author && <>— Written by {author}</>}
          {tags ? (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Link
                  href={`/blog/tags/${toKebabCase(tag)}/`}
                  key={toKebabCase(tag)}
                >
                  <span className={styles.tag}>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <p>{excerpt}</p>
        <Link href={path}>
          <a className={readMore}>Read more →</a>
        </Link>
      </div>
    </div>
  )
}
