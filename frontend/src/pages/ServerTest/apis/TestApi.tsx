import { api } from '../../../apis/interceptors';
import { GetAPIConfigsRequest } from '../types';

export const getAPIConfigs = (request: GetAPIConfigsRequest) => {
  return api.patch(`/projects/jarFile/${request.projectJarFileId}/end-point`);
};

// export const excuteApiTest = (reqeust: ExecuteApiTestRequest) => {
//   // return api.
// };
