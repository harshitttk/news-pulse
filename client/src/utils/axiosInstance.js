// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_API_URL : process.env.LOCAL_API_URL,  // Use the environment variable
  baseURL: 'https://news-pulse-mu.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json' // Set the content type to JSON
  },
});

export default axiosInstance;
