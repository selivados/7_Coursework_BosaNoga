import { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { Preloader } from "../Preloader";
import { ProductCard } from "../ProductCard";
import { catalogState, clearProducts, fetchProducts } from "../../redux/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const ProductsList: FC = () => {
  const { products, stack, categoryId, searchText, loading, error } = useAppSelector(catalogState);
  const [loadingMore, setLoadingMore] = useState(false);
  const renderCount = useRef(1);
  const offset = useRef(0);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const offsetStep = 6;
  
  useEffect(() => {
    if (renderCount.current === 1) {
      if (location.pathname === "/" && (categoryId || searchText)) return;
      if (location.pathname !== "/" && categoryId) return;
    }

    renderCount.current += 1;
    offset.current = 0;

    dispatch(clearProducts());
    dispatch(fetchProducts({ categoryId, offset: 0, searchText }));
  }, [categoryId, searchText]);

  const handleClick = () => {
    setLoadingMore(true);

    const newOffset = offset.current + offsetStep;
    offset.current = newOffset;

    dispatch(fetchProducts({ categoryId, offset: newOffset, searchText }));
  };

  if (!loading && loadingMore) {
    setLoadingMore(false);
  }

  if (loading && !loadingMore) return <Preloader />;
  if (error) return (
    <h5 className="alert alert-danger text-center" role="alert">
      Ошибка при получении списка товаров
    </h5>
  );
  if (products.length === 0) return (
    <h5 className="alert alert-info text-center" role="alert">
      По вашему запросу товаров не найдено
    </h5>
  );

  return (
    <>
      <div className="row">
        {products.map((product) =>
          <ProductCard product={product} key={product.id} />
        )}
      </div>
      {loadingMore && <Preloader />}
      {!loadingMore && stack.length === offsetStep && (
        <div className="text-center">
          <button
            onClick={handleClick}
            className="btn btn-outline-primary"
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </>
  );
};
