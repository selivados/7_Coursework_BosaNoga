import { FC } from "react";
import { Link } from "react-router-dom";

import { cartPositionsCount } from "../../redux/slices/cartSlice";
import { useAppSelector } from "../../hooks";

export const CartIcon: FC = () => {
  const positionsCount = useAppSelector(cartPositionsCount);

  return (
    <Link to="/cart" className="header-controls-pic header-controls-cart">
      {positionsCount > 0 && (
        <div className="header-controls-cart-full">{positionsCount}</div>
      )}
      <div className="header-controls-cart-menu"></div>
    </Link>
  );
};
