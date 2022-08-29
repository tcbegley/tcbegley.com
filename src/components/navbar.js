import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import Menu from './menu'
import Typist from './typist'
import siteConfig from '../config'

import styles from './navbar.module.css'

export default function Navbar() {
  const { logoText, defaultTheme, mainMenu, showMenuItems, menuMoreText } =
    siteConfig

  const defaultThemeState =
    (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
    defaultTheme

  const [activeTheme, changeTheme] = useState(defaultThemeState)

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', activeTheme)
  }, [activeTheme])

  const onChangeTheme = () =>
    changeTheme(activeTheme === 'light' ? 'dark' : 'light')

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/">
            <a>
              <div className={styles.logo}>
                <>
                  <span className={styles.mark}>
                    <FontAwesomeIcon icon={faAngleRight} size="xs" />
                  </span>
                  <Typist className={styles.text} text={logoText} />
                  <span className={styles.cursor} />
                </>
              </div>
            </a>
          </Link>
          <span className={styles.right}>
            <Menu
              mainMenu={mainMenu}
              showMenuItems={showMenuItems}
              menuMoreText={menuMoreText}
              onChangeTheme={onChangeTheme}
            />
          </span>
        </div>
      </header>
    </>
  )
}
