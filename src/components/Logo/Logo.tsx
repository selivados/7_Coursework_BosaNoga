import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "../../img/header-logo.png";

export const Logo: FC = () => {
  return (
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="Bosa Noga" />
    </Link>
  );
};
