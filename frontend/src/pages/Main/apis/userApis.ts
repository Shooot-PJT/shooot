import { api } from '../../../apis/interceptors';
import { UserInfo } from '../types';

export const readUserInfo = () => {
  return api.get<UserInfo>('/user/info');
};

export const updateUserNickname = (nickname: string) => {
  return api.patch('/user/info', { nickname: nickname });
};

export const findMemberByEmail = (email: string) => {
  return api.get<UserInfo>('/user/search', {
    params: { email: email },
  });
};

export const removeUserInfo = () => {
  return api.delete('/user/logout');
};
