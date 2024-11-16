import { TestCaseContent } from '../../components/API/subComponents/APIBody/TestCase/TestCaseTable/TestCaseTable.types';

export type TestCaseRequestType = 'MULTIPART' | 'JSON' | 'NONE';

export interface TestCaseDetailInfo {
  id: number; // 응답에서만 받음
  apiId: number; // 응답에서만 받음
  title: string;
  httpStatusCode: number;
  type: TestCaseRequestType;
  content: TestCaseContent;
  testStatus: 'YET' | 'SUCCESS' | 'FAILURE'; // 응답에서 받는 테스트 상태
  createdAt?: string;
  modifiedAt?: string;
  isSecure?: boolean;
  isDeleted?: boolean;
}
