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
