import { createSlice } from "@reduxjs/toolkit";

import { removeItem, setItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

const initialState: any = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, { payload }) => {
      const { _id: id } = payload;

      const find = state?.find((item: { _id: string }) => item._id === id);

      if (find) {
        return state?.filter((item: { _id: string }) => item._id !== id);
        setItem(EStorageKeys.SelectedFav, state);
      } else {
        state?.push({ ...payload });
        setItem(EStorageKeys.SelectedFav, state);
      }
    },
    loadFavData: (state, { payload }) => {
      return payload;
    },
    removeItemFromFav: (state, action) => {
      const items = action.payload;
      const local = [
        ...state.filter((item: { _id: string }) => item._id !== items._id),
      ];
      setItem(EStorageKeys.SelectedFav, local);
      return local;
    },
  },
});

export const { loadFavData, addToFavorite, removeItemFromFav } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
