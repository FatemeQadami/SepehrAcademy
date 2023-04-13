import { createSlice } from "@reduxjs/toolkit";


const filterWordSlice = createSlice({
  name: "filterWord",
  initialState: {
    filterWord: "",
  },
  reducers: {
    handeFilterWord: (state, action) => {
      state.filterWord = action.payload.filterWord;
    },
  },
});

export const { handeFilterWord } = filterWordSlice.actions;
export default filterWordSlice.reducer;