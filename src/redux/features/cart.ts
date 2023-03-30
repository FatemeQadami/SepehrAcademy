import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../core/services/storage/storage";

const initialState: any = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id } = payload;
      const find = state.find((item: { _id: string }) => item._id === id);

      if (find) {
        return state.map((item: { _id: string }) =>
          item._id === id ? { ...item } : item
        );
      } else {
        state.push({ ...payload });
        setItem("selectedCourse", JSON.stringify(state));
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.filter((item: { _id: string }) => item._id !== itemId);
    },

  },
});

export const { addToCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
