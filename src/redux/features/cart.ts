import { createSlice } from "@reduxjs/toolkit";

import { setItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

const initialState: any = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { _id: id } = payload;

      const find = state?.find((item: { _id: string }) => item._id === id);
      console.log("find", find);
      console.log("add", payload);

      if (find) {
        return state?.filter((item: { _id: string }) => item._id !== id);
      } else {
        const localData = [...state, payload];
        console.log("localData", localData);
        state?.push({ ...payload });
        setItem(EStorageKeys.SelectedCourse, localData);
      }
    },
    loadCartData: (state, { payload }) => {
      return payload;
    },
    removeItemFromCart: (state, action) => {
      const items = action.payload;
      const local = [
        ...state.filter((item: { _id: string }) => item._id !== items._id),
      ];
      return local;
    },
  },
});

export const { loadCartData, addToCart, removeItemFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
