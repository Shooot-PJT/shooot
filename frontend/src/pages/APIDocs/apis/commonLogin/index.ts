import { api } from '../../../../apis/interceptors';
import { CommonLoginResponse } from './types';

export const commonLogin = (endpoint: string, infos: string) => {
  return api.post<CommonLoginResponse>('', {
    endpoint: endpoint,
    info: infos,
  });
};
