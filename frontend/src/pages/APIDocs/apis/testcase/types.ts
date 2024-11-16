import { TestCaseDetailInfo } from '../../types/data/TestCase.data';

export interface AddTestCaseRequest {
  apiId: number;
}

export interface AddTestCaseRequestBody {
  title: TestCaseDetailInfo['title'];
  httpStatusCode: TestCaseDetailInfo['httpStatusCode'];
  type: TestCaseDetailInfo['type'];
  content: TestCaseDetailInfo['content'];
}

export type AddTestCaseResponse = TestCaseDetailInfo;

export interface GetTestCaseDetailRequest {
  testcaseId: number;
}

export type GetTestCaseDetailResponse = TestCaseDetailInfo;

export interface EditTestCaseRequest {
  testcaseId: number;
}

export type EditTestCaseRequestBody = FormData;

export interface RemoveTestCaseRequest {
  testcaseId: number;
}
