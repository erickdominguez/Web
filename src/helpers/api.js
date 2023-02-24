import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000000,
  headers: {
    'Access-Control-Allow-Origin: '*',
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});
