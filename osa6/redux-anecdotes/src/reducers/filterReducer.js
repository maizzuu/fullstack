import { createSlice } from "@reduxjs/toolkit";

const initial = "";

const filterSlice = createSlice({
  name: "filter",
  initialState: initial,
  reducers: {
    setFilter(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
