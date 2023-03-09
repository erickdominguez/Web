import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': '*/*',
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.config.warn !== false) {
      //warnings here
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.message);
  },
);
