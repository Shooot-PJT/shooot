// frontend/src/pages/APIDocs/apis/testcase/types.ts

import { TestCaseDetailInfo } from '../../types/data/TestCase.data';

//=== 테스트케이스 등록
// /api/projects/domains/apis/{apiId}/testcases
export interface AddTestCaseRequest {
  apiId: number; // 경로 파라미터
}

export interface AddTestCaseRequestBody {
  title: TestCaseDetailInfo['title'];
  httpStatusCode: TestCaseDetailInfo['httpStatusCode'];
  requestType: TestCaseDetailInfo['requestType'];
  content: TestCaseDetailInfo['content'];
  // id와 apiId는 요청 본문에 포함되지 않음
}

export type AddTestCaseResponse = TestCaseDetailInfo;

//=== 테스트케이스 상세 조회
// /api/projects/domains/apis/testcases/{testcaseId}
export interface GetTestCaseDetailRequest {
  testcaseId: number; // 경로 파라미터
}

export type GetTestCaseDetailResponse = TestCaseDetailInfo;

//=== 테스트케이스 수정
// /api/projects/domains/apis/testcases/{testcaseId}
export interface EditTestCaseRequest {
  testcaseId: number; // 경로 파라미터
}

export interface EditTestCaseRequestBody {
  title?: TestCaseDetailInfo['title'];
  httpStatusCode?: TestCaseDetailInfo['httpStatusCode'];
  requestType?: TestCaseDetailInfo['requestType'];
  content?: TestCaseDetailInfo['content'];
}

//=== 테스트케이스 삭제
export interface RemoveTestCaseRequest {
  testcaseId: number; // 경로 파라미터
}
