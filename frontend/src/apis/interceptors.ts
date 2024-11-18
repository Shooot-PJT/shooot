import axios from 'axios';

const authRef = /^(\/(auth))(\/.*)?$/;

/* application/json */
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

/* multipart */
export const multipart = axios.create({
  baseURL: 'https://shooot.co.kr/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

multipart.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

multipart.interceptors.response.use(
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
