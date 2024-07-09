import { FC } from "react";

import { Logo } from "../Logo";
import { Nav } from "../Nav";
import { HeaderControls } from "../HeaderControls";

export const NavBar: FC = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Logo />
      <div className="collapse navbar-collapse" id="navbarMain">
        <Nav />
        <HeaderControls />
      </div>
    </nav>
  );
};
