import { api } from '../../../apis/interceptors';
import {
  ExecuteApiTestRequest,
  GetAPIConfigsRequest,
  GetTestRecordDetailRequest,
  GetTestRecordRequest,
  StopApiTestRequest,
} from '../types';

export const getAPIConfigs = (request: GetAPIConfigsRequest) => {
  return api.patch(`/projects/jarFile/${request.projectJarFileId}/end-point`);
};

export const excuteApiTest = (request: ExecuteApiTestRequest) => {
  return api.patch(`/projects/jarFile/test/run`, request);
};

export const stopApiTest = (request: StopApiTestRequest) => {
  return api.post(`/projects/jarFile/test/stop`, request);
};

export const getTestRecord = (request: GetTestRecordRequest) => {
  return api.get(`/projects/${request.projectId}/test-log`);
};

export const getTestRecordDetail = (request: GetTestRecordDetailRequest) => {
  return api.get(`/projects/test-log/${request.stressTestLogId}`);
};
