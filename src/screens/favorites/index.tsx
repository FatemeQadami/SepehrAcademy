import React, { FC } from "react";
import { Text , View } from "react-native";
import Navbar from "../../components/common/navbar";

const Favorites: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Text>Favorites</Text>
    </>
  );
};

export default Favorites;
