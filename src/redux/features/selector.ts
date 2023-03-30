import { createSlice } from "@reduxjs/toolkit";

const selectorSlice = createSlice({
  name: "selector",
  initialState: {
    route: "",
  },
  reducers: {
    handelSelect: (state, action) => {
      state.route = action.payload.route;
    },
  },
});


export const { handelSelect } = selectorSlice.actions;
export default selectorSlice.reducer;
