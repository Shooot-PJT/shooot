export type TestStatus = 'SUCCESS' | 'FAIL' | 'YET';

export interface TestResponse {
  testcaseId: number;
  testResult: TestStatus;
}
