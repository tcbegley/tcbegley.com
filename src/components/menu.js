import { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Icon from './icon'
import styles from './menu.module.css'

function menuItems(menu) {
  return menu.map(({ path, title }) => (
    <li className={styles.menuItem} key={path + title}>
      <Link href={path}>{title}</Link>
    </li>
  ))
}

function MainMenu({ mainMenu, showMenuItems, isMobileMenu }) {
  const menu = mainMenu.slice(0)
  !isMobileMenu && menu.splice(showMenuItems)

  return menuItems(menu)
}

function SubMenu({ mainMenu, showMenuItems, onToggleSubMenu }) {
  const menu = mainMenu.slice(0)
  menu.splice(0, showMenuItems)

  return (
    <>
      {menuItems(menu)}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={styles.subMenuOverlay}
        role="button"
        aria-label="close menu"
        tabIndex={0}
        onClick={onToggleSubMenu}
      />
    </>
  )
}

const menuIcon = `M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z`
const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`

export default function Menu({
  mainMenu,
  showMenuItems,
  menuMoreText,
  onChangeTheme,
}) {
  const [mobileMenuVisible, toggleMobileMenu] = useState(false)
  const [subMenuVisible, toggleSubMenu] = useState(false)

  const onToggleMobileMenu = () => toggleMobileMenu(!mobileMenuVisible)
  const onToggleSubMenu = () => toggleSubMenu(!subMenuVisible)

  const subMenuRequired =
    !(showMenuItems >= mainMenu.length) && showMenuItems > 0

  const mobileMenu = (
    <>
      <ul className={styles.mobileMenu}>
        <MainMenu mainMenu={mainMenu} isMobileMenu />
      </ul>
      <div
        role="button"
        aria-label="close menu"
        tabIndex={-1}
        onKeyPress={(e) => e.key === 'Esc' && onToggleMobileMenu()}
        onClick={onToggleMobileMenu}
        className={styles.mobileMenuOverlay}
      />
    </>
  )

  const subMenu = (
    <ul className={styles.subMenu}>
      <SubMenu
        mainMenu={mainMenu}
        showMenuItems={showMenuItems}
        onToggleSubMenu={onToggleSubMenu}
      />
    </ul>
  )

  const subMenuToggle = (
    <>
      <button
        className={styles.subMenuTrigger}
        onClick={onToggleSubMenu}
        type="button"
        aria-label="Menu"
      >
        {menuMoreText || 'Menu'}{' '}
        <span className={styles.menuArrow}>
          <FontAwesomeIcon icon={faAngleDown} size="xs" />
        </span>
      </button>
      {subMenuVisible ? subMenu : null}
    </>
  )

  return (
    <>
      <div className={styles.mobileMenuContainer}>
        <>
          {mobileMenuVisible ? mobileMenu : null}
          <button
            className={styles.menuTrigger}
            style={{ color: 'inherit' }}
            onClick={onToggleMobileMenu}
            type="button"
            aria-label="Menu"
          >
            <Icon style={{ cursor: 'pointer' }} size={24} d={menuIcon} />
          </button>
        </>
      </div>
      <div className={styles.desktopMenuContainer}>
        <ul className={styles.menu}>
          <MainMenu mainMenu={mainMenu} showMenuItems={showMenuItems} />
          {subMenuRequired ? subMenuToggle : null}
        </ul>
      </div>
      <button
        className={styles.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon style={{ cursor: 'pointer' }} size={24} d={toggleIcon} />
      </button>
    </>
  )
}

Menu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  showMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
  onChangeTheme: PropTypes.func,
}

SubMenu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  showMenuItems: PropTypes.number,
  onToggleSubMenu: PropTypes.func,
}
