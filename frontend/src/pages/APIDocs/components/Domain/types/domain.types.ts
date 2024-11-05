import { ProjectInfo } from '../../../../../types/shooot.data.types';
import { DomainInfo } from '../Domain.data.types';

export interface AddDomainRequest {
  projectId: ProjectInfo['projectId'];
  title: DomainInfo['title'];
  description: DomainInfo['description'];
}

export interface EditDomainRequest {
  domainId: DomainInfo['domainId'] | undefined;
  title?: DomainInfo['title'];
  description?: DomainInfo['description'];
}

export interface RemoveDomainRequest {
  domainId: DomainInfo['domainId'] | undefined;
}
