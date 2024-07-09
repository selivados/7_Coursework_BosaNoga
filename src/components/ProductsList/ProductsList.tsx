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
  if (error) return <h4 className="text-center text-danger">Error fetching catalog products</h4>;
  if (products.length > 0) return (
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
