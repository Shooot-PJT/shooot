// frontend/src/pages/APIDocs/apis/testcase/index.ts

import { api, multipart } from '../../../../apis/interceptors';
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

// 테스트케이스 상세 조회
export const getTestCaseDetail = async ({
  testcaseId,
}: AT.GetTestCaseDetailRequest) => {
  const response = await api.get<AT.GetTestCaseDetailResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
  );
  return response.data;
};

// 테스트케이스 수정
export const editTestCase = async (
  { testcaseId }: AT.EditTestCaseRequest,
  formData: FormData,
) => {
  const response = await multipart.patch<AT.AddTestCaseResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
    formData,
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
