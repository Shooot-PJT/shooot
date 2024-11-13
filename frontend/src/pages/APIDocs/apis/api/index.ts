import { api } from '../../../../apis/interceptors';
import { Endpoint as EP } from '../../constants/endpoint';
import {
  AddAPIRequest,
  AddAPIRequestBody,
  AddAPIResponse,
  GetAPIListRequest,
  GetAPIListResponse,
  GetAPIDetailRequest,
  GetAPIDetailResponse,
  EditAPIRequest,
  EditAPIRequestBody,
  ToggleAPIStateRequest,
  ToggleAPIStateRequestBody,
  RemoveAPIRequest,
} from './types';

// API 추가
export const addAPI = async (
  { domainId }: AddAPIRequest,
  body: AddAPIRequestBody,
) => {
  const response = await api.post<AddAPIResponse>(
    `/${EP.projects}/${EP.domains}/${domainId}/${EP.apis}`,
    body,
  );
  return response.data;
};

// API 리스트 조회
export const getAPIList = async ({ domainId }: GetAPIListRequest) => {
  const response = await api.get<GetAPIListResponse>(
    `/${EP.projects}/${EP.domains}/${domainId}/${EP.apis}`,
  );
  return response.data;
};

// API 상세 조회
export const getAPIDetail = async ({ apiId }: GetAPIDetailRequest) => {
  const response = await api.get<GetAPIDetailResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}`,
  );
  return response.data;
};

// API 수정
export const editAPI = async (
  { apiId }: EditAPIRequest,
  body: EditAPIRequestBody,
) => {
  const response = await api.patch<AddAPIResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}`,
    body,
  );
  return response.data;
};

// API 상태 토글 (isSecure, isDeveloped)
export const toggleAPIState = async (
  { apiId }: ToggleAPIStateRequest,
  body: ToggleAPIStateRequestBody,
) => {
  const response = await api.patch<void>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}/${EP.toggle}`,
    body,
  );
  return response.data;
};

// API 삭제
export const removeAPI = async ({ apiId }: RemoveAPIRequest) => {
  const response = await api.delete<void>(`/${EP.domains}/${EP.apis}/${apiId}`);
  return response.data;
};
