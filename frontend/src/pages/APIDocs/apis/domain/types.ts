import { ProjectInfo } from '../../../MyProject/types';
import { DomainInfo } from '../../types/data/Domain.data';

export type GetDomainListResponse = DomainInfo[];
export type AddDomainResponse = Omit<DomainInfo, 'subscribeNotification'>;
export type EditDomainResponse = Omit<DomainInfo, 'subscribeNotification'>;
export type RemoveDomainResponse = void;
export type SubscribeNotificationResponse = void;

export interface GetDomainListRequest {
  projectId: ProjectInfo['projectId'];
}

export interface AddDomainRequest {
  projectId: ProjectInfo['projectId'];
  title: DomainInfo['title'];
  description: DomainInfo['description'];
}

export interface EditDomainRequest {
  projectId: ProjectInfo['projectId'];
  domainId: DomainInfo['domainId'] | undefined;
  title?: DomainInfo['title'];
  description?: DomainInfo['description'];
}

export interface RemoveDomainRequest {
  projectId: ProjectInfo['projectId'];
  domainId: DomainInfo['domainId'] | undefined;
}

export interface SubscribeNotificationRequest {
  domainId: DomainInfo['domainId'] | undefined;
}
