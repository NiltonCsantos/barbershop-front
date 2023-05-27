import React from "react";

import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <footer>
      <span id="about">
        <p style={{ fontSize: "1.2rem" }}>
          {" "}
          <BiCopyright /> 2023- César
        </p>

        <p style={{ fontSize: "1.1rem" }}>Todos os direitos reservados</p>
      </span>
    </footer>
  );
};

export default Footer;
