import { FC } from "react";
import { Link } from "react-router-dom";

import { IProduct } from "../../models";

import "./productCard.css";

interface IProductProps {
  product: IProduct;
}

export const ProductCard: FC<IProductProps> = (props) => {
  const { product } = props;

  return (
    <div className="col-4 d-flex">
      <div className="card catalog-item-card w-100">
        <div className="card-image-container">
          <img 
            src={product.images[0]}
            alt={product.title}
            className="card-image"
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
