import { FC } from "react";

import { Categories } from "../Categories";
import { ProductsList } from "../ProductsList";

export const Catalog: FC = () => {
  return (
    <>
      <Categories />
      <ProductsList />
    </>
  );
};
