import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  message: '',
  type: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
  },
});
export const { setMessage, setType, setShow } = alertSlice.actions;
export default alertSlice.reducer;
