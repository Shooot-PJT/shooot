import { api } from '../../../apis/interceptors';
import { UserInfo } from '../types';

export const getUserInfo = () => {
  return api.get<UserInfo>('/user/info');
};
