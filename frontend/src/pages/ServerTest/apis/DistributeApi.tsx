import { api } from '../../../apis/interceptors';
import { DeployFileRequest } from '../types';

export const deployFile = (request: DeployFileRequest) => {
  return api.post(`/projects/jarFile/deploy`, request);
};
