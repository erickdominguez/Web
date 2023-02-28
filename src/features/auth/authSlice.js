import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authActions';

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

// const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload.user || payload.artist;
      state.userToken = payload.token;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { setError, logout } = authSlice.actions;
export default authSlice.reducer;
