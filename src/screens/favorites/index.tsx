import React, { FC } from "react";

import { Navbar } from "../../components/common/navbar";
import { FavoritesList } from "../../components/lists/favoritesList";

const Favorites: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <FavoritesList />
    </>
  );
};

export default Favorites;
