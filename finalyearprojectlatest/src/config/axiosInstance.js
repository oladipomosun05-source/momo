import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create an axios instance with the base URL of the Render service
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token from localStorage to every request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
