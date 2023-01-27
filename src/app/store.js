import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import playerReducer from '../features/player/playerSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
  },
});
export default store;
