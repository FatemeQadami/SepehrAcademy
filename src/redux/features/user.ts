import { createSlice } from "@reduxjs/toolkit";
import { removeItem, setItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

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

      setItem(EStorageKeys.User, state.studentModel);
    },

    handelLogOut: (state) => {
      state.token = "";
      state.studentModel = null;
      removeItem(EStorageKeys.User);
      removeItem(EStorageKeys.ShowModal);
      removeItem(EStorageKeys.Token);
    },
  },
});
export const { handelLogin, handelLogOut } = userSlice.actions;
export default userSlice.reducer;
