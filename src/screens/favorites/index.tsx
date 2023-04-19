import React, { FC } from "react";

import { Header } from "../../components/common/header";
import { FavoritesList } from "../../components/lists/favoritesList";

const Favorites: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <FavoritesList />
    </>
  );
};

export default Favorites;
