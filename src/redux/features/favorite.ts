import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, { payload }) => {
      const find = state?.find((item: { _id: string }) => {
        console.log(item._id, payload?._id);
        return item._id === payload?._id;
      });

      console.log("findf", find);
      console.log("addf", payload);

      if (find) {
        const o = state?.filter(
          (item: { _id: string }) => item._id !== payload?._id
        );
        return o;
      } else {
        try {
          const localData = state ? [...state, payload] : [payload];
          return localData;
        } catch (error) {
          console.log(error);
        }
      }
    },
    loadFavData: (state, { payload }) => {
      return payload;
    },
    removeItemFromFav: (state, action) => {
      const items = action.payload;
      const local = [
        ...state.filter((item: { _id: string }) => item._id !== items?._id),
      ];
      return local;
    },
    clearFavorite: (state) => {
      state = [];
    },
  },
});

export const { loadFavData, addToFavorite, removeItemFromFav, clearFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
