import { APIDetailInfo, Manager } from '../../types/data/API.data';
import { DomainInfo } from '../../types/data/Domain.data';

export interface AddAPIRequest {
  domainId: DomainInfo['domainId'];
}

export interface AddAPIRequestBody {
  managerId: Manager['id'];
  title: APIDetailInfo['requestDocs']['title'];
  description: APIDetailInfo['requestDocs']['description'];
  url: APIDetailInfo['requestDocs']['url'];
}

export type AddAPIResponse = Omit<
  APIDetailInfo['requestDocs'],
  'example_url' | 'example_content'
>;

export interface GetAPIListRequest {
  domainId: DomainInfo['domainId'];
}

export type GetAPIListResponse = APIDetailInfo['requestDocs'][];

export interface GetAPIDetailRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}

export type GetAPIDetailResponse = APIDetailInfo;

export interface EditAPIRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}

export interface EditAPIRequestBody {
  managerId?: APIDetailInfo['requestDocs']['managerId'];
  title?: APIDetailInfo['requestDocs']['title'];
  description?: APIDetailInfo['requestDocs']['description'];
  url?: APIDetailInfo['requestDocs']['url'];
  method?: APIDetailInfo['requestDocs']['method'];
  exampleUrl?: APIDetailInfo['requestDocs']['example_url'];
  exampleContent?: APIDetailInfo['requestDocs']['example_content'];
}

export interface ToggleAPIStateRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}

export interface ToggleAPIStateRequestBody {
  isSecure: APIDetailInfo['requestDocs']['isSecure'];
  isRealServer: APIDetailInfo['requestDocs']['isRealServer'];
}

export interface RemoveAPIRequest {
  apiId: APIDetailInfo['requestDocs']['id'];
}
