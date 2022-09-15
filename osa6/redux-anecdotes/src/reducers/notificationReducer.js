import { createSlice } from "@reduxjs/toolkit";

const initialNotif = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotif,
  reducers: {
    setNotif(state, action) {
      state = action.payload;
      return state;
    },
    clearNotif(state, action) {
      state = null;
      return state;
    },
  },
});

export const { setNotif, clearNotif } = notificationSlice.actions;

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotif(notification));
    clearTimeout();
    setTimeout(() => dispatch(clearNotif()), time);
  };
};
export default notificationSlice.reducer;
