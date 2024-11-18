import { api, multipart } from '../../../../apis/interceptors';
import * as AT from './types';
import { Endpoint as EP } from '../../constants/endpoint';
import { TableData } from '../../types/data/API.data';

export const addTestCase = async (
  { apiId }: AT.AddTestCaseRequest,
  data: AT.AddTestCaseRequestBody,
) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('httpStatusCode', String(data.httpStatusCode));
  formData.append('type', data.type);
  formData.append('content', JSON.stringify(data.content));

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
  data: AT.AddTestCaseRequestBody,
) => {
  const formData = new FormData();

  const params: TableData | null = data.content.params;
  const headers: TableData | null = data.content.headers;
  const pathvariable: TableData | null = data.content.pathvariable;

  const newContent = {
    ...data.content,
    params: !params
      ? null
      : !Object.keys(params!).length
        ? null
        : { ...params },
    headers: !headers
      ? null
      : !Object.keys(headers!).length
        ? null
        : { ...headers },
    pathvariable: !pathvariable
      ? null
      : !Object.keys(pathvariable!).length
        ? null
        : { ...pathvariable },
  };

  formData.append('title', data.title);
  formData.append('httpStatusCode', String(data.httpStatusCode));
  formData.append('type', data.type);
  formData.append('content', JSON.stringify(newContent));

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
