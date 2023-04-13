import { createSlice } from "@reduxjs/toolkit";

import { setItem } from "../../core/services/storage/storage";
import { EStorageKeys } from "../../core/enums/storage";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "blue",
  },
  reducers: {
    handelTheme: (state, action) => {
      state.theme = action.payload.theme;
      setItem(EStorageKeys.theme, state.theme);
    },
  },
});

export const { handelTheme } = themeSlice.actions;
export default themeSlice.reducer;
