import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Icon from "./icon";
import * as style from "./menu.module.css";

const menuItems = (menu) =>
  menu.map(({ path, title }) => (
    <li key={path + title}>
      <Link to={path}>{title}</Link>
    </li>
  ));

const MainMenu = ({ mainMenu, showMenuItems, isMobileMenu }) => {
  const menu = mainMenu.slice(0);
  !isMobileMenu && menu.splice(showMenuItems);

  return menuItems(menu);
};

const SubMenu = ({ mainMenu, showMenuItems, onToggleSubMenu }) => {
  const menu = mainMenu.slice(0);
  menu.splice(0, showMenuItems);

  return (
    <>
      {menuItems(menu)}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={style.subMenuOverlay}
        role="button"
        aria-label="close menu"
        tabIndex={0}
        onClick={onToggleSubMenu}
      />
    </>
  );
};

const menuIcon = `M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z`;
const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`;

const Menu = ({ mainMenu, showMenuItems, menuMoreText, onChangeTheme }) => {
  const [mobileMenuVisible, toggleMobileMenu] = useState(false);
  const [subMenuVisible, toggleSubMenu] = useState(false);

  const onToggleMobileMenu = () => toggleMobileMenu(!mobileMenuVisible);
  const onToggleSubMenu = () => toggleSubMenu(!subMenuVisible);

  const subMenuRequired =
    !(showMenuItems >= mainMenu.length) && showMenuItems > 0;

  const mobileMenu = (
    <>
      <ul className={style.mobileMenu}>
        <MainMenu mainMenu={mainMenu} isMobileMenu />
      </ul>
      <div
        role="button"
        aria-label="close menu"
        tabIndex={-1}
        onKeyPress={(e) => e.key === "Esc" && onToggleMobileMenu()}
        onClick={onToggleMobileMenu}
        className={style.mobileMenuOverlay}
      />
    </>
  );

  const subMenu = (
    <ul className={style.subMenu}>
      <SubMenu
        mainMenu={mainMenu}
        showMenuItems={showMenuItems}
        onToggleSubMenu={onToggleSubMenu}
      />
    </ul>
  );

  const subMenuToggle = (
    <>
      <button
        className={style.subMenuTrigger}
        onClick={onToggleSubMenu}
        type="button"
        aria-label="Menu"
      >
        {menuMoreText || "Menu"} <span className={style.menuArrow}>&gt;</span>
      </button>
      {subMenuVisible ? subMenu : null}
    </>
  );

  return (
    <>
      <div className={style.mobileMenuContainer}>
        <>
          {mobileMenuVisible ? mobileMenu : null}
          <button
            className={style.menuTrigger}
            style={{ color: "inherit" }}
            onClick={onToggleMobileMenu}
            type="button"
            aria-label="Menu"
          >
            <Icon style={{ cursor: "pointer" }} size={24} d={menuIcon} />
          </button>
        </>
      </div>
      <div className={style.desktopMenuContainer}>
        <ul className={style.menu}>
          <MainMenu mainMenu={mainMenu} showMenuItems={showMenuItems} />
          {subMenuRequired ? subMenuToggle : null}
        </ul>
      </div>
      <button
        className={style.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon style={{ cursor: "pointer" }} size={24} d={toggleIcon} />
      </button>
    </>
  );
};

Menu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  showMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
  onChangeTheme: PropTypes.func,
};

SubMenu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  showMenuItems: PropTypes.number,
  onToggleSubMenu: PropTypes.func,
};

export default Menu;
