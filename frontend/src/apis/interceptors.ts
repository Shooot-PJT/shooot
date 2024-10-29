import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://shooot.co.kr/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

const authRef = /^(\/(auth))(\/.*)?$/;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (!authRef.test(window.location.pathname)) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  },
);
