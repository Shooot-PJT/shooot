import { APIRequestDocsInfo } from '../../components/API/API.data.types';
import { TestCaseDetailInfo } from '../../components/API/subComponents/APIBody/TestCase/TestCase.data.types';

//=== 테스트케이스 등록
// /api/projects/domains/apis/{apiId}/testcases
export interface AddTestCaseRequest {
  apiId: APIRequestDocsInfo['id'];
}

export interface AddTestCaseRequestBody {
  title: TestCaseDetailInfo['title'];
  httpStatusCode: TestCaseDetailInfo['httpStatusCode'];
  type: TestCaseDetailInfo['type'];
  content: TestCaseDetailInfo['content'];
}

export type AddTestCaseResponse = TestCaseDetailInfo;

//=== 테스트케이스 수정
// /api/projects/domains/apis/testcases/{testcaseId}
export interface EditTestCaseRequest {
  testcaseId: TestCaseDetailInfo['id'];
}

export interface EditTestCaseRequestBody {
  title?: TestCaseDetailInfo['title'];
  httpStatusCode?: TestCaseDetailInfo['httpStatusCode'];
  type?: TestCaseDetailInfo['type'];
  content?: TestCaseDetailInfo['content'];
}

//=== 테스트케이스 삭제
export interface RemoveTestCaseRequest {
  testcaseId: TestCaseDetailInfo['id'];
}
//=== 테스트케이스 조회
export interface GetTestCaseDetail {
  testcaseId: TestCaseDetailInfo['id'];
}

//=== 테스트케이스 리스트 조회는 API 상세조회를 통해 수행
