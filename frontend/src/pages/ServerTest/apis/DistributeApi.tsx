import { api } from '../../../apis/interceptors';
import { DeployFileRequest, StopDeployFileRequest } from '../types';

export const deployFile = (request: DeployFileRequest) => {
  return api.post(`/projects/jarFile/deploy`, request);
};

export const stopDeployFile = (request: StopDeployFileRequest) => {
  return api.put(`/projects/jarFile/deploy`, request);
};
