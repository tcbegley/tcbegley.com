import Link from 'next/link'
import React from 'react'

import styles from './navigation.module.css'

const Button = ({ path, label, next }) => (
  <span className={styles.button}>
    <Link href={path}>
      <a>
        {!next && <span className={styles.iconPrev}>←</span>}
        <span className={styles.buttonText}>{label}</span>
        {next && <span className={styles.iconNext}>→</span>}
      </a>
    </Link>
  </span>
)

export default function Navigation({
  nextPath,
  previousPath,
  nextLabel,
  previousLabel,
}) {
  return previousPath || nextPath ? (
    <div className={styles.navigation}>
      {previousPath && (
        <Button label={previousLabel} path={previousPath} next={false} />
      )}
      {nextPath && <Button label={nextLabel} path={nextPath} next={true} />}
    </div>
  ) : null
}
