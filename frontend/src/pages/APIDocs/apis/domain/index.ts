import { api } from '../../../../apis/interceptors';
import { DomainInfo } from '../../types/data/Domain.data';

import {
  AddDomainRequest,
  EditDomainRequest,
  RemoveDomainRequest,
  GetDomainListRequest,
  AddDomainResponse,
  EditDomainResponse,
  RemoveDomainResponse,
  SubscribeNotificationRequest,
  SubscribeNotificationResponse,
} from './types';

import { Endpoint as EP } from '../../constants/endpoint';

// 도메인 목록 조회
export const getDomainList = async ({ projectId }: GetDomainListRequest) => {
  const response = await api.get<DomainInfo[]>(
    `/${EP.projects}/${projectId}/${EP.domains}`,
  );
  return response.data;
};

// 도메인 추가
export const addDomain = async (info: AddDomainRequest) => {
  const requestData = {
    projectId: info.projectId,
    title: info.title,
    description: info.description,
  };

  const response = await api.post<AddDomainResponse>(
    `/${EP.projects}/${EP.domains}`,
    requestData,
  );
  return response.data;
};

// 도메인 수정
export const editDomain = async (info: EditDomainRequest) => {
  const requestData = {
    title: info.title,
    description: info.description,
  };

  const response = await api.patch<EditDomainResponse>(
    `/${EP.projects}/${EP.domains}/${info.domainId}`,
    requestData,
  );
  return response.data;
};

// 도메인 삭제
export const removeDomain = async ({ domainId }: RemoveDomainRequest) => {
  const response = await api.delete<RemoveDomainResponse>(
    `/${EP.projects}/${EP.domains}/${domainId}`,
  );
  return response.data;
};

// 알림 구독
export const subscribeNotification = async ({
  domainId,
}: SubscribeNotificationRequest) => {
  const response = await api.post<SubscribeNotificationResponse>(
    `/${EP.projects}/${EP.domains}/${domainId}/${EP.subscriptions}`,
  );
  return response.data;
};
