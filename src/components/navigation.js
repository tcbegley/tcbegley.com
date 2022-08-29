import Link from 'next/link'

import * as style from './navigation.module.css'

export default function Navigation({
  nextPath,
  previousPath,
  nextLabel,
  previousLabel,
}) {
  return previousPath || nextPath ? (
    <div className={style.navigation}>
      {previousPath && (
        <span className={style.button}>
          <Link to={previousPath}>
            <span className={style.iconPrev}>←</span>
            <span className={style.buttonText}>{previousLabel}</span>
          </Link>
        </span>
      )}
      {nextPath && (
        <span className={style.button}>
          <Link href={nextPath}>
            <a>
              <span className={style.buttonText}>{nextLabel}</span>
              <span className={style.iconNext}>→</span>
            </a>
          </Link>
        </span>
      )}
    </div>
  ) : null
}
