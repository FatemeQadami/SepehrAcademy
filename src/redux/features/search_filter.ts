import { createSlice } from "@reduxjs/toolkit";

const search_filterSlice = createSlice({
  name: "search_filter",
  initialState: {
    searchWord: "",
    teacher: "",
    sortId: 0,
    costRange: null,
    capacityRange: null,
  },
  reducers: {
    handeSearchWord: (state, action) => {
      state.searchWord = action.payload.searchWord;
    },

    handleTeacherFilter: (state, action) => {
      state.teacher = action.payload;
    },

    handelSort: (state, action) => {
      state.sortId = action.payload;
    },

    handelCostRange: (state, action) => {
      state.costRange = action.payload.costRange;
    },

    handelCapacityRange: (state, action) => {
      state.capacityRange = action.payload.capacityRange;
    },

    handleClearFilter: (state) => {
      state.teacher = "";
      state.sortId = 0;
      state.costRange = null;
      state.capacityRange = null;
    },
  },
});

export const {
  handeSearchWord,
  handleTeacherFilter,
  handelSort,
  handelCostRange,
  handelCapacityRange,
  handleClearFilter,
} = search_filterSlice.actions;
export default search_filterSlice.reducer;
