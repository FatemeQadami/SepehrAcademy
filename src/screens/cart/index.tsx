import React, { FC } from "react";
import { Text } from "react-native";
import Navbar from "../../components/common/navbar";
import CartList from "../../components/lists/cartList";

const Cart: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <CartList />
    </>
  );
};

export default Cart;
