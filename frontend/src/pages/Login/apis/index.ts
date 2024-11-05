import { api } from '../../../apis/interceptors';

export const login = (email: string, password: string) => {
  return api.post('/auth/login', {
    email: email,
    password: password,
  });
};
