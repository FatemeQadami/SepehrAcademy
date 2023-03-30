import React, { FC } from "react";
import { Text } from "react-native";
import Navbar from "../../components/common/navbar";

const Cart: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Text>Cart</Text>
    </>
  );
};

export default Cart;
