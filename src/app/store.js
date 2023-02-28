import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import playerReducer from '../features/player/playerSlice';
import alertReducer from '../features/alert/alertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    alert: alertReducer,
  },
});
export default store;
