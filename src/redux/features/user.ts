import { createSlice } from "@reduxjs/toolkit";
import { removeItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

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

    handelLogOut:(state)=>{
      state.token = "";
      state.studentModel = null;
      removeItem(EStorageKeys.User);
      removeItem(EStorageKeys.Token);
    }
  },
});
export const { handelLogin , handelLogOut } = userSlice.actions;
export default userSlice.reducer;
