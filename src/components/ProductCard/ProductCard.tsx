import { FC, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import { IProduct } from "../../models";

import placeholderImage from "../../img/image-not-found.jpg";
import "./productCard.css";

interface IProductProps {
  product: IProduct;
}

export const ProductCard: FC<IProductProps> = (props) => {
  const { product } = props;

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
  }

  return (
    <div className="col-4 d-flex">
      <div className="card catalog-item-card w-100">
        <div className="card-image-container">
          <img 
            src={product.images[0] ? product.images[0] : placeholderImage}
            alt={product.title}
            className="card-image"
            onError={onImageError}
          />
        </div>
        <div className="card-body">
          <p className="card-text">{product.title}</p>
          <p className="card-text">{`${product.price.toLocaleString("ru")} руб.`}</p>
          <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  );
};
