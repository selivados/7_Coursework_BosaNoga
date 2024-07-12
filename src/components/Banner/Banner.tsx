import { FC } from "react";

import banner from "../../img/banner.jpg";
import "./banner.css";

export const Banner: FC = () => {
  return (
    <div className="banner">
      <img src={banner} className="img-fluid" alt="К весне готовы!"/>
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
};
