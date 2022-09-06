import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import styles from './navigation.module.css'

const Button = ({ path, label, next, onClick }) => {
  const Tag = onClick ? React.Fragment : Link
  return (
    <span className={styles.button}>
      <Tag href={path}>
        <a
          onClick={
            onClick &&
            ((e) => {
              e.preventDefault()
              onClick()
            })
          }
        >
          {!next && <span className={styles.iconPrev}>←</span>}
          <span className={styles.buttonText}>{label}</span>
          {next && <span className={styles.iconNext}>→</span>}
        </a>
      </Tag>
    </span>
  )
}

export default function Navigation({
  nextPath,
  previousPath,
  nextLabel,
  previousLabel,
  onNextClick,
  onPreviousClick,
}) {
  return previousPath || onPreviousClick || nextPath || onNextClick ? (
    <div className={styles.navigation}>
      {(previousPath || onPreviousClick) && (
        <Button
          label={previousLabel}
          path={previousPath}
          next={false}
          onClick={onPreviousClick}
        />
      )}
      {(nextPath || onNextClick) && (
        <Button
          label={nextLabel}
          path={nextPath}
          next={true}
          onClick={onNextClick}
        />
      )}
    </div>
  ) : null
}
