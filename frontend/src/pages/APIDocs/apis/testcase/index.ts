import { api } from '../../../../apis/interceptors';
import * as AT from './types';
import { Endpoint as EP } from '../../constants/endpoint';

// 테스트케이스 등록
export const addTestCase = async (
  { apiId }: AT.AddTestCaseRequest,
  body: AT.AddTestCaseRequestBody,
) => {
  const response = await api.post<AT.AddTestCaseResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}/${EP.testcases}`,
    body,
  );
  return response.data;
};

// 테스트케이스 리스트 조회를 위한 데이터는 API 상세조회를 통해 조회됨

// 테스트케이스 상세 조회
export const getTestCaseDetail = async ({
  testcaseId,
}: AT.GetTestCaseDetailRequest) => {
  const response = await api.get<AT.AddTestCaseResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
  );
  return response.data;
};

// 테스트케이스 수정
export const editTestCase = async (
  { testcaseId }: AT.EditTestCaseRequest,
  body: AT.EditTestCaseRequestBody,
) => {
  const response = await api.patch<AT.AddTestCaseResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
    body,
  );
  return response.data;
};

// 테스트케이스 삭제
export const removeTestCase = async ({
  testcaseId,
}: AT.RemoveTestCaseRequest) => {
  const response = await api.delete<void>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
  );
  return response.data;
};
