import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.config.warn !== false && response.status != 204) {
      console.log(response);
      enqueueSnackbar(response.statusText, {
        variant: 'success',
        autoHideDuration: 3000,
      });
    }
    return response;
  },
  (error) => {
    console.log(error);
    enqueueSnackbar(error.response.data, {
      variant: 'warning',
      autoHideDuration: 3000,
    });
    return Promise.reject(error.message);
  },
);
