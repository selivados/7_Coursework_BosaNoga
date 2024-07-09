import { FC } from "react";

import { SearchForm } from "../../components/SearchForm";
import { Catalog } from "../../components/Catalog";

export const CatalogPage: FC = () => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <SearchForm />
      <Catalog />
    </section>
  );
};
