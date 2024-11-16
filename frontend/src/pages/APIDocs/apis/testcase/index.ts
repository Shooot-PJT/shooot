import { api, multipart } from '../../../../apis/interceptors';
import * as AT from './types';
import { Endpoint as EP } from '../../constants/endpoint';

export const addTestCase = async (
  { apiId }: AT.AddTestCaseRequest,
  formData: AT.AddTestCaseRequestBody,
) => {
  const response = await multipart.post<AT.AddTestCaseResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}/${EP.testcases}`,
    formData,
  );
  return response.data;
};

export const getTestCaseDetail = async ({
  testcaseId,
}: AT.GetTestCaseDetailRequest) => {
  const response = await api.get<AT.GetTestCaseDetailResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
  );
  return response.data;
};

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

export const removeTestCase = async ({
  testcaseId,
}: AT.RemoveTestCaseRequest) => {
  const response = await api.delete<void>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${EP.testcases}/${testcaseId}`,
  );
  return response.data;
};
