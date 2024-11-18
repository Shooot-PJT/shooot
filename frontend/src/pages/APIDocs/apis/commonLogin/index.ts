import { api } from '../../../../apis/interceptors';
import { CommonLoginResponse } from './types';

export const commonLogin = (infos: Record<string, string>) => {
  return api.post<CommonLoginResponse>('', infos);
};
