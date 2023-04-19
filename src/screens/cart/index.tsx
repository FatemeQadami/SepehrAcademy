import React, { FC } from "react";

import { CartList } from "../../components/lists/cartList";
import { Header } from "../../components/common/header";

const Cart: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <CartList />
    </>
  );
};

export default Cart;
