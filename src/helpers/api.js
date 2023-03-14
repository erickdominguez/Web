import axios from 'axios';
const userToken = localStorage.getItem('userToken');

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    token: userToken
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
