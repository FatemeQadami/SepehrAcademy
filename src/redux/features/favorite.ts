import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../core/services/storage/storage";

const initialState: any = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, { payload }) => {
      const { id } = payload;

      const find = state.find((item: { _id: string }) => item._id === id);

      if (find) {
        return state.filter((item: { _id: string }) => item._id !== id);
      } else {
        state.push({ ...payload });
        setItem("selectedCourse", JSON.stringify(state));
      }
    },
  },
});

export const { addToFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
