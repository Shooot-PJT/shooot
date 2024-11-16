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
  GetParticipantListRequest,
  GetParticipantListResponse,
} from './types';

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

export const getAPIList = async ({ domainId }: GetAPIListRequest) => {
  const response = await api.get<GetAPIListResponse>(
    `/${EP.projects}/${EP.domains}/${domainId}/${EP.apis}`,
  );
  return response.data;
};

export const getAPIDetail = async ({ apiId }: GetAPIDetailRequest) => {
  const response = await api.get<GetAPIDetailResponse>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}`,
  );
  return response.data;
};

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

export const removeAPI = async ({ apiId }: RemoveAPIRequest) => {
  const response = await api.delete<void>(
    `/${EP.projects}/${EP.domains}/${EP.apis}/${apiId}`,
  );
  return response.data;
};

export const getParticipantList = async ({
  projectId,
}: GetParticipantListRequest) => {
  const response = await api.get<GetParticipantListResponse>(
    `/${EP.projects}/${projectId}/participant-list`,
  );
  return response.data;
};
