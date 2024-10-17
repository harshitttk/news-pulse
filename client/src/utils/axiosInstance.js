// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'https://news-pulse-mu.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json' // Set the content type to JSON
  },
});

export default axiosInstance;
