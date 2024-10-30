// axiosInstance.js
import axios from 'axios';
import { store } from '../redux/store'; // Adjust the import path according to your project structure

const axiosInstance = axios.create({
  baseURL: '/', // Set the base URL here for tournaments
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const apiKey = state.user.apiKey;

  if (apiKey) {
    config.headers['Authorization'] = `${apiKey}`; // Set the Authorization header with the API key
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
