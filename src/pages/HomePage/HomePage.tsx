import { FC } from "react";

import { TopSales } from "../../components/TopSales";
import { Catalog } from "../../components/Catalog";

export const HomePage: FC = () => {
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <TopSales />
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog />
      </section>
    </>
  );
};
