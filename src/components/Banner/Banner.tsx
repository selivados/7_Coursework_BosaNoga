import { FC } from "react";

import "./banner.css";

export const Banner: FC = () => {
  return (
    <div className="banner">
      <img src="/src/img/banner.jpg" className="img-fluid" alt="К весне готовы!"/>
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
};
