import { FC, useEffect } from "react";

import { Preloader } from "../Preloader";
import { ProductCard } from "../ProductCard";
import { fetchTopSales, topSalesState } from "../../redux/slices/topSalesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const TopSales: FC = () => {
  const { products, loading, error } = useAppSelector(topSalesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopSales());
  }, []);

  if (loading) return <Preloader />;
  if (error) return <h4 className="text-center text-danger">Error fetching top sales</h4>;
  if (products.length > 0) return (
    <div className="row">
      {products.map((product) => 
        <ProductCard product={product} key={product.id} />
      )}
    </div>
  );
};
