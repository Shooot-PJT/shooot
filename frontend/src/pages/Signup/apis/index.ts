import { api } from '../../../apis/interceptors';
import { EmailResponse } from '../types';

export const checkEmailDuplicate = (email: string) => {
  return api.get<EmailResponse>(`/auth/email/${email}/can-use`);
};

export const sendCode = (email: string) => {
  return api.post('/auth/email/verification-check-request', { email: email });
};

export const verifyEmailAndCode = (email: string, code: string) => {
  return api.post<EmailResponse>('/auth/email/verification-check', {
    email: email,
    number: code,
  });
};

export const signup = (email: string, password: string, nickname: string) => {
  return api.post('/auth/signup', {
    email: email,
    nickname: nickname,
    password: password,
  });
};
