import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }

    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    }

    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;