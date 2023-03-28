import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import playerReducer from '../features/player/playerSlice';
import alertReducer from '../features/alert/alertSlice';
import { api } from '../helpers/api';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    alert: alertReducer,
  },
});

api.interceptors.request.use(function (config) {
  const token = store.getState().auth.userToken;
  if (token) {
    api.defaults.headers.common['token'] = token;
  } else {
    api.defaults.headers.common['token'] = null;
  }

  return config;
});

export default store;
