import { api } from '../../../../apis/interceptors';
import { LogResponse, TestResponse } from './types';

export const testcaseTest = (testcaseId: number, session: string) => {
  return api.post<TestResponse>(
    `/projectClient/testcases/${testcaseId}`,
    {},
    {
      params: {
        session: session,
      },
    },
  );
};

export const apiTest = (apiId: number, session: string) => {
  return api.post<TestResponse[]>(
    `/projectClient/testcases/apis/${apiId}`,
    {},
    { params: { session: session } },
  );
};

export const getApiTestLogs = async (
  apiId: number,
  pageParam: number,
  session: string,
) => {
  return api.get<LogResponse>(
    `/projects/domains/apis/${apiId}/testcases/logs`,
    {
      params: { page: pageParam, session: session },
    },
  );
};
