import { api } from '../../../../apis/interceptors';
import { TestResponse } from './types';

export const testcaseTest = (testcaseId: number) => {
  return api.post<TestResponse>(`/projectClient/testcases/${testcaseId}`);
};

export const apiTest = (apiId: number) => {
  return api.post<TestResponse[]>(`/api/projects/tests/apis/${apiId}`);
};
