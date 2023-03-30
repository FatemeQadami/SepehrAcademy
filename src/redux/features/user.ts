import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    studentModel: null,
  },
  reducers: {
    handelLogin: (state, action) => {
      state.token = action.payload.token;
      state.studentModel = action.payload.model;
    },
  },
});
export const { handelLogin } = userSlice.actions;
export default userSlice.reducer;