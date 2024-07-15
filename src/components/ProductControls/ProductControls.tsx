import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../redux/slices/cartSlice";
import { IProductDetails } from "../../models";
import { useAppDispatch } from "../../hooks";

import "./productControls.css";

interface IProductControlsProps {
  product: IProductDetails;
}

export const ProductControls: FC<IProductControlsProps> = (props) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { product } = props;
  const sizes = product.sizes.filter((size) => size.available);

  const handleSelectSize = (size: string) => {
    size === selectedSize
      ? setSelectedSize("")
      : setSelectedSize(size);
  };

  const handleDecrement = () => {
    if (count === 1) return;

    setCount(count - 1);
  };

  const handleIncrement = () => {
    if (count === 10) return;

    setCount(count + 1);
  };

  const handleAddToCart = (product: IProductDetails) => {
    const productToAdd = {
      id: product.id,
      title: product.title,
      size: selectedSize,
      count: count,
      price: product.price,
      totalCost: count * product.price, 
    };

    dispatch(addToCart(productToAdd));
    navigate("/cart");
  }

  if (!sizes.length) return (
    <div className="text-center">
      <p>Размеры в наличии: нет</p>
    </div>
  );

  return (
    <>
      <div className="text-center">
        <p>Размеры в наличии:
          {sizes.map((size) => (
            <span
              key={size.size}
              onClick={() => handleSelectSize(size.size)}
              className={`catalog-item-size ${selectedSize === size.size ? "selected" : ""}`}
            >
              {size.size}
            </span>
          ))}
        </p>
        <p>Количество:
          <span className="btn-group btn-group-sm pl-2">
            <button
              onClick={handleDecrement}
              className="btn btn-secondary"
            >
              -
            </button>
            <span className="btn btn-outline-primary">{count}</span>
            <button
              onClick={handleIncrement}
              className="btn btn-secondary"
            >
              +
            </button>
          </span>
        </p>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="btn btn-danger btn-block btn-lg"
        disabled={!selectedSize}
      >
        В корзину
      </button>
    </>
  );
};
