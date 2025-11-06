import axios from "axios";

const url = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    }
});

export default api;