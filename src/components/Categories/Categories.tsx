import { FC, useEffect } from "react";

import { Preloader } from "../Preloader";
import { categoriesState, fetchCategories } from "../../redux/slices/categoriesSlice";
import { catalogState, setCategoryId } from "../../redux/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import "./categories.css";

export const Categories: FC = () => {
  const { categories, loading, error } = useAppSelector(categoriesState);
  const { categoryId } = useAppSelector(catalogState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());

    return () => {
      dispatch(setCategoryId(null));
    }
  }, []);

  const handleClick = (id: number | null) => {
    dispatch(setCategoryId(id));
  };

  if (loading) return <Preloader />
  if (error) return <h4 className="text-center text-danger">Error fetching categories</h4>;
  if (categories.length > 0) return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <span
          className={`nav-link ${categoryId === null ? "active" : ""}`}
          onClick={() => handleClick(null)}
        >
          Все
        </span>
      </li>
      {categories.map((category) => (
        <li key={category.id} className="nav-item">
          <span
            className={`nav-link ${categoryId === category.id ? "active" : ""}`}
            onClick={() => handleClick(category.id)}
          >
            {category.title}
          </span>
        </li>
      ))}
    </ul>
  );
};
