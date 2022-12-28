import axios from 'axios';
const url = 'localhost:4000/api';

function body(method, data) {
  return axios({
    method: method,
    url: url,
    data: data,
  });
}
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000,
  headers: {},
});

export async function users() {
  const response = await api.get('users');
  console.log(response.data);
}
