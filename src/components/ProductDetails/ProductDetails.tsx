import { FC, SyntheticEvent, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Preloader } from "../Preloader";
import { ProductControls } from "../ProductControls";
import { fetchProduct, productState } from "../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import placeholderImage from "../../img/image-not-found.jpg";

export const ProductDetails: FC = () => {
  const { products, loading, error } = useAppSelector(productState);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  const product = products[0];

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
  }

  if (loading) return <Preloader />;
  if (error) return (
    <h5 className="alert alert-danger text-center mt-3" role="alert">
      Ошибка при получении данных о товаре
    </h5>
  );
  if (products.length > 0) return (
    <section className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={product.images[0] ? product.images[0] : placeholderImage}
            alt={product.title}
            className="img-fluid"
            onError={onImageError}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason}</td>
              </tr>
            </tbody>
          </table>
          <ProductControls product={product} />
        </div>
      </div>
    </section>
  );
};
