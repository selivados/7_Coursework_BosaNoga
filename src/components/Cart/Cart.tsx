import { FC } from "react";
import { Link } from "react-router-dom";

import { cartState, cartTotalCost, removeFromCart } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IProductInCart } from "../../models";

export const Cart: FC = () => {
  const { cart } = useAppSelector(cartState);
  const totalCost = useAppSelector(cartTotalCost);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (product: IProductInCart) => {
    dispatch(removeFromCart(product));
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={`${product.id}-${product.size}`}>
              <td scope="row">{index + 1}</td>
              <td>
                <Link to={`/catalog/${product.id}`}>{product.title}</Link>
              </td>
              <td>{product.size}</td>
              <td>{product.count}</td>
              <td>{`${product.price.toLocaleString("ru")} руб.`}</td>
              <td>{`${product.totalCost.toLocaleString("ru")} руб.`}</td>
              <td>
                <button
                  onClick={() => handleRemoveFromCart(product)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="text-right">
              Общая стоимость
            </td>
            <td>{`${totalCost.toLocaleString("ru")} руб.`}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
