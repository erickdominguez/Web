import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import playerReducer from '../features/player/playerSlice';
import alertReducer from '../features/alert/alertSlice';
import { api } from '../helpers/api';
import { setShow, setMessage, setType } from '../features/alert/alertSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    alert: alertReducer,
  },
});
export default store;

api.interceptors.response.use(
  (response) => {
    if (response.config.warn !== false) {
      store.dispatch(setShow('true'));

      store.dispatch(setType('success'));

      store.dispatch(setMessage(response.statusText));
    }
    return response;
  },
  (error) => {
    console.log(error);

    store.dispatch(setShow('true'));

    store.dispatch(setType('warning'));

    store.dispatch(setMessage(error.response.statusText));

    return Promise.reject(error.message);
  },
);
