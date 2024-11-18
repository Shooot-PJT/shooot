import { api } from '../../../../apis/interceptors';
import { LogResponse, TestResponse } from './types';

export const testcaseTest = (testcaseId: number) => {
  return api.post<TestResponse>(`/projectClient/testcases/${testcaseId}`);
};

export const apiTest = (apiId: number) => {
  return api.post<TestResponse[]>(`/projects/tests/apis/${apiId}`);
};

export const getApiTestLogs = async (apiId: number, pageParam: number) => {
  return api.get<LogResponse>(
    `/projects/domains/apis/${apiId}/testcases/logs`,
    {
      params: { page: pageParam },
    },
  );
};
