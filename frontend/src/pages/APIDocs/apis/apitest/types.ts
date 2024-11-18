/* eslint-disable @typescript-eslint/no-explicit-any */

export type TestStatus = 'SUCCESS' | 'FAIL' | 'YET';

export interface TestResponse {
  testcaseId: number;
  testResult: TestStatus;
}

export interface LogItem {
  id: string;
  projectId: number;
  tester: string;
  testCaseId: number;
  isSuccess: boolean;
  httpStatus: number;
  responseMessage: any;
  responseCode: number;
  createdAt: string;
}

export interface LogResponse {
  content: LogItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
}
