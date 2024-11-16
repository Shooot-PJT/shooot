import { api } from '../../../apis/interceptors';
import { ExecuteApiTestRequest, GetAPIConfigsRequest } from '../types';

export const getAPIConfigs = (request: GetAPIConfigsRequest) => {
  return api.patch(`/projects/jarFile/${request.projectJarFileId}/end-point`);
};

export const excuteApiTest = (request: ExecuteApiTestRequest) => {
  return api.patch(`/projects/jarFile/test/run`, request);
};
