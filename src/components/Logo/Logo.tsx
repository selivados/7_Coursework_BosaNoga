import { FC } from "react";
import { Link } from "react-router-dom";

export const Logo: FC = () => {
  return (
    <Link className="navbar-brand" to="/">
      <img src="/src/img/header-logo.png" alt="Bosa Noga" />
    </Link>
  );
};
