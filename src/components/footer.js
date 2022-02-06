import React from "react";

import { footer } from "./footer.module.css";

const Footer = () => (
  <footer>
    <span className={footer}>
      © Tom Begley 2022 | Built with{" "}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </span>
  </footer>
);

export default Footer;
