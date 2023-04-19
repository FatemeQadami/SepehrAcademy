import { createSlice } from "@reduxjs/toolkit";

import { setItem } from "../../core/services/storage/storage";
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
      } else {
        state?.push({ ...payload });
        setItem(EStorageKeys.SelectedFav, state);
      }
    },
    loadFavData: (state, { payload }) => {
      return payload;
    },
    removeItem: (state, action) => {
      const items = action.payload;
      const local = [
        ...state.filter((item: { _id: string }) => item._id !== items._id),
      ];
      return local;
    },
  },
});

export const { loadFavData, addToFavorite, removeItem } = favoriteSlice.actions;
export default favoriteSlice.reducer;
