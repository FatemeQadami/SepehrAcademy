import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    studentModel: null,
  },
  reducers: {
    handelLogin: (state, action) => {
      if (action.payload.token) state.token = action.payload.token;
      if (action.payload.model) state.studentModel = action.payload.model;
    },
  },
});
export const { handelLogin } = userSlice.actions;
export default userSlice.reducer;
