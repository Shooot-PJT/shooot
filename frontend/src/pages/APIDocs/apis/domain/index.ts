import { api } from '../../../../apis/interceptors';
import { DomainInfo } from '../../components/Domain/Domain.data.types';

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

const EP_PROJECTS = 'projects';
const EP_DOMAINS = 'domains';

export const getDomainList = async ({ projectId }: GetDomainListRequest) => {
  const response = await api.get<DomainInfo[]>(
    `/${EP_PROJECTS}/${projectId}/${EP_DOMAINS}`,
  );
  return response.data;
};

export const addDomain = async (info: AddDomainRequest) => {
  const requestData = {
    projectId: info.projectId,
    title: info.title,
    description: info.description,
  };

  const response = await api.post<AddDomainResponse>(
    `/${EP_PROJECTS}/${EP_DOMAINS}`,
    requestData,
  );
  return response.data;
};

export const editDomain = async (info: EditDomainRequest) => {
  const requestData = {
    title: info.title,
    description: info.description,
  };

  const response = await api.patch<EditDomainResponse>(
    `/${EP_PROJECTS}/${EP_DOMAINS}/${info.domainId}`,
    requestData,
  );
  return response.data;
};

export const removeDomain = async ({ domainId }: RemoveDomainRequest) => {
  const response = await api.delete<RemoveDomainResponse>(
    `/${EP_PROJECTS}/${EP_DOMAINS}/${domainId}`,
  );
  return response.data;
};

export const subscribeNotification = async ({
  domainId,
}: SubscribeNotificationRequest) => {
  const response = await api.delete<SubscribeNotificationResponse>(
    `/${EP_PROJECTS}/subscriptions/${domainId}`,
  );
  return response.data;
};
