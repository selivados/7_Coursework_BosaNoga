import { FC } from "react";

import { Cart } from "../../components/Cart";
import { Order } from "../../components/Order";

export const CartPage: FC = () => {
  return (
    <>
      <Cart />
      <Order />
    </>
  );
};
