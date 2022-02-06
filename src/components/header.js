import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

import Menu from "./menu";
import Typist from "./typist";

import * as style from "./header.module.css";

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          logoText
          defaultTheme
          mainMenu {
            title
            path
          }
          showMenuItems
          menuMoreText
        }
      }
    }
  `);
  const { logoText, defaultTheme, mainMenu, showMenuItems, menuMoreText } =
    data.site.siteMetadata;

  //   const { siteLogo, mainMenu, mainMenuItems, menuMoreText, defaultTheme } =
  //     data.site.siteMetadata;
  const defaultThemeState =
    (typeof window !== "undefined" && window.localStorage.getItem("theme")) ||
    null;

  const [userTheme, changeTheme] = useState(defaultThemeState);

  const onChangeTheme = () => {
    const opositeTheme =
      (userTheme || defaultTheme) === "light" ? "dark" : "light";

    changeTheme(opositeTheme);

    typeof window !== "undefined" &&
      window.localStorage.setItem("theme", opositeTheme);
  };

  return (
    <>
      <Helmet>
        <body
          className={
            (userTheme || defaultTheme) === "light"
              ? "light-theme"
              : "dark-theme"
          }
        />
      </Helmet>
      <header className={style.header}>
        <div className={style.inner}>
          <Link to="/">
            <div className={style.logo}>
              <>
                <span className={style.mark}>&gt;</span>
                <Typist className={style.text} text={logoText} />
                <span className={style.cursor} />
              </>
            </div>
          </Link>
          <span className={style.right}>
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
  );
};

export default Header;
