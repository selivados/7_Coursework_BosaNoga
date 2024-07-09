import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../Header";
import { Banner } from "../Banner";
import { Footer } from "../Footer";

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
