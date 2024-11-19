import { api } from '../../../../apis/interceptors';
import { CommonLoginResponse } from './types';

export const commonLogin = (
  endpoint: string,
  infos: string,
  projectId: number,
) => {
  return api.post<CommonLoginResponse>('/projectClient/login', {
    endpoint: endpoint,
    info: infos,
    projectId: projectId,
  });
};
