import { createSlice } from "@reduxjs/toolkit";

const initialNotif = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotif,
  reducers: {
    setNotif(state, action) {
      state = action.payload;
    },
    clearNotif(state, action) {
      state = null;
    },
  },
});

export const { setNotif, clearNotif } = notificationSlice.actions;
export default notificationSlice.reducer;
