import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const find = state?.find((item: { _id: string }) => {
        return item?._id === payload?._id;
      });
      console.log("find", find);
      console.log("add", payload);

      if (find) {
        const o = state?.filter(
          (item: { _id: string }) => item?._id !== payload?._id
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
    loadCartData: (state, { payload }) => {
      return payload;
    },
    removeItemFromCart: (state, action) => {
      const items = action.payload;
      const local = [
        ...state.filter((item: { _id: string }) => item?._id !== items?._id),
      ];
      console.log("local", local);
      return local;
    },
    clearCart: (state) => {
      state = [];
    },
  },
});

export const { loadCartData, addToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
